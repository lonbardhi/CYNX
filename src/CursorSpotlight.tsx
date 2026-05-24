import { useEffect, useRef, useState } from "react";

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [shouldShowCursor, setShouldShowCursor] = useState(false);
  const rafRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchOrSmallScreen = () =>
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;

    const syncCursorMode = () => setShouldShowCursor(!isTouchOrSmallScreen());
    syncCursorMode();

    const updatePosition = () => {
      setPosition({ ...positionRef.current });
      rafRef.current = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handlePointerOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHovering(Boolean(target.closest("button, a, input, textarea, select")));
    };

    window.addEventListener("resize", syncCursorMode);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handlePointerOver);

    return () => {
      window.removeEventListener("resize", syncCursorMode);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handlePointerOver);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!shouldShowCursor) return null;

  return (
    <>
      <div
        className="cursor-spotlight"
        style={{
          height: isHovering ? 112 : 82,
          left: position.x,
          top: position.y,
          width: isHovering ? 112 : 82
        }}
      />
      <div
        className="cursor-triangle"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.18 : 1})`
        }}
      >
        <div className="triangle-border">
          <div className="triangle-inner" />
        </div>
      </div>
    </>
  );
}
