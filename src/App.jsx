import "./App.scss";
import ReactFlow, { Background, Panel } from "reactflow";
import { shallow } from "zustand/shallow";

import { useStore } from "./store/store.js";

//nodes
import Osc from "./nodes/Oscillator/Osc.jsx";
import Gain from "./nodes/Gain/Gain.jsx";
import Out from "./nodes/Out/Out";

const nodeTypes = {
  osc: Osc,
  gain: Gain,
  out: Out,
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  createNode: store.createNode,
  removeNodes: store.removeNodes,
  addEdge: store.addEdge,
  removeEdges: store.removeEdges,
});

function App() {
  const store = useStore(selector, shallow);

  return (
    <div className="app">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onNodesDelete={store.removeNodes}
        onEdgesChange={store.onEdgesChange}
        onEdgesDelete={store.removeEdges}
        onConnect={store.addEdge}
      >
        <Panel position="top-right">
          <button
            onClick={() =>
              store.createNode({
                type: "osc",
                position: { x: 0, y: 0 },
                data: { frequency: 440, type: "sine" },
              })
            }
          >
            osc
          </button>
          <button
            onClick={() =>
              store.createNode({
                type: "amp",
                position: { x: 0, y: 0 },
                data: { gain: 0.5 },
              })
            }
          >
            amp
          </button>
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
