import TypingText from './TypingText';

const INTRO_MESSAGE =
  'Hola chisqui, una vez más te escribo, porque soy un intenso, un enamorado, un fastidioso, un malcriado, y todo. No te pude mandar flores, -lo siento- pero hice algo más propio y que perdura mucho más; puede que esta nunca se te vaya a marchitar. Espero poco a poco ir llegando a ti, te amo chisqui.';

export default function IntroScreen({ onContinue }) {
  return (
    <div className="terminal-app">
      <header className="top-bar">
        <div className="os-title">GIRASOL_PA_LA_GIGI_OS_V1.0</div>
      </header>

      <main className="intro-main">
        <section className="intro-screen panel phosphor-frame">
          <div className="panel-label">PARA TI</div>
          <div className="intro-message-shell">
            <TypingText text={INTRO_MESSAGE} speed={40} className="intro-message" />
          </div>
          <button className="terminal-button primary-button intro-continue" onClick={onContinue}>
            CONTINUAR
          </button>
        </section>
      </main>
    </div>
  );
}
