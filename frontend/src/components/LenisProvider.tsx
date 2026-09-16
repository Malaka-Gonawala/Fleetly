"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    setLenis(l);

    function raf(time: number) {
      l.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      l.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      // Small delay to ensure DOM is updated before resize
      setTimeout(() => {
        lenis.resize();
      }, 100);
    }
  }, [pathname, lenis]);

  return <>{children}</>;
}
