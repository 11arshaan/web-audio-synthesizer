import { useRef, useEffect } from "react";
import { audioContext as audioCTX, audioNodes } from "../../Audio";

export default function Oscilloscope({ id }) {
  const canvas = useRef(null);
  const animationFrameId = useRef();

  useEffect(() => {
    let audioSource = audioNodes.get(id); //audio node
    let analyzer = audioCTX.createAnalyser(); //analyzer node
    audioSource.connect(analyzer);
    analyzer.fftSize = 4096;
    analyzer.smoothingTimeConstant = 1;

    const bufferLength = analyzer.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    const canvasCtx = canvas.current.getContext("2d", { antialias: false });

    function draw() {
      animationFrameId.current = requestAnimationFrame(draw);

      analyzer.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(255,255,255)";
      canvasCtx.fillRect(0, 0, canvas.current.width, canvas.current.height);

      canvasCtx.lineWidth = 1;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      const sliceWidth = canvas.current.width / bufferLength;
      let x = 0;

      canvasCtx.beginPath();
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        let y = (v * (canvas.current.height)) / 2;
        
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.current.width, canvas.current.height / 2);
      canvasCtx.stroke();
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      audioSource.disconnect(analyzer);
    };
  }, [id]);

  return (
    <canvas ref={canvas} className="oscilloscope-canvas" width="900" height="90" />
  );
}
