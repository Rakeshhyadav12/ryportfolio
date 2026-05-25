import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: -100, y: -100 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setPosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return position;
};
