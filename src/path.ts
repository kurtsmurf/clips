import { FFT_SIZE } from "./FFT_SIZE";

type Point = { x: number; y: number };
const move = (path: string, { x, y }: Point) => `${path} M ${x}, ${y} `;
const lineTo = (path: string, { x, y }: Point) => `${path} L ${x}, ${y} `;
export const pathOfFloat32Array = (floats: Float32Array): string => {
  const [first, ...rest] = floats;
  return rest.reduce(
    (path, float, index) =>
      lineTo(
        path,
        {
          x: (index + 1) * (2 / (FFT_SIZE - 1)),
          y: float,
        },
      ),
    move("", { x: 0, y: first }),
  );
};
