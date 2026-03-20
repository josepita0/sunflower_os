import { useEffect, useState } from 'react';

export default function TypingText({ text, speed = 24, className = '' }) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    setVisibleText('');

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [speed, text]);

  return (
    <span className={`typing-text ${className}`.trim()}>
      {visibleText}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}
