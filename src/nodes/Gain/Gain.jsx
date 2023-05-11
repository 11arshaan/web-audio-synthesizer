import { Handle } from "reactflow";
import { useStore } from "../../store/store.js";
import { shallow } from "zustand/shallow";

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
});

export default function Gain({ id, data }) {
const { setGain } = useStore(selector(id), shallow);


  return (
    <div className="demo-node">
      <div className="demo-node-inside">
        <p>Gain</p>

        <label>
          <span>Gain</span>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.gain}
            onChange={setGain}
          />
          <span className="osc-frequency-text">{data.gain}</span>
        </label>
        <br></br>

      </div>
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
}
