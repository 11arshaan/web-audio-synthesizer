const audioContext = new AudioContext();
const audioNodes = new Map();

const osc = audioContext.createOscillator();
osc.frequency.value = 220;
osc.type = "square";
osc.start();

const amp = audioContext.createGain();
amp.gain.value = 0.5;

const out = audioContext.destination;

audioNodes.set("a", osc);
audioNodes.set("b", amp);
audioNodes.set("c", out);

export function isRunning() {
  return audioContext.state === "running";
}

export function toggleAudio() {
  return isRunning() ? audioContext.suspend() : audioContext.resume();
}

export function createAudioNode(id, type, data) {
  let node;

  switch (type) {
    case "osc":
      node = audioContext.createOscillator();
      node.frequency.value = data.frequency;
      node.type = data.type;
      node.start();
      break;

    case "gain":
      node = audioContext.createGain();
      node.gain.value = data.gain;
      break;

    case "out":
      node = audioContext.destination;
      break;

    default:
      break;
  }

  if (node) {
    audioNodes.set(id, node);
  }
}

export function updateAudioNode(id, data) {
  const node = audioNodes.get(id);
  if (!node) return;

  for (const [key, value] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = value;
    } else {
      node[key] = value;
    }
  }
}

export function removeAudioNode(id) {
  const node = audioNodes.get(id);

  node.disconnect();
  node.stop?.();

  audioNodes.delete(id);
}

export function connect(sourceId, targetId) {
  const source = audioNodes.get(sourceId);
  const target = audioNodes.get(targetId);

  source.connect(target);
}

export function disconnect(sourceId, targetId) {
  const source = audioNodes.get(sourceId);
  const target = audioNodes.get(targetId);

  source.disconnect(target);
}

