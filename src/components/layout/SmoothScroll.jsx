import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  // Lenis configuration for a buttery smooth, premium feel
  const lenisOptions = {
    lerp: 0.08, // 0.08 is the sweet spot for smooth but responsive scroll
    smoothWheel: true,
    smoothTouch: false, // Keep false to prevent touch/trackpad glitches
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

