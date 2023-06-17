import { Box, Paper, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AudioPlayer from '../audio-player';
import Sider from '../sider';
import Header from '../header';
import { styles } from './styles';

const Layout = () => {
  return (
    <Box sx={styles.layout}>
      <Stack flexDirection="row" flex="1" height={0}>
        <Box sx={styles.siderWrapper}>
          <Sider />
        </Box>
        <Paper elevation={0} sx={styles.mainWrapper}>
          <Header />
          <Box sx={styles.content}>
            <Outlet />
          </Box>
        </Paper>
      </Stack>
      <Box sx={styles.audioPlayerWrapper}>
        <AudioPlayer />
      </Box>
    </Box>
  );
};

export default Layout;
