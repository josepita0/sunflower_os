import { getHydrationBlocks } from '../game/stages';

function BlockMeter({ value, tone = 'secondary' }) {
  const activeBlocks = getHydrationBlocks(value);

  return (
    <div className="block-meter" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => (
        <span
          key={index}
          className={`meter-block ${index < activeBlocks ? `meter-block-${tone}` : ''}`.trim()}
        />
      ))}
    </div>
  );
}

export default function StatusPanel({ hydration, growth }) {
  return (
    <aside className="status-panel panel">
      <div className="panel-group">
        <div className="panel-label">NIVEL DE HIDRATACION</div>
        <BlockMeter value={hydration} tone="secondary" />
        <div className="panel-metric">{Math.round(hydration)}%</div>
      </div>

      <div className="panel-group">
        <div className="panel-label">PROGRESO DE CRECIMIENTO</div>
        <BlockMeter value={growth} tone="primary" />
        <div className="panel-metric">{Math.round(growth)}%</div>
      </div>
    </aside>
  );
}
