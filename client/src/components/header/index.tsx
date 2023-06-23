import { AppBar, Toolbar } from '@mui/material';
import PageNavigationControls from '../page-navigation-controls';
import ProfileChip from '../profile-chip';
import { styles } from './styles';

const Header = () => {
  return (
    <AppBar color="transparent" position="static" elevation={0}>
      <Toolbar sx={styles.toolbar}>
        <PageNavigationControls />
        <ProfileChip />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
