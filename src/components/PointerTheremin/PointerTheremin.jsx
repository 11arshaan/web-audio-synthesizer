import { useEffect, useState, useRef } from "react";

export default function Waapi({context}) {
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [osc, setOsc] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    setAudioContext(audioCtx);
    setGainNode(gainNode);
  }, []);

  useEffect(() => {
    if (playing && audioContext) {
      const osc = audioContext.createOscillator();
      osc.connect(gainNode);
      osc.start();
      setOsc(osc);
    } else {
      if (osc) {
        osc.stop();
        setOsc(null);
      }
    }
  }, [playing, audioContext, gainNode]);

  const handleClick = async () => {
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
    setPlaying(!playing);
  };

  const handleMouseMove = (e) => {
    if (osc) {
      const freq = e.clientX / window.innerWidth * 1000;
      const gain = e.clientY / window.innerHeight;
      osc.frequency.value = freq;
      gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
    }
  };

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <button type="button" onClick={handleClick}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
