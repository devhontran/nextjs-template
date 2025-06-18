import type Lenis from 'lenis';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opera?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grecaptcha?: any;
    lenis?: Lenis;
    navigation?: NavigationAPI;
  }
}

// Define the Navigation API types that are missing in the standard lib
interface NavigationDestination {
  url: string;
}

interface NavigationEvent extends Event {
  destination?: NavigationDestination;
  navigationType?: string;
}

interface NavigationAPI extends EventTarget {
  addEventListener(type: string, listener: (event: NavigationEvent) => void): void;
  removeEventListener(type: string, listener: (event: NavigationEvent) => void): void;
}

interface VimeoPlayer {
  setCurrentTime(arg0: number): unknown;
  play: () => Promise<void>;
  pause: () => Promise<void>;
}

interface IVideoStreamingRef {
  play: () => void;
  pause: () => void;
  getElement: () => HTMLVideoElement | null;
}
