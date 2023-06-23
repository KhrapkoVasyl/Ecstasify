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
import { useMenuPopover } from '@/hooks';
import CreatePlaylistPopover from '../create-playlist-popover';
import { useNavigate } from 'react-router-dom';

const PlaylistsList = () => {
  const { anchorEl, open, closeMenu, openMenu } =
    useMenuPopover<HTMLButtonElement>();

  const navigate = useNavigate();

  const mockPlaylists = ['My Playlist #1', 'My Playlist #2', 'My Playlist #3'];

  return (
    <List
      sx={styles.list}
      subheader={
        <ListSubheader>
          <Stack direction="row" justifyContent="space-between">
            Playlists
            <IconButton
              size="small"
              color="inherit"
              onClick={openMenu}
              sx={styles.headerIcon}
            >
              <Add fontSize="small" />
            </IconButton>
            <CreatePlaylistPopover
              PopoverProps={{ open: open, onClose: closeMenu, anchorEl }}
            />
          </Stack>
        </ListSubheader>
      }
    >
      <Box sx={styles.itemsWrapper}>
        {[...mockPlaylists].map((el) => {
          return (
            <ListItem key={el} sx={styles.item}>
              <ListItemButton
                disableRipple
                sx={styles.itemButton}
                onClick={() => {
                  navigate('/playlist/sdfds');
                }}
              >
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
