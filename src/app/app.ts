import { L } from '@angular/cdk/keycodes';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutCanvas } from './features/flow/layout-canvas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LayoutCanvas],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('taskCloud4Rain');
}
