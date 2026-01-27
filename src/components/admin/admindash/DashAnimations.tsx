'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function DashboardAnimations() {
  useEffect(() => {
    gsap.from('.stat-card', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from('.quick-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      delay: 0.5,
      ease: 'back.out(1.7)',
    });
  }, []);

  return null;
}
