import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import {
  createAudioNode,
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
  isRunning,
  toggleAudio,
} from "../Audio";
import { nanoid } from "nanoid";
import { create } from "zustand";

export const useStore = create((set, get) => ({
  isRunning: isRunning(), //check running from AudioContext
  toggleAudio() {
    //toggle running from AudioContext
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },

  nodes: [
    {
      type: "osc",
      id: "a",
      data: { frequency: 220, type: "square" },
      position: { x: 150, y: 0 },
    },
    {
      type: "gain",
      id: "b",
      data: { label: "gain", gain: 0.5 },
      position: { x: 150, y: 250 },
    },
    {
      id: "c",
      type: "out",
      data: { label: "output" },
      position: { x: 150, y: 450 },
    },
  ],
  edges: [],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };
    set({ edges: [edge, ...get().edges] });
    connect(data.source, data.target); //connect audioNodes
  },

  createNode(data) {
    const id = nanoid(6);
    const node = {
      id,
      type: data.type,
      position: data.position,
      data: { ...data.data, label: data.type },
    };
    createAudioNode(id, data.type, data.data);
    set({ nodes: [...get().nodes, node] });
  },

  updateNode(id, data) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  removeNodes(nodes) {
    for (const { id } of nodes) {
      removeAudioNode(id);
    }
  },

  removeEdges(edges) {
    for (const { source, target } of edges) {
      disconnect(source, target);
    }
  },
}));
