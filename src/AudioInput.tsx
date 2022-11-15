import { audioContext } from "./audioContext";

export const AudioInput = (props) => (
  <input
    type="file"
    accept=".mp3, .wav, .m4a"
    multiple
    onChange={(e) =>
      Promise.all(
        [...(e.target as HTMLInputElement).files].map(audioBufferOfFile),
      ).then(props.onChange)}
  />
);

const audioBufferOfFile = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) =>
      audioContext.decodeAudioData(e.target.result as ArrayBuffer).then(
        resolve,
      );
    reader.readAsArrayBuffer(file);
  });
