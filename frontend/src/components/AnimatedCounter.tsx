"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCounter({ 
  value, 
  label, 
  suffix = "" 
}: { 
  value: number, 
  label: string, 
  suffix?: string 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-[#15181D] border border-[#262B33] rounded-2xl">
      <div className="text-4xl md:text-5xl font-bold text-[#D4A94A] mb-2 flex items-center">
        {displayValue}{suffix}
      </div>
      <div className="text-sm text-[#9A9FA6] font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
}
