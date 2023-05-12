/* eslint-disable react/prop-types */
import { Handle } from "reactflow";
import { useStore } from "../../store/store.js";
import { shallow } from "zustand/shallow";

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function Out({id, data}) {
  const { isRunning, toggleAudio } = useStore(selector, shallow);

  function handleClick() {
    toggleAudio();
  }


  return (
    <div className="demo-node">
      <div className="demo-node-inside">
        <p>Output</p>
        <button onClick={handleClick} type="button">
          {isRunning ? "Pause" : "Play"}
        </button>
      </div>
      <Handle type="target" position="top" />
    </div>
  );
}
