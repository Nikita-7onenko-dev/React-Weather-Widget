import { useEffect, useRef } from 'react';
import { Carousel } from '../../Methods/carousel';

export function CarouselWrapper({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const carousel = new Carousel(containerRef.current);
      console.log(carousel)

      return () => {
        // тут можно по-хорошему добавить destroy-метод в твой класс и вызывать его здесь
        // например: carousel.destroy()
      };
    }
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', display: 'flex' }}>
      {children}
    </div>
  );
}
