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
import PlayButton from '../play-button';

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
            sx: styles.iconButton,
            onClick: onPrev,
          }}
          tooltipText="Previous"
          icon={<SkipPreviousRounded fontSize="inherit" />}
        />
        <PlayButton
          loading={loading}
          disabled={disabled}
          isPlaying={isPlaying}
          onClick={onTogglePlayback}
        />
        <CustomIconButton
          IconButtonProps={{
            sx: styles.iconButton,
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
