import "./App.scss";
import ReactFlow, { Background } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "./store/store.js";

//nodes
import Osc from "./nodes/Oscillator/Osc.jsx";
import Gain from "./nodes/Gain/Gain.jsx";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});


const nodeTypes = {
  osc: Osc,
  gain: Gain,
};

function App() {
  const store = useStore(selector, shallow);

  return (
    <div className="app">
      <ReactFlow
        nodeTypes={nodeTypes}
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
