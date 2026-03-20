let audioContext;

function getContext() {
  if (typeof window === 'undefined') {
    return null;
  }

  const AudioContextRef = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextRef) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextRef();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone({ frequency, duration, type = 'square', volume = 0.03, sweepTo }) {
  const ctx = getContext();
  if (!ctx) {
    return;
  }

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const start = ctx.currentTime;
  const end = start + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  if (sweepTo) {
    oscillator.frequency.linearRampToValueAtTime(sweepTo, end);
  }

  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(start);
  oscillator.stop(end);
}

export function playWaterTone() {
  playTone({
    frequency: 420,
    sweepTo: 520,
    duration: 0.08,
    type: 'square',
    volume: 0.025,
  });
}

export function playBloomTone() {
  playTone({
    frequency: 280,
    sweepTo: 780,
    duration: 0.22,
    type: 'triangle',
    volume: 0.04,
  });
}
