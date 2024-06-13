export type IAnimationElement =
  | HTMLDivElement
  | HTMLElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLHeadElement
  | HTMLLinkElement
  | HTMLButtonElement
  | HTMLHeadingElement;

export interface ISliderItem {
  urlVid: string;
  urlMov: string;
  urlMov_mobile: string;
  url?: string;
  title: string;
  desc: string;
  idx?: number;
}

export type TSection = 'hero' | 'about' | 'service' | 'contact';
