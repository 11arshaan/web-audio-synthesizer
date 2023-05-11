import { useState, useEffect, useRef } from "react";
import "./App.css";
import ReactFlow, { Background } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "./store/store.js";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});

function App() {
  const store = useStore(selector, shallow);

  return (
    <div className="app">
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
