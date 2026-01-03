import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';

const NODE_WIDTH = 192; // w-48
const NODE_HEIGHT = 80;

interface WorkflowNode {
  id: string;
  title: string;
  type: string;
  color: string;
  icon: string;
  x: number;
  y: number;
  status: 'idle' | 'running' | 'completed' | 'failed';
  config?: any;
  condition?: (context: any) => boolean; // شرط التنفيذ
}

interface WorkflowConnection {
  id: string;
  sourceId: string;
  targetId: string;
}

@Component({
  selector: 'app-layout-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './layout-canvas.html',
  styleUrls: ['./layout-canvas.scss']
})
export class LayoutCanvas {
  @ViewChild('canvasRoot') canvasRoot!: ElementRef;

  availableTasks = [
    { title: 'Approval Task', type: 'approval', color: '#3b82f6', icon: '✅' },
    { title: 'API Call', type: 'api', color: '#10b981', icon: '⚡' },
    { title: 'Manual Input', type: 'manual', color: '#f59e0b', icon: '⌨️' }
  ];

  nodes = signal<WorkflowNode[]>([]);
  connections = signal<WorkflowConnection[]>([]);
  selectedNodeId = signal<string | null>(null);
  isExecuting = signal(false);

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      const rect = this.canvasRoot.nativeElement.getBoundingClientRect();
      const x = event.dropPoint.x - rect.left - (NODE_WIDTH / 2);
      const y = event.dropPoint.y - rect.top - (NODE_HEIGHT / 2);

      const newNode: WorkflowNode = {
        ...event.item.data,
        id: 'node_' + Math.random().toString(36).substring(2, 8),
        x,
        y,
        status: 'idle',
        config: {},
      };

      this.nodes.update(list => [...list, newNode]);
    }
  }

  onDragEnded(event: CdkDragEnd, node: WorkflowNode) {
    const pos = event.source.getFreeDragPosition();
    this.nodes.update(list =>
      list.map(n => n.id === node.id ? { ...n, x: pos.x, y: pos.y } : n)
    );
  }

  handleNodeClick(id: string) {
    const selected = this.selectedNodeId();
    if (!selected) {
      this.selectedNodeId.set(id);
    } else if (selected === id) {
      this.selectedNodeId.set(null);
    } else {
      const connId = `conn_${selected}_${id}`;
      if (!this.connections().find(c => c.id === connId)) {
        this.connections.update(list => [...list, { id: connId, sourceId: selected, targetId: id }]);
      }
      this.selectedNodeId.set(null);
    }
  }

  getConnectorPath(conn: WorkflowConnection): string {
    const s = this.nodes().find(n => n.id === conn.sourceId);
    const t = this.nodes().find(n => n.id === conn.targetId);
    if (!s || !t) return '';

    const sx = s.x + NODE_WIDTH / 2, sy = s.y + NODE_HEIGHT / 2;
    const tx = t.x + NODE_WIDTH / 2, ty = t.y + NODE_HEIGHT / 2;
    const dx = Math.abs(tx - sx) / 1.5;

    return `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
  }

  runWorkflow() {
    this.isExecuting.set(true);

    const executeNode = async (node: WorkflowNode, i: number) => {
      await new Promise(r => setTimeout(r, i * 1000)); 
      this.updateStatus(node.id, 'running');

      if (node.condition && !node.condition({})) {
        this.updateStatus(node.id, 'failed');
      } else {
        setTimeout(() => this.updateStatus(node.id, 'completed'), 800);
      }
    };

    this.nodes().forEach(executeNode);
    setTimeout(() => this.isExecuting.set(false), this.nodes().length * 1000 + 800);
  }

  updateStatus(id: string, status: WorkflowNode['status']) {
    this.nodes.update(list => list.map(n => n.id === id ? { ...n, status } : n));
  }

  clearAll() {
    this.nodes.set([]);
    this.connections.set([]);
  }
}