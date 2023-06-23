import { MusicNoteOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { styles } from './styles';

enum PlaylistCoverSizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface IDefaultPlaylistCoverProps {
  size?: `${PlaylistCoverSizes}`;
}

const DefaultPlaylistCover = ({
  size = 'small',
}: IDefaultPlaylistCoverProps) => {
  const sizeValue = {
    [PlaylistCoverSizes.Small]: 38,
    [PlaylistCoverSizes.Medium]: 88,
    [PlaylistCoverSizes.Large]: 188,
  }[size];

  return (
    <Stack sx={{ ...styles.wrapper, width: sizeValue, height: sizeValue }}>
      <MusicNoteOutlined
        fontSize="large"
        sx={{ ...styles.icon, fontSize: sizeValue / 2 }}
      />
    </Stack>
  );
};

export default DefaultPlaylistCover;
