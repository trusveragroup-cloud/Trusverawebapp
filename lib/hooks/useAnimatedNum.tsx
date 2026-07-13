"use client";

import { useEffect, useRef, useState } from "react";

export function useAnimatedNum(
  targetValue: number,
  decimals: number = 0
): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const hasFired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFired.current) {
            hasFired.current = true;
            const duration = 2000;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplayValue(targetValue * eased);
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [targetValue]);

  return [ref, decimals > 0 ? displayValue : Math.round(displayValue)];
}

export function AnimatedNum({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [ref, displayValue] = useAnimatedNum(value, decimals);

  return (
    <div ref={ref}>
      {prefix}
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString()}
      {suffix}
    </div>
  );
}
