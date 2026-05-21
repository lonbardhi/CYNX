import { useEffect, useState, useRef } from 'react';

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [shouldShowCursor, setShouldShowCursor] = useState(true);
  const rafRef = useRef<number>();
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect if device is mobile/tablet - if so, hide cursor
    const isMobileDevice = () => {
      // Check user agent for mobile indicators
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Check screen width (mobile/tablet is typically < 1024px)
      const isSmallScreen = window.innerWidth < 1024;
      
      // Device is mobile if user agent indicates mobile OR screen is small
      return isMobileUA || isSmallScreen;
    };

    setShouldShowCursor(!isMobileDevice());

    // Re-check on resize
    const handleResize = () => {
      setShouldShowCursor(!isMobileDevice());
    };

    window.addEventListener('resize', handleResize);

    const updatePosition = () => {
      setPosition({ ...positionRef.current });
      rafRef.current = undefined;
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over buttons, CTAs, or links
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cta')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cta')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Only render cursor on desktop/web browsers
  if (!shouldShowCursor) return null;

  return (
    <>
      {/* Circular spotlight background */}
      <div
        className="cursor-spotlight"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '110px' : '80px',
          height: isHovering ? '110px' : '80px',
        }}
      />
      
      {/* Triangular cursor */}
      <div
        className="cursor-triangle"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
        }}
      >
        <div className="triangle-border">
          <div className="triangle-inner" />
        </div>
      </div>
    </>
  );
}