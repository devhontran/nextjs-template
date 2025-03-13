interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Vector2 {
  x: number;
  y: number;
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

const LineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number): number => {
  const m: number = (y2 - y1) / (x2 - x1);
  const b: number = y1 - m * x1;
  return m * currentVal + b;
};
/**
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 * @returns {number}
 * @constructor
 */
const MathMap = (x: number, a: number, b: number, c: number, d: number): number => {
  return parseFloat((((x - a) * (d - c)) / (b - a) + c).toFixed(3));
};

const MathMapVector3 = (point: number, a: number, b: number, c: Vector3, d: Vector3): Vector3 => {
  return {
    x: MathMap(point, a, b, c.x, d.x),
    y: MathMap(point, a, b, c.y, d.y),
    z: MathMap(point, a, b, c.z, d.z),
  };
};

const MathLerp = (a: number, b: number, n: number): number => {
  return parseFloat(((1 - n) * a + n * b).toFixed(3));
};

const RandomFloat = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

const MathAround = (r: number, { x, y }: Vector2): Vector2 => {
  const z = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2));
  const sin = y / z;
  const cos = x / z;

  return {
    x: cos * r,
    y: sin * r,
  };
};

const Radians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const rotationDeg = (x: number, y: number): number => {
  return (Math.atan(y / x) * 180) / Math.PI;
};

const Distance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

interface IGetOffsetThreeJs {
  left: number;
  top: number;
  width: number;
  height: number;
  winSize: Vector2;
}

const GetOffsetThreeJs = ({ left, top, width, height, winSize }: IGetOffsetThreeJs): Vector2 => {
  return {
    x: left - winSize.x / 2 + width / 2,
    y: -top + winSize.y / 2 - height / 2,
  };
};

export const randBool = (): boolean => {
  const a = new Uint8Array(1);
  crypto.getRandomValues(a);
  return a[0] > 127;
};

export const getRandomInt = (min: number, max: number): number => {
  const min_ = Math.ceil(min);
  const max_ = Math.floor(max);
  return Math.floor(Math.random() * (max_ - min_) + min_); // The maximum is exclusive and the minimum is inclusive
};

export const randomValueRangeInt = (hash: number, minVal: number, maxVal: number): number => {
  return minVal + (hash % (maxVal - minVal + 1));
};

export const randomValueIndexArrayInt = (hash: number, lenArray: number): number => {
  return hash % lenArray;
};

export const cyrb128 = (str: string): number[] => {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
};

export const randBoolSeed = (seed: number): boolean => {
  return Boolean(seed > 0.5);
};

export const easingScrolling = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

export const easingPining = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

export const easeInOutSine = (x: number): number => {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

export const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export const easeInOutQuad = (x: number): number => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export function easeInQuart(x: number): number {
  return x * x * x * x;
}

export function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

export function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

export function easeLenis(t: number): number {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
}

export {
  Distance,
  GetOffsetThreeJs,
  LineEq,
  MathAround,
  MathLerp,
  MathMap,
  MathMapVector3,
  Radians,
  RandomFloat,
};
