import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

import { Ease } from '@/enum/animation';

((): void => {
  gsap.registerPlugin(CustomEase);
  // Fix TypeScript errors by properly typing CustomEase
  (CustomEase as { create: (name: string, path: string) => void }).create(
    Ease.Power4_inOut_Slow,
    'M0,0 C0.29,0 0.329,0.015 0.4,0.1 0.469,0.183 0.477,0.359 0.498,0.502 0.512,0.603 0.536,0.806 0.6,0.9 0.675,1.009 0.704,1 1,1 '
  );
})();
