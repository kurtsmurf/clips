import h from "https://cdn.skypack.dev/solid-js/h";
import { audioContext } from "./audioContext";

export const AudioInput = ({ onChange }) =>
  h("input", {
    type: "file",
    accept: ".mp3, .wav, .m4a",
    multiple: true,
    onChange: (e) =>
      Promise.all([...e.target.files].map(audioBufferOfFile)).then(onChange),
  });

const audioBufferOfFile = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) =>
      audioContext.decodeAudioData(e.target.result).then(resolve);
    reader.readAsArrayBuffer(file);
  });
