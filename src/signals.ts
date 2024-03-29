import { createSignal } from "solid-js";

// ------ CLIPS --------

export type Clip = {
  buffer: AudioBuffer;
  name: string;
  hash: string;
};

const [clips, setClips] = createSignal<Clip[]>([]);

const deleteClip = (hash: string) => {
  setClips((prev) => prev.filter((clip) => clip.hash !== hash));
  if (clips().length === 0) setDeleting(false);
};

const addClips = (newClips: Clip[]) => setClips(deduplicate(newClips));

const deduplicate = (newClips: Clip[]) => {
  return [...clips(), ...newClips.filter(isNew)];
};

const isNew = (clip: Clip) =>
  !clips().find((oldClip) => oldClip.hash === clip.hash);

export { addClips, clips, deleteClip };

// -------- DELETING --------

export const [deleting, setDeleting] = createSignal<Boolean>(false);
