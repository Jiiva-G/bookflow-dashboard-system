
import { useEffect, useRef, useState, ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-left' | 'slide-right' | 'slide-up' | 'zoom-in' | 'flip';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  duration?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  duration = 600,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (once && ref.current) observer.unobserve(ref.current);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        rootMargin,
        threshold 
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, rootMargin, once]);

  // Determine animation style based on the animation type
  const getAnimationStyle = () => {
    const baseStyles = { 
      opacity: isVisible ? 1 : 0, 
      transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms` 
    };
    
    switch (animation) {
      case 'slide-left':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)'
        };
      case 'slide-right':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)'
        };
      case 'slide-up':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
        };
      case 'zoom-in':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'scale(1)' : 'scale(0.95)'
        };
      case 'flip':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'perspective(1000px) rotateX(0)' : 'perspective(1000px) rotateX(-15deg)',
          transformOrigin: 'bottom'
        };
      case 'fade-in':
      default:
        return baseStyles;
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${className}`}
      style={getAnimationStyle()}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
