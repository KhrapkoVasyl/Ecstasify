import {
  LibraryMusic,
  Group,
  CardGiftcard,
  AccountCircle,
} from '@mui/icons-material';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ListSubheader,
} from '@mui/material';
import Logo from '../logo';
import { useStore } from '@/hooks';
import { styles, NavLink } from './styles';
import PlaylistsList from '../playlist/playlists-list';

type MenuItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const Sider = () => {
  const { isAdmin } = useStore('profileStore');

  const getMenuItems = () => {
    let menuItems: MenuItem[] = [];

    if (isAdmin) {
      menuItems = menuItems.concat([
        {
          label: 'Users',
          path: '/users',
          icon: <Group />,
        },
        {
          label: 'Tracks',
          path: '/tracks',
          icon: <LibraryMusic />,
        },
        {
          label: 'Subscriptions',
          path: '/subscriptions',
          icon: <CardGiftcard />,
        },
        {
          label: 'Authors',
          path: '/authors',
          icon: <AccountCircle />,
        },
      ]);
    }

    return menuItems;
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.logoWrapper}>
        <Logo />
      </Box>
      <Divider />
      <List sx={styles.list} subheader={<ListSubheader>Menu</ListSubheader>}>
        {getMenuItems().map(({ label, path, icon }) => (
          <ListItem key={path} disablePadding>
            <NavLink to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </NavLink>
          </ListItem>
        ))}
      </List>
      <PlaylistsList />
    </Box>
  );
};

export default Sider;
