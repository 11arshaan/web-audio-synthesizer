import { useEffect, useState, useRef } from "react";
import DeepGlow from "../../assets/Deep Glow Loop.wav";

export default function Waapi() {
  const ref = useRef(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const audio = ref.current;
    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);
    const gainNode = context.createGain();
    source.connect(gainNode).connect(context.destination);

    //add an onchange listener to the volume input
    const volumeInput = document.getElementById("volume");
    volumeInput.addEventListener("input", (e) => {
      e.preventDefault();
      setVolume(volumeInput.value);
      gainNode.gain.value = volumeInput.value;
    });

    //add an onclick listener to the play button
    const playButton = document.getElementById("playAudio");
    playButton.addEventListener("click", async (e) => {
      e.preventDefault();
      if (context.state === "suspended") {
        await context.resume();
      }
      audio.play();
    });
  }, []);

  return (
    <>
      <audio
        ref={ref}
        src={DeepGlow}
        id="audio"
      ></audio>
      <button id="playAudio" type="button">
        Play
      </button>
      <input id="volume" type="range" min="0" max="1" step="0.01"></input>
    </>
  );
}
