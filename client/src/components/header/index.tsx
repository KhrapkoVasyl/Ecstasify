import { AppBar, Stack, TextField, Toolbar } from '@mui/material';
import PageNavigationControls from '../page-navigation-controls';
import ProfileChip from '../profile-chip';
import { styles } from './styles';
import { Search } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar color="transparent" position="static" elevation={0}>
      <Toolbar sx={styles.toolbar}>
        <Stack direction="row" gap={2} flexBasis="400px">
          <PageNavigationControls />
          <TextField
            fullWidth
            placeholder="What do you want to listen to?"
            sx={{
              '.MuiInputBase-root': { borderRadius: 40, border: 'none' },
              background: (theme) => theme.palette.grey[100],
              borderRadius: 40,
            }}
            InputProps={{
              startAdornment: (
                <Search
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                />
              ),
            }}
          />
        </Stack>
        <ProfileChip />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
