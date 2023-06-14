import { Box, CircularProgress } from '@mui/material';
import {
  PauseCircleRounded,
  PlayCircleFilledWhiteRounded,
  SkipNextRounded,
  SkipPreviousRounded,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import CustomIconButton from '../icon-button';
import { styles } from './styles';

interface IPlaybackControls {
  onTogglePlayback: () => void;
  onNext: () => void;
  onPrev: () => void;
  loading?: boolean;
  disabled?: boolean;
  isPlaying?: boolean;
}

const PlaybackControls = ({
  onTogglePlayback,
  onNext,
  onPrev,
  loading = false,
  disabled = false,
  isPlaying = false,
}: IPlaybackControls) => {
  return (
    <Box sx={styles.controlsWrapper}>
      <Box>
        <CustomIconButton
          IconButtonProps={{
            sx: styles.skipButton,
            onClick: onPrev,
          }}
          tooltipText="Previous"
          icon={<SkipPreviousRounded fontSize="inherit" />}
        />
        <CustomIconButton
          tooltipText={isPlaying ? 'Pause' : 'Play'}
          IconButtonProps={{
            disabled,
            color: 'primary',
            sx: styles.playbackToggle,
            onClick: onTogglePlayback,
          }}
          icon={
            <>
              {loading && (
                <CircularProgress size="50px" sx={styles.audioLoader} />
              )}
              {isPlaying && !disabled ? (
                <PauseCircleRounded />
              ) : (
                <PlayCircleFilledWhiteRounded />
              )}
            </>
          }
        />
        <CustomIconButton
          IconButtonProps={{
            sx: styles.skipButton,
            onClick: onNext,
          }}
          tooltipText="Next"
          icon={<SkipNextRounded />}
        />
      </Box>
    </Box>
  );
};

export default observer(PlaybackControls);
