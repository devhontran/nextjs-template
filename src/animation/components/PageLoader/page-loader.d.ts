interface ILoadingCounterRef {
  update: (count: number) => void;
  motionIn: () => void;
  motionOut: () => void;
}
