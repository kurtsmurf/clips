import { audioContext } from "./audioContext";

type Props = { onChange: (buffers: AudioBuffer[]) => void; };
export const AudioInput = (props: Props) => (
  <input
    type="file"
    accept=".mp3, .wav, .m4a"
    multiple
    onChange={(e) => {
      const files = [...(e.currentTarget.files || [])];
      Promise
        .all(files.map(audioBufferOfFile))
        .then(props.onChange);
    }}
  />
);

const audioBufferOfFile = (file: File) =>
  new Promise<AudioBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (!(e.target?.result instanceof ArrayBuffer)) {
        reject();
        return;
      }
      audioContext.decodeAudioData(e.target.result, resolve);
    };
    reader.readAsArrayBuffer(file);
  });
