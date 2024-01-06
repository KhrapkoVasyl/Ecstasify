import { useStores } from '@/hooks';
import Router from '../router';
import { styles } from './styles';
import { Box, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const App = () => {
  const {
    profileStore: { getCurrentUser, currentUser },
    authStore: { auth },
  } = useStores();

  useEffect(() => {
    if (auth?.accessToken) {
      getCurrentUser();
    }
  }, [auth?.accessToken]);

  if (!currentUser && auth?.accessToken) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={styles.appWrapper}>
      <Router />
    </Box>
  );
};

export default observer(App);
