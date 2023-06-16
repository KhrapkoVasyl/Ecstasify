import { Box, IconButton, Tooltip } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import PlaybackControls from './PlaybackControls';
import TrackPreview from './TrackPreview';
import { styles } from './styles';
import { useAudio, useMediaSession, useStore } from '@/hooks';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import SeekBar from './SeekBar';
import PlaybackTime from './PlaybackTime';
import VolumeControl from './VolumeControl';

const AudioPlayer = () => {
  const {
    handleAudioError,
    goToNextTrack,
    goToPrevTrack,
    currentTrack,
    volume,
    setVolume,
  } = useStore('audioPlayerStore');

  const [hasError, setHasError] = useState(false);

  const {
    stop,
    play,
    pause,
    duration,
    isPlaying,
    hasLoaded,
    currentTime,
    handleSeekEnd,
    handleSeekChange,
  } = useAudio({
    volume,
    src: currentTrack?.file,
    onLoadError: () => {
      setHasError(true);
      handleAudioError();
    },
  });

  useMediaSession({
    key: currentTrack?.file,
    mediaMetadataInit: {
      title: currentTrack.name,
      artist: currentTrack.author.name,
      artwork: [{ src: currentTrack.coverImg }],
    },
    actionHandlers: [
      ['stop', stop],
      ['play', play],
      ['pause', pause],
      ['nexttrack', goToNextTrack],
      ['previoustrack', goToPrevTrack],
    ],
  });

  useEffect(() => () => setHasError(false), [currentTrack?.file]);

  const handleTogglePlayback = () => (isPlaying ? pause() : play());

  const areDisabledControls = hasError;
  const isLoading = isPlaying && !hasLoaded && !hasError;

  return (
    <Box sx={styles.playerWrapper}>
      <SeekBar
        onSeekEnd={handleSeekEnd}
        playbackTime={currentTime}
        playbackDuration={duration}
        disabled={areDisabledControls}
        onSeekChange={handleSeekChange}
      />
      <TrackPreview
        trackName={currentTrack.name}
        trackCoverImg={currentTrack.coverImg}
        authorName={currentTrack.author.name}
      />
      <PlaybackControls
        loading={isLoading}
        isPlaying={isPlaying}
        onNext={goToNextTrack}
        onPrev={goToPrevTrack}
        onTogglePlayback={handleTogglePlayback}
      />
      <Box sx={styles.playerExtraWrapper}>
        <PlaybackTime currentTime={currentTime} fullDuration={duration} />
        <VolumeControl value={volume} onChange={setVolume} />
        <Tooltip title="Expand">
          <IconButton sx={styles.expandButton}>
            <KeyboardArrowUp />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default observer(AudioPlayer);
