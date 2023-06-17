import { MusicNoteOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { styles } from './styles';

const DefaultPlaylistCover = () => {
  return (
    <Stack sx={styles.wrapper}>
      <MusicNoteOutlined fontSize="small" sx={styles.icon} />
    </Stack>
  );
};

export default DefaultPlaylistCover;
