import { audioContext } from "./audioContext";
import { Clip } from "./Clip";

type Props = { onChange: (clips: Clip[]) => void };

export const AudioInput = (props: Props) => (
  <input
    type="file"
    accept=".mp3, .wav, .m4a"
    multiple
    onChange={(e) => {
      const files = [...(e.currentTarget.files || [])];
      Promise
        .all(files.map(clipOfFile))
        .then(props.onChange);
    }}
  />
);

const clipOfFile = async (file: File): Promise<Clip> => ({
  name: file.name,
  buffer: await audioBufferOfFile(file),
});

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
