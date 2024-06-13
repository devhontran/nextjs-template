import { signal } from '@preact/signals-react';

export type tLogoColor = '/' | 'about' | 'service' | 'contact';

interface IUiContext {
  setActiveSection: (section: tLogoColor) => void;
}
// Create signals for state management
export const activesection = signal('/');

export const setActiveSection = (section: tLogoColor): void => {
  activesection.value = section;
};

export const useStoreActionSignal = (): IUiContext => ({
  setActiveSection,
});
