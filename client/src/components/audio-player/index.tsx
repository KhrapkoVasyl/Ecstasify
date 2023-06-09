import { Box, IconButton, Tooltip } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import PlaybackControls from './PlaybackControls';
import TrackPreview from './TrackPreview';
import { styles } from './styles';

const AudioPlayer = () => {
  return (
    <Box sx={styles.playerWrapper}>
      <TrackPreview />
      <PlaybackControls />
      <Box sx={styles.expandButtonWrapper}>
        <Tooltip title="Expand">
          <IconButton sx={styles.expandButton}>
            <KeyboardArrowUp />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
