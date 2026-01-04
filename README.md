# TaskCloud4Rain – Workflow Builder

A visual workflow builder application built with **Angular** that allows users to create, connect, and execute workflow tasks using a drag-and-drop interface.

---

## 🎥 Demo Video
Watch the application in action here:  
https://drive.google.com/file/d/19kw6rdLDukkjKVV8GdDtKLXWx-DQc8G4/view?usp=sharing

---

## 🚀 Features
- Drag & drop tasks from sidebar to canvas
- Free positioning of workflow nodes
- Manual connection between tasks
- Visual execution state (idle, running, completed)
- Animated execution flow
- SVG-based connectors between nodes
- Clean and responsive UI

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI

### Installation
```bash
npm install
ng serve

Then open:
http://localhost:4200


## 🧠 Workflow Logic

- Users drag tasks from the sidebar into the canvas.
- Each task becomes a workflow node with its own position.
- Clicking on two nodes sequentially creates a connection between them.
- Connections are rendered using SVG Bezier curves.
- When the workflow runs, nodes execute sequentially and update their status visually.

---

## ⚠️ Edge Cases Handled

- Prevents duplicate connections between the same nodes
- Nodes retain their position after dragging
- Prevents execution while workflow is already running
- Safe reset of workflow state
