import TypingText from './TypingText';
import { APP_CONFIG } from '../config/appConfig';

export default function IntroScreen({ onContinue }) {
  return (
    <div className="terminal-app">
      <header className="top-bar">
        <div className="os-title">{APP_CONFIG.systemName}</div>
      </header>

      <main className="intro-main">
        <section className="intro-screen panel phosphor-frame">
          <div className="panel-label">PARA TI</div>
          <div className="intro-message-shell">
            <TypingText text={APP_CONFIG.introMessage} speed={40} className="intro-message" />
          </div>
          <button className="terminal-button primary-button intro-continue" onClick={onContinue}>
            CONTINUAR
          </button>
        </section>
      </main>
    </div>
  );
}
