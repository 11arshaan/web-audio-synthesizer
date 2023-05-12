/* eslint-disable react/prop-types */
import {useRef} from "react";
import { Handle } from "reactflow";
import { useStore } from "../../store/store.js";
import { shallow } from "zustand/shallow";
import Oscilloscope from "./Oscilloscope.jsx";


const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

export default function Osc({ id, data }) {
const { setFrequency, setType } = useStore(selector(id), shallow);
const container = useRef(null);

  return (
    <div ref={container} className="demo-node">
      <div className="demo-node-inside">
        <p>Oscillator</p>

        <label>
          <span>Frequency</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={data.frequency}
            onChange={setFrequency}
          />
          <span className="osc-frequency-text">{data.frequency}Hz</span>
        </label>
        <br></br>

        <label>
          <span>Waveform</span>
          <select className="nodrag" value={data.type} onChange={setType}>
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label>

      </div>

      <Handle type="source" position="bottom" />
    </div>
  );
}
