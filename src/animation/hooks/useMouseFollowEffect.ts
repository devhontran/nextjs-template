import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { type RefObject, useRef } from 'react';

interface UseMouseFollowEffectReturn {
  wrapperRef: RefObject<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseMoveGlobal: (e: { clientX: number; clientY: number }) => void;
  handleMouseLeave: () => void;
}

interface UseMouseFollowEffectOptions {
  maxRotation?: number;
  duration?: number;
  ease?: string;
  defaultRotateY?: number;
  defaultRotateX?: number;
  noRotateX?: boolean;
  limitRotation?: number;
}

export const useMouseFollowEffect = ({
  maxRotation = 30,
  duration = 0.3,
  ease = 'power3.out',
  defaultRotateY = 0,
  defaultRotateX = 0,
  noRotateX = false,
  limitRotation = 15,
}: UseMouseFollowEffectOptions = {}): UseMouseFollowEffectReturn => {
  const wrapperRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  const qkRotation = useRef<{
    x: gsap.QuickToFunc | null;
    y: gsap.QuickToFunc | null;
    rotationX: gsap.QuickToFunc | null;
    rotationY: gsap.QuickToFunc | null;
  }>({
    x: null,
    y: null,
    rotationX: null,
    rotationY: null,
  });

  const { contextSafe } = useGSAP();

  const initQT = contextSafe(() => {
    if (!wrapperRef.current || qkRotation.current.x) return;
    gsap.set(wrapperRef.current, {
      willChange: 'transform',
    });
    qkRotation.current = {
      x: gsap.quickTo(wrapperRef.current, '--rX', {
        duration,
        ease,
      }),
      y: gsap.quickTo(wrapperRef.current, '--rY', {
        duration,
        ease,
      }),
      rotationX: gsap.quickTo(wrapperRef.current, 'rotationX', {
        duration,
        ease,
      }),
      rotationY: gsap.quickTo(wrapperRef.current, 'rotationY', {
        duration,
        ease,
      }),
    };
  });

  const rotateToMouse = contextSafe((mouseX: number, mouseY: number) => {
    if (!wrapperRef.current || !boundsRef.current) return;
    initQT();

    const bounds = boundsRef.current;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };

    // Normalize the center coordinates relative to element size
    const normalizedX = center.x / (bounds.width / 2);
    const normalizedY = center.y / (bounds.height / 2);

    // Clamp the normalized values to prevent excessive rotation at edges
    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    // Apply rotation directly based on mouse position
    // When mouse is top-left: clampedX < 0, clampedY < 0
    // This should tilt the element towards the mouse
    let rotationX = noRotateX ? 0 : -clampedY * maxRotation * 1.5 + defaultRotateX;
    let rotationY = clampedX * maxRotation * 1.5 + defaultRotateY;

    if (limitRotation) {
      rotationX = Math.max(-limitRotation, Math.min(limitRotation, rotationX));
      rotationY = Math.max(-limitRotation, Math.min(limitRotation, rotationY));
    }

    // Apply rotation to wrapper
    // gsap.to(wrapperRef.current, {
    //   '--rX': noRotateX ? 0 : rotationX,
    //   '--rY': rotationY,
    //   rotationX: noRotateX ? 0 : rotationX,
    //   rotationY: rotationY,
    //   duration,
    //   ease,
    //   transformOrigin: 'center center',
    // });

    qkRotation.current.x?.(noRotateX ? 0 : rotationX);
    qkRotation.current.y?.(rotationY);
    qkRotation.current.rotationX?.(noRotateX ? 0 : rotationX);
    qkRotation.current.rotationY?.(rotationY);
  });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    // Update bounds on each mouse move for accuracy
    if (wrapperRef.current) {
      boundsRef.current = wrapperRef.current.getBoundingClientRect();
    }
    rotateToMouse(e.clientX, e.clientY);
  });

  const handleMouseMoveGlobal = (e: { clientX: number; clientY: number }): void => {
    // Update bounds on each mouse move for accuracy
    if (wrapperRef.current) {
      boundsRef.current = wrapperRef.current.getBoundingClientRect();
    }
    rotateToMouse(e.clientX, e.clientY);
  };

  const handleMouseLeave = contextSafe(() => {
    boundsRef.current = null;

    qkRotation.current.x?.(0);
    qkRotation.current.y?.(0);
    qkRotation.current.rotationX?.(0);
    qkRotation.current.rotationY?.(0);
    // gsap.killTweensOf(wrapperRef.current);

    // // Reset wrapper rotation
    // gsap.to(wrapperRef.current, {
    //   rotationX: 0,
    //   rotationY: 0,
    //   duration: 0.5,
    //   ease,
    // });
  });

  return {
    wrapperRef,
    contentRef,
    handleMouseMove,
    handleMouseMoveGlobal,
    handleMouseLeave,
  };
};
