import { Box, CircularProgress, Slider, SliderProps } from '@mui/material';
import {
  PauseCircle,
  PlayCircleFilledWhite,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material';
import { useAudio, useStore } from '@/hooks';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import CustomIconButton from '../icon-button';
import { formatPlaybackTime } from '@/helpers';
import { styles, PlaybackTime } from './styles';

const PlaybackControls = () => {
  const { handleAudioError, goToNextTrack, goToPrevTrack, currentTrack } =
    useStore('audioPlayerStore');

  const [hasError, setHasError] = useState(false);

  const {
    play,
    pause,
    isPlaying,
    duration,
    currentTime,
    hasLoaded,
    handleSeekEnd,
    handleSeekChange,
  } = useAudio({
    src: currentTrack?.file,
    onLoadError: () => {
      setHasError(true);
      handleAudioError();
    },
  });

  useEffect(() => () => setHasError(false), [currentTrack?.file]);

  const handleTogglePlayback = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSeekSliderChange: SliderProps['onChange'] = (_, value) => {
    if (typeof value === 'number') {
      handleSeekChange(value);
    }
  };

  const handleSeekSliderChangeCommited: SliderProps['onChangeCommitted'] = (
    _,
    value
  ) => {
    if (typeof value === 'number') {
      handleSeekEnd(value);
    }
  };

  const areDisabledControls = hasError;
  const isAudioLoaderShown = isPlaying && !hasLoaded && !hasError;

  return (
    <Box sx={styles.controlsWrapper}>
      <Box>
        <CustomIconButton
          IconButtonProps={{
            sx: styles.skipButton,
            onClick: goToPrevTrack,
          }}
          tooltipText="Previous"
          icon={<SkipPrevious fontSize="inherit" />}
        />
        <CustomIconButton
          tooltipText={isPlaying ? 'Pause' : 'Play'}
          IconButtonProps={{
            color: 'primary',
            sx: styles.playbackToggle,
            disabled: areDisabledControls,
            onClick: handleTogglePlayback,
          }}
          icon={
            <>
              {isAudioLoaderShown && (
                <CircularProgress size="50px" sx={styles.audioLoader} />
              )}
              {isPlaying && !areDisabledControls ? (
                <PauseCircle />
              ) : (
                <PlayCircleFilledWhite />
              )}
            </>
          }
        />
        <CustomIconButton
          IconButtonProps={{
            sx: styles.skipButton,
            onClick: goToNextTrack,
          }}
          tooltipText="Next"
          icon={<SkipNext />}
        />
      </Box>
      <Box sx={styles.progressWrapper}>
        <PlaybackTime align="right">
          {formatPlaybackTime(currentTime)}
        </PlaybackTime>
        <Slider
          size="small"
          max={duration}
          sx={styles.slider}
          value={currentTime}
          disabled={areDisabledControls}
          onChange={handleSeekSliderChange}
          onChangeCommitted={handleSeekSliderChangeCommited}
        />
        <PlaybackTime align="left">{formatPlaybackTime(duration)}</PlaybackTime>
      </Box>
    </Box>
  );
};

export default observer(PlaybackControls);
