export default function TerminalLayout({
  statusPanel,
  canvas,
  controls,
  bloomOverlay,
  onRestart,
  onOpenIntro,
}) {
  return (
    <div className="terminal-app">
      {bloomOverlay}
      <header className="top-bar">
        <div className="os-title">GIRASOL_PA_LA_GIGI_OS_V1.0</div>
        <button className="header-action-button" type="button" onClick={onOpenIntro}>
          _MENSAJE
        </button>
      </header>

      <main className="terminal-main">
        {statusPanel}
        <section className="display-panel">
          {canvas}
          {controls}
        </section>
      </main>

      <footer className="footer-bar">
        <button className="footer-button" type="button" onClick={onRestart}>
          _REINICIAR
        </button>
      </footer>
    </div>
  );
}
