import { useEffect, useMemo, useRef } from 'react';
import { renderBurstSunflower } from '../game/renderSunflower';

const BLOOM_SPRITES = [
  { size: 84, shiftX: -4, shiftY: 4 },
  { size: 90, shiftX: 4, shiftY: 8 },
  { size: 86, shiftX: 0, shiftY: 6 },
  { size: 92, shiftX: 5, shiftY: 10 },
  { size: 88, shiftX: -3, shiftY: 6 },
  { size: 94, shiftX: 4, shiftY: 9 },
  { size: 84, shiftX: -2, shiftY: 8 },
  { size: 90, shiftX: 3, shiftY: 6 },
  { size: 88, shiftX: 0, shiftY: 10 },
  { size: 94, shiftX: 3, shiftY: 8 },
  { size: 86, shiftX: -4, shiftY: 10 },
  { size: 92, shiftX: 4, shiftY: 8 },
];

export default function SunflowerBurstOverlay({ pulseFrame }) {
  const canvasRefs = useRef([]);
  const sprites = useMemo(() => BLOOM_SPRITES, []);

  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext('2d');
      renderBurstSunflower(ctx, {
        pulseFrame,
        variant: index % 3,
      });
    });
  }, [pulseFrame, sprites]);

  return (
    <div className="sunflower-burst-overlay" aria-hidden="true">
      {sprites.map((sprite, index) => (
        <div key={index} className="burst-cell">
          <canvas
            ref={(node) => {
              canvasRefs.current[index] = node;
            }}
            className="burst-sunflower"
            width="64"
            height="84"
            style={{
              width: `${sprite.size}px`,
              height: `${Math.round(sprite.size * 1.3)}px`,
              marginLeft: `${sprite.shiftX}px`,
              marginTop: `${sprite.shiftY}px`,
              animationDelay: `${index * 70}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
