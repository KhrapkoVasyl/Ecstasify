import { Box, IconButton, Tooltip } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import PlaybackControls from './PlaybackControls';
import TrackPreview from './TrackPreview';
import { styles } from './styles';
import { useStore } from '@/hooks';
import { observer } from 'mobx-react-lite';

const AudioPlayer = () => {
  const { currentTrack } = useStore('audioPlayerStore');

  return (
    <Box sx={styles.playerWrapper}>
      <TrackPreview
        trackName={currentTrack.name}
        trackCoverImg={currentTrack.coverImg}
        authorName={currentTrack.author.name}
      />
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

export default observer(AudioPlayer);
