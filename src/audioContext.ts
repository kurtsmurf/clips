import { unmute } from "./unmute";

export const audioContext = new AudioContext();

unmute(audioContext);

export const out = audioContext.createDynamicsCompressor();

out.connect(audioContext.destination);
