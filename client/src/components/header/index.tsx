import { AppBar, Stack, TextField, Toolbar } from '@mui/material';
import PageNavigationControls from '../page-navigation-controls';
import ProfileChip from '../profile-chip';
import { styles } from './styles';
import { Search } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/hooks';

const Header = () => {
  const {
    headerStore: { searchString, setSearchString },
  } = useStores();

  return (
    <AppBar
      color="transparent"
      position="static"
      elevation={0}
      sx={{ position: 'absolute', zIndex: 1000 }}
    >
      <Toolbar sx={styles.toolbar}>
        <Stack direction="row" gap={2} flexBasis="400px">
          <PageNavigationControls />
          <TextField
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            fullWidth
            placeholder="What do you want to listen to?"
            sx={{
              '.MuiInputBase-root': { borderRadius: 40, border: 'none' },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              background: (theme) => theme.palette.grey[100],
              borderRadius: 40,
              input: { padding: '10px 14px' },
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

export default observer(Header);
