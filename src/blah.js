const move = (path, { time, amplitude }) => path + `M ${time}, ${amplitude} `;
const lineTo = (path, { time, amplitude }) => path + `L ${time}, ${amplitude} `;
const normalize = (float) => (float + 0.5) * 128;

export const toPath = (floats) => {
  const [first, ...rest] = floats.map(normalize);
  const startingPoint = move("", { time: 0, amplitude: first });
  const reducer = (path, float, index) =>
    lineTo(path, { time: index + 1, amplitude: float });
  return rest.reduce(reducer, startingPoint);
};




///////////////////////////


// @ts-check
// import { toPath } from "./path.js";
// import { updateBaseHue, updateSpread } from "./updateCustomProperty.js";

const pathElement = document.querySelector("[scope-path]");
const fftSize = 128;

/**
 * keep track of paused state
 * enable user to update it by pressing spacebar
 * provide a getter method
 * @returns {{ value: () => boolean}}
 */
const enablePause = () => {
  let paused = false;
  const toggle = () => paused = !paused;
  const toggleOnSpace = (e) => e.code === "Space" && toggle();
  document.body.addEventListener("keydown", toggleOnSpace);
  return {
    value: () => paused,
  };
};

/**
 * update the "d" attribute of our squiggly line element
 * @param {Float32Array} samples
 */
const drawPath = (samples) => {
  pathElement.setAttribute("d", toPath(samples));
};

/**
 * using the provided analyser, get the last n Floats of signal
 * where n = fftSize
 * @param {AnalyserNode} analyser
 * @returns {Float32Array}
 */
const getSamples = (analyser) => {
  const samples = new Float32Array(fftSize);
  analyser.getFloatTimeDomainData(samples);
  return samples;
};

/**
 * rms for "root mean square"
 * @param {Float32Array} samples
 * @returns {number}
 */
const rms = (samples) =>
  [...samples]
    .map(Math.abs)
    .reduce((a, b) => a + b, 0) / samples.length;

/**
 * what to run when we get a frame
 * @param {AnalyserNode} analyser
 */
const tick = (analyser) => {
  const samples = getSamples(analyser);
  drawPath(samples);
  // updateBaseHue(rms(samples) * 10);
  // updateSpread(rms(samples) * 5);
};

/**
 * just a nicer way to get an analyser node
 * @param audioContext {AudioContext}
 * @returns {AnalyserNode}
 */
const getAnalyzer = (audioContext) => {
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = fftSize;
  return analyser;
};

/**
 * kik it off
 */
export const start = () => {
  const audioContext = new AudioContext();
  const analyser = getAnalyzer(audioContext);
  const paused = enablePause();

  let lastFrameTime;

  const animate = () => {
    if (!lastFrameTime) {
      lastFrameTime = Date.now();
    } else if (lastFrameTime + 16 < Date.now()) {
      lastFrameTime = Date.now();
      !paused.value() && tick(analyser);
    }
    requestAnimationFrame(animate);
  };

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioContext.createMediaStreamSource(stream))
    .then((streamSource) => streamSource.connect(analyser))
    .then(animate);
};
