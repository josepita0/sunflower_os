import { useEffect, useMemo, useRef } from 'react';
import { renderBee } from '../game/renderSunflower';

const BEES = [
  { radiusX: 76, radiusY: -12, size: 34, duration: '6.8s', delay: '-0.7s', tilt: '-8deg' },
  { radiusX: 60, radiusY: -46, size: 30, duration: '5.9s', delay: '-1.9s', tilt: '6deg' },
  { radiusX: -70, radiusY: -18, size: 32, duration: '6.3s', delay: '-1.1s', tilt: '-4deg' },
  { radiusX: -54, radiusY: -54, size: 28, duration: '5.6s', delay: '-2.4s', tilt: '10deg' },
  { radiusX: 0, radiusY: -72, size: 26, duration: '5.2s', delay: '-0.3s', tilt: '2deg' },
];

function getBeeVisibility(progress, index, total) {
  if (progress <= 0) {
    return 0;
  }

  const threshold = index / total;
  const window = 1 / total;
  return Math.max(0, Math.min(1, (progress - threshold) / window));
}

export default function BeeSwarm({ pulseFrame, progress }) {
  const canvasRefs = useRef([]);
  const bees = useMemo(() => BEES, []);

  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext('2d');
      renderBee(ctx, {
        pulseFrame,
        variant: index,
      });
    });
  }, [pulseFrame, bees]);

  return (
    <div className="bee-swarm" aria-hidden="true">
      {bees.map((bee, index) => {
        const visibility = getBeeVisibility(progress, index, bees.length);

        return (
          <div
            key={`${bee.radiusX}-${bee.radiusY}-${index}`}
            className="bee-orbit"
            style={{
              animationDuration: bee.duration,
              animationDelay: bee.delay,
              opacity: visibility,
            }}
          >
            <canvas
              ref={(node) => {
                canvasRefs.current[index] = node;
              }}
              className="pixel-bee"
              width="48"
              height="32"
              style={{
                width: `${bee.size}px`,
                height: `${Math.round(bee.size * 0.66)}px`,
                transform: `translate(${bee.radiusX}px, ${bee.radiusY}px) rotate(${bee.tilt}) scale(${0.55 + visibility * 0.45})`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
