import "./NodeGraph.scss";
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export default function NodeGraph() {
  const [nodes, setNodes] = useState([
    { id: 1, name: "Node 1", x: 100, y: 100 },
    { id: 2, name: "Node 2", x: 200, y: 200 },
  ]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const svg = d3.select("#graph");
    const nodeGroup = svg.append("g").attr("class", "nodes");
    const socketGroup = svg.append("g").attr("class", "sockets");
    const connectionGroup = svg.append("g").attr("class", "connections");

    const nodeSelection = nodeGroup
      .selectAll(".node")
      .data(nodes)
      .join("circle")
      .attr("class", "node")
      .attr("r", 30)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);

    const socketSelection = socketGroup
      .selectAll(".socket")
      .data(nodes)
      .join("circle")
      .attr("class", "socket")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 10)
      .style("fill", "red");

    const dragBehavior = d3
      .drag()
      .on("start", (event, d) => {
        d3.select(event.sourceEvent.target).raise();
      })
      .on("drag", (event, d) => {
        d.x += event.dx;
        d.y += event.dy;
        d3.select(event.sourceEvent.target).attr("cx", d.x).attr("cy", d.y);
        // redrawConnections();
      });

    nodeSelection.call(dragBehavior);
    socketSelection.call(dragBehavior);
  }, []);
  return (
    <>
      <h1>NodeGraph</h1>
      <svg id="graph" width="100%" height="100%"></svg>
    </>
  );
}
