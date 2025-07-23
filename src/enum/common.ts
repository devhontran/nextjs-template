export enum MotionDirection {
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

export enum PageState {
  PREFETCH = -3,
  REPLACE = -2,
  LEAVE = -1,
  IDLE = 0,
  PLAY = 1,
  ENTER = 2,
}
