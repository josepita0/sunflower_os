import BeeSwarm from './BeeSwarm';
import { useEffect, useRef } from 'react';
import SunflowerBloomCluster from './SunflowerBloomCluster';
import { renderSunflower } from '../game/renderSunflower';

export default function SunflowerCanvas({
  stage,
  hydration,
  growth,
  pulseFrame,
  bloomClusterIntensity,
  beeSwarmIntensity,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    renderSunflower(ctx, {
      stageKey: stage.key,
      hydration,
      growth,
      pulseFrame,
    });
  }, [growth, hydration, pulseFrame, stage.key]);

  return (
    <div className="canvas-shell panel phosphor-frame">
      <div className="canvas-stage">
        <BeeSwarm pulseFrame={pulseFrame} progress={beeSwarmIntensity} />
        <SunflowerBloomCluster pulseFrame={pulseFrame} progress={bloomClusterIntensity} />
        <canvas
          ref={canvasRef}
          className="sunflower-canvas"
          width="320"
          height="320"
          aria-label={`Etapa del girasol ${stage.label}`}
        />
      </div>
    </div>
  );
}
