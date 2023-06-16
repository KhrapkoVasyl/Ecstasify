import { Nullable } from '@/types';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';

type UseAudioConfig = {
  src: string;
  volume: number;
  onLoadError?: () => void;
};

export const useAudio = ({ src, onLoadError, volume }: UseAudioConfig) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const raf = useRef<Nullable<number>>(null);
  const howl = useRef<Nullable<Howl>>(null);
  const prevSrc = useRef(src);

  useEffect(() => {
    if (!howl.current) {
      howl.current = new Howl({
        volume,
        src: [src],
        html5: true,
        onloaderror: onLoadError,
        onload: handleOnLoad,
        onend: handleOnEnd,
      });

      if (prevSrc.current !== src) {
        prevSrc.current = src;
        play();
      }
    }

    return () => {
      if (howl.current) {
        setIsPlaying(false);
        howl.current.off();
        howl.current.stop();
        howl.current.unload();
        howl.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (howl.current) {
      howl.current.volume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      raf.current = requestAnimationFrame(syncCurrentTime);
    }

    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [isPlaying, isSeeking]);

  const handleOnLoad = () => {
    setHasLoaded(true);
    setDuration(howl.current?.duration() ?? 0);
  };

  const handleOnEnd = () => {
    setIsPlaying(false);
  };

  const syncCurrentTime = () => {
    if (!isSeeking) {
      setCurrentTime(howl.current?.seek() ?? 0);
    }

    raf.current = requestAnimationFrame(syncCurrentTime);
  };

  const play = () => {
    if (!howl.current) return;

    if (howl.current.state() === 'unloaded') {
      howl.current.load();
    }

    howl.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    if (!howl.current) return;

    howl.current.pause();
    setIsPlaying(false);
  };

  const stop = () => {
    if (!howl.current) return;

    howl.current.stop();
    setIsPlaying(false);
  };

  const handleSeekChange = (value: number) => {
    setIsSeeking(true);
    setCurrentTime(value);
  };

  const handleSeekEnd = (value: number) => {
    if (!howl.current) return;

    setCurrentTime(value);
    howl.current.seek(value);
    setIsSeeking(false);
  };

  return {
    stop,
    play,
    pause,
    duration,
    isPlaying,
    hasLoaded,
    currentTime,
    handleSeekEnd,
    handleSeekChange,
  };
};
