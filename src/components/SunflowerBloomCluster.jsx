import { useEffect, useMemo, useRef } from 'react';
import { renderClusterSunflower } from '../game/renderSunflower';

const CLUSTER_SPRITES = [
  { x: '20%', size: 58, depth: 0, stemHeight: 20, lean: -2, baseScale: 0.7 },
  { x: '30%', size: 66, depth: 1, stemHeight: 24, lean: -1, baseScale: 0.76 },
  { x: '40%', size: 74, depth: 2, stemHeight: 28, lean: -1, baseScale: 0.82 },
  { x: '60%', size: 74, depth: 2, stemHeight: 30, lean: 1, baseScale: 0.84 },
  { x: '70%', size: 66, depth: 1, stemHeight: 25, lean: 1, baseScale: 0.78 },
  { x: '80%', size: 58, depth: 0, stemHeight: 21, lean: 2, baseScale: 0.72 },
];

function getSpriteProgress(progress, index, total) {
  if (progress <= 0) {
    return 0;
  }

  const threshold = index / total;
  const window = 1 / total;
  return Math.max(0, Math.min(1, (progress - threshold) / window));
}

export default function SunflowerBloomCluster({ pulseFrame, progress }) {
  const canvasRefs = useRef([]);
  const sprites = useMemo(() => CLUSTER_SPRITES, []);

  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext('2d');
      const sprite = sprites[index];
      renderClusterSunflower(ctx, {
        pulseFrame,
        variant: (index + 1) % 3,
        progress: getSpriteProgress(progress, index, sprites.length),
        stemHeight: sprite.stemHeight,
        lean: sprite.lean,
      });
    });
  }, [progress, pulseFrame, sprites]);

  return (
    <div className="sunflower-bloom-cluster" aria-hidden="true">
      {sprites.map((sprite, index) => {
        const spriteProgress = getSpriteProgress(progress, index, sprites.length);

        return (
          <canvas
            key={`${sprite.x}-${index}`}
            ref={(node) => {
              canvasRefs.current[index] = node;
            }}
            className="cluster-sunflower"
            width="96"
            height="176"
            style={{
              left: sprite.x,
              width: `${sprite.size}px`,
              height: `${Math.round(sprite.size * 1.5)}px`,
              bottom: `${44 + sprite.depth * 10}px`,
              opacity: spriteProgress,
              transform: `translateX(-50%) scale(${sprite.baseScale + spriteProgress * (1 - sprite.baseScale)}) rotate(${sprite.lean * spriteProgress}deg)`,
              animationDelay: `${index * 80}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
