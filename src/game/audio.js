let audioContext;
let ambientGain;
let ambientOscillatorA;
let ambientOscillatorB;
let ambientLfo;
let ambientLfoGain;
let beeGain;
let beeOscillatorA;
let beeOscillatorB;

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

function ensureSoundscape() {
  const ctx = getContext();
  if (!ctx) {
    return null;
  }

  if (!ambientGain) {
    ambientGain = ctx.createGain();
    ambientGain.gain.value = 0.0001;

    ambientOscillatorA = ctx.createOscillator();
    ambientOscillatorA.type = 'sine';
    ambientOscillatorA.frequency.value = 164;

    ambientOscillatorB = ctx.createOscillator();
    ambientOscillatorB.type = 'sine';
    ambientOscillatorB.frequency.value = 246;
    ambientOscillatorB.detune.value = 2;

    ambientLfo = ctx.createOscillator();
    ambientLfo.type = 'sine';
    ambientLfo.frequency.value = 0.11;

    ambientLfoGain = ctx.createGain();
    ambientLfoGain.gain.value = 0.0011;

    ambientOscillatorA.connect(ambientGain);
    ambientOscillatorB.connect(ambientGain);
    ambientLfo.connect(ambientLfoGain);
    ambientLfoGain.connect(ambientGain.gain);
    ambientGain.connect(ctx.destination);

    ambientOscillatorA.start();
    ambientOscillatorB.start();
    ambientLfo.start();
  }

  if (!beeGain) {
    beeGain = ctx.createGain();
    beeGain.gain.value = 0.0001;

    beeOscillatorA = ctx.createOscillator();
    beeOscillatorA.type = 'triangle';
    beeOscillatorA.frequency.value = 186;

    beeOscillatorB = ctx.createOscillator();
    beeOscillatorB.type = 'sine';
    beeOscillatorB.frequency.value = 198;
    beeOscillatorB.detune.value = -3;

    beeOscillatorA.connect(beeGain);
    beeOscillatorB.connect(beeGain);
    beeGain.connect(ctx.destination);

    beeOscillatorA.start();
    beeOscillatorB.start();
  }

  return ctx;
}

function rampGain(gainNode, nextValue, duration = 0.2) {
  const ctx = ensureSoundscape();
  if (!ctx || !gainNode) {
    return;
  }

  const safeValue = Math.max(nextValue, 0.0001);
  gainNode.gain.cancelScheduledValues(ctx.currentTime);
  gainNode.gain.setValueAtTime(Math.max(gainNode.gain.value, 0.0001), ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(safeValue, ctx.currentTime + duration);
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
    frequency: 520,
    sweepTo: 610,
    duration: 0.06,
    type: 'sine',
    volume: 0.008,
  });
}

export function playBloomTone() {
  playTone({
    frequency: 330,
    sweepTo: 520,
    duration: 0.18,
    type: 'sine',
    volume: 0.012,
  });
}

export function enableSoundscape() {
  ensureSoundscape();
}

export function setAmbientLevel(level) {
  ensureSoundscape();
  rampGain(ambientGain, 0.0001 + level, 0.35);
}

export function setBeeBuzzLevel(level) {
  ensureSoundscape();
  rampGain(beeGain, 0.0001 + level, 0.18);
}
