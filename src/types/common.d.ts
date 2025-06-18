type IAnimationElement =
  | HTMLDivElement
  | HTMLElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLHeadElement
  | HTMLLinkElement
  | HTMLButtonElement
  | HTMLHeadingElement
  | null;

interface ISliderItem {
  urlVid: string;
  urlMov: string;
  urlMov_mobile: string;
  url?: string;
  title: string;
  desc: string;
  idx?: number;
}

type TSection = 'hero' | 'about' | 'service' | 'contact';
interface ILinkEffect {
  pathName: string;
  pageName?: string;
  typeEffect?: 'page' | 'work' | 'next';
}

declare module '@splidejs/react-splide';
