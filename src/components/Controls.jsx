export default function Controls({ onWater, disabled }) {
  return (
    <div className="controls-stack">
      <button className="terminal-button primary-button" onClick={onWater} disabled={disabled}>
         REGAR
      </button>
    </div>
  );
}
