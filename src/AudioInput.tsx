import { audioContext } from "./audioContext";
import { Clip } from "./Clip";

type Props = { onChange: (clips: Clip[]) => void };

export const AudioInput = (props: Props) => {
  let input: HTMLInputElement | undefined;

  return (
    <label
      tabIndex="0"
      onKeyPress={(e) => {
        if (["Space", "Enter"].includes(e.code)) {
          e.preventDefault();
          input?.click();
        }
      }}
      class="audio-input"
    >
      <svg viewBox="0 0 2 2" width="20">
        <title>add clips</title>
        <path
          d="M 1 0 v 2 M 0 1 h 2"
          stroke="black"
          fill="none"
          stroke-width="0.25"
        />
      </svg>
      <input
        ref={input}
        type="file"
        style="display: none;"
        accept=".mp3, .wav, .m4a"
        multiple
        onChange={(e) => {
          const files = [...(e.currentTarget.files || [])];
          Promise.all(files.map(clipOfFile)).then(props.onChange);
        }}
      />
    </label>
  );
};

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
