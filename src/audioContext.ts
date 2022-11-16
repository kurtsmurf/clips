export const audioContext = new AudioContext();

export const out = audioContext.createDynamicsCompressor();

out.connect(audioContext.destination);
