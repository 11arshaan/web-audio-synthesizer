import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ReactFlowProvider } from 'reactflow';


function App() {
 
  return (
    <div className="app">
      <ReactFlowProvider>
        <h1>React Flow</h1>
      </ReactFlowProvider>
    </div>
}

export default App;
