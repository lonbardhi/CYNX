'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";

function cn(...classes: Array<string | boolean | undefined | null>): string {
  return classes.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

const useAnimationFrame = (callback: (time: number, delta: number) => void) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== null) {
        callback(time, time - previousTimeRef.current);
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);
};

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: number;
  vertical?: boolean;
  repeat?: number;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  speed = 50,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const singleContentBlockRef = useRef<HTMLDivElement | null>(null);
  const animX = useRef(0);
  const isPaused = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const childItems = React.Children.toArray(children);

  useAnimationFrame(
    useCallback(
      (_time, delta) => {
        if (!containerRef.current || !contentRef.current || !singleContentBlockRef.current) return;
        if (prefersReducedMotion || (pauseOnHover && isPaused.current) || speed <= 0) return;

        const singleContentBlockSize = vertical
          ? singleContentBlockRef.current.offsetHeight
          : singleContentBlockRef.current.offsetWidth;
        const contentStyle = window.getComputedStyle(contentRef.current);
        const rawGap = vertical ? contentStyle.rowGap : contentStyle.columnGap;
        const computedGap = Number.parseFloat(rawGap);
        const loopDistance = singleContentBlockSize + (Number.isFinite(computedGap) ? computedGap : 0);

        if (loopDistance <= 0) return;

        const dx = (speed * delta) / 1000;
        animX.current += reverse ? dx : -dx;

        if (Math.abs(animX.current) >= loopDistance) {
          animX.current %= loopDistance;
        }

        contentRef.current.style.transform = vertical
          ? `translate3d(0, ${animX.current}px, 0)`
          : `translate3d(${animX.current}px, 0, 0)`;
      },
      [pauseOnHover, prefersReducedMotion, reverse, speed, vertical]
    )
  );

  const pause = useCallback(() => {
    if (pauseOnHover) isPaused.current = true;
  }, [pauseOnHover]);

  const resume = useCallback(() => {
    if (pauseOnHover) isPaused.current = false;
  }, [pauseOnHover]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn("marquee", vertical && "is-vertical", className)}
      onBlur={resume}
      onFocus={pause}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div ref={contentRef} className={cn("marquee-content", vertical && "is-vertical")}>
        {Array.from({ length: Math.max(1, repeat) }).map((_, index) => (
          <div
            aria-hidden={index > 0}
            className={cn("marquee-block", vertical && "is-vertical")}
            key={index}
            ref={index === 0 ? singleContentBlockRef : null}
          >
            {childItems.map((child, childIndex) =>
              React.isValidElement(child) ? (
                React.cloneElement(child, { key: `${index}-${child.key ?? childIndex}` })
              ) : (
                <React.Fragment key={`${index}-${childIndex}`}>{child}</React.Fragment>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
