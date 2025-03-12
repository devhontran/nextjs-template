export const isTouch = (): boolean => {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
};

export const isSafari = (): boolean => {
  const ua = (typeof window !== 'undefined' && navigator.userAgent.toLowerCase()) || '';
  return (
    ua.includes('safari') &&
    !ua.includes('chrome') &&
    !ua.includes('firefox') &&
    !ua.includes('edge') &&
    ua.includes('apple')
  );
};
