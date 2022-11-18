import { unmute } from "./unmute";

export const audioContext = new AudioContext();

// workaround for ios "silent mode" issue
unmute(audioContext);

export const out = audioContext.createDynamicsCompressor();

out.connect(audioContext.destination);
