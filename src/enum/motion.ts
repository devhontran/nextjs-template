export enum MotionCharsType {
  CHARS_MASK = 'chars_mask',
  CHARS_MASK_TOP = 'chars_mask_top',
  CHARS_MASK_RANDOM = 'chars_mask_random',
  CHARS_SOLID_BOX = 'chars_solid_box',
  CHARS_SCALE = 'chars_scale',
  CHARS_TYPING = 'chars_typing',
  CHARS_LEFT_MASK = 'chars_left_mask',
}

export enum MotionLinesType {
  LINES_FADE = 'lines_fade',
  LINES_MASK = 'lines_mask',
  LINES_THREE_D = 'lines_3d',
}

export enum MotionWordsType {
  WORDS_3D = 'words_3d',
  WORDS_MASK = 'words_mask',
  WORDS_FADE_SLIDE_LEFT = 'words_fade_slide_left',
  WORDS_FADE_SLIDE_RIGHT = 'words_fade_slide_right',
  WORDS_FADE_SLIDE_UP = 'words_fade_slide_up',
  WORDS_FADE_SLIDE_DOWN = 'words_fade_slide_down',
  WORDS_SCALE_FADE = 'words_scale_fade',
}

export enum MotionMaskBoxType {
  BOTTOM = 'bottom',
  BOTTOM_CENTER = 'bottom_center',
  TOP = 'top',
  TOP_CENTER = 'top_center',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum MotionCharsTarget {
  DIV = 'div',
  PARAGRAPH = 'p',
  SPAN = 'span',
  HEADING = 'h1',
}
