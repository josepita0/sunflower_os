import { useEffect, useMemo, useRef, useState } from 'react';
import Controls from './components/Controls';
import { APP_CONFIG } from './config/appConfig';
import IntroScreen from './components/IntroScreen';
import StatusPanel from './components/StatusPanel';
import SunflowerBurstOverlay from './components/SunflowerBurstOverlay';
import SunflowerCanvas from './components/SunflowerCanvas';
import TerminalLayout from './components/TerminalLayout';
import {
  enableSoundscape,
  playBloomTone,
  playWaterTone,
  setAmbientLevel,
  setBeeBuzzLevel,
} from './game/audio';
import { clamp, getStage } from './game/stages';

const INITIAL_HYDRATION = 20;
const INITIAL_GROWTH = 0;
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hydration, setHydration] = useState(INITIAL_HYDRATION);
  const [growth, setGrowth] = useState(INITIAL_GROWTH);
  const [tick, setTick] = useState(0);
  const [pulseFrame, setPulseFrame] = useState(0);
  const [bloomClusterUnlocked, setBloomClusterUnlocked] = useState(false);
  const [bloomClusterProgress, setBloomClusterProgress] = useState(0);
  const lastWaterRef = useRef(0);
  const bloomTriggeredRef = useRef(false);
  const bloomFieldTriggeredRef = useRef(false);
  const hydrationLockUntilRef = useRef(0);

  const stage = useMemo(() => getStage(growth), [growth]);
  const canWater = hydration < 100 || growth < 100;
  const bloomFieldActive = hydration >= 100 && growth >= 100;
  const bloomClusterTarget = !bloomClusterUnlocked
    ? 0
    : hydration >= 50
      ? 1
      : clamp(hydration / 50, 0, 1);

  useEffect(() => {
    document.title = APP_CONFIG.browserTitle;
  }, []);

  useEffect(() => {
    if (showIntro) {
      setAmbientLevel(0.0008);
      setBeeBuzzLevel(0);
      return;
    }

    setAmbientLevel(0.0022);
  }, [showIntro]);

  useEffect(() => {
    if (showIntro) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
      setPulseFrame((value) => (value + 1) % 6);
      setHydration((value) => {
        const isHydrationLocked = value >= 100 && Date.now() < hydrationLockUntilRef.current;
        const nextHydration = isHydrationLocked ? 100 : clamp(value - 1.4, 0, 100);

        setGrowth((currentGrowth) => {
          const passiveGrowth = nextHydration >= 18 ? 0.9 : nextHydration >= 8 ? 0.35 : 0;
          return clamp(currentGrowth + passiveGrowth, 0, 100);
        });

        return nextHydration;
      });
    }, 850);

    return () => window.clearInterval(interval);
  }, [showIntro]);

  useEffect(() => {
    if (growth >= 100 && hydration >= 100) {
      setBloomClusterUnlocked(true);
    }
  }, [growth, hydration]);

  useEffect(() => {
    if (showIntro) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setBloomClusterProgress((current) => {
        const delta = bloomClusterTarget - current;

        if (Math.abs(delta) < 0.04) {
          return bloomClusterTarget;
        }

        return clamp(current + Math.sign(delta) * 0.12, 0, 1);
      });
    }, 90);

    return () => window.clearInterval(interval);
  }, [bloomClusterTarget, showIntro]);

  useEffect(() => {
    if (showIntro) {
      setBeeBuzzLevel(0);
      return;
    }

    setBeeBuzzLevel(bloomClusterProgress * 0.0035);
  }, [bloomClusterProgress, showIntro]);

  useEffect(() => {
    if (bloomFieldActive) {
      if (!bloomFieldTriggeredRef.current) {
        bloomFieldTriggeredRef.current = true;
      }
      return;
    }

    bloomFieldTriggeredRef.current = false;

    if (stage.key === 'flower') {
      if (!bloomTriggeredRef.current) {
        bloomTriggeredRef.current = true;
        playBloomTone();
      }
    }
  }, [bloomFieldActive, stage]);

  function handleWater() {
    enableSoundscape();
    const now = Date.now();
    const delta = now - lastWaterRef.current;
    const nextStreak = delta > 200 && delta < 950 ? 2 : 1;
    const rhythmBonus = Math.min(nextStreak, 5);

    lastWaterRef.current = now;
    setPulseFrame((value) => (value + 2) % 6);

    setHydration((value) => {
      const nextHydration = clamp(value + 14 + rhythmBonus * 2, 0, 100);

      if (nextHydration >= 100) {
        hydrationLockUntilRef.current = Math.max(hydrationLockUntilRef.current, now + 3000);
      }

      return nextHydration;
    });
    setGrowth((value) => clamp(value + 4 + rhythmBonus, 0, 100));

    playWaterTone();
  }

  function handleRestart() {
    setHydration(INITIAL_HYDRATION);
    setGrowth(INITIAL_GROWTH);
    setTick(0);
    setPulseFrame(0);
    setBloomClusterUnlocked(false);
    setBloomClusterProgress(0);
    lastWaterRef.current = 0;
    bloomTriggeredRef.current = false;
    bloomFieldTriggeredRef.current = false;
    hydrationLockUntilRef.current = 0;
  }

  function handleContinue() {
    enableSoundscape();
    setShowIntro(false);
  }

  function handleOpenIntro() {
    enableSoundscape();
    setShowIntro(true);
  }

  if (showIntro) {
    return <IntroScreen onContinue={handleContinue} />;
  }

  return (
    <TerminalLayout
      bloomOverlay={bloomFieldActive ? <SunflowerBurstOverlay pulseFrame={pulseFrame} /> : null}
      statusPanel={<StatusPanel hydration={hydration} growth={growth} />}
      canvas={
        <SunflowerCanvas
          stage={stage}
          hydration={hydration}
          growth={growth}
          pulseFrame={pulseFrame}
          bloomClusterIntensity={bloomClusterProgress}
          beeSwarmIntensity={bloomClusterProgress}
        />
      }
      controls={<Controls onWater={handleWater} disabled={!canWater} />}
      onRestart={handleRestart}
      onOpenIntro={handleOpenIntro}
    />
  );
}
