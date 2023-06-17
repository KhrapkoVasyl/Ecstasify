import { Add } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
} from '@mui/material';
import DefaultPlaylistCover from '../default-playlist-cover';
import { styles } from './styles';

const PlaylistsList = () => {
  const mockPlaylists = ['My Playlist #1', 'My Playlist #2', 'My Playlist #3'];

  return (
    <List
      sx={styles.list}
      subheader={
        <ListSubheader>
          <Stack direction="row" justifyContent="space-between">
            Playlists
            <IconButton sx={styles.headerIcon} size="small" color="inherit">
              <Add fontSize="small" />
            </IconButton>
          </Stack>
        </ListSubheader>
      }
    >
      <Box sx={styles.itemsWrapper}>
        {[...mockPlaylists].map((el) => {
          return (
            <ListItem key={el} sx={styles.item}>
              <ListItemButton disableRipple sx={styles.itemButton}>
                <ListItemIcon>
                  <DefaultPlaylistCover />
                </ListItemIcon>
                <ListItemText sx={styles.itemText} primary={el} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </Box>
    </List>
  );
};

export default PlaylistsList;
