import Router from '../router';
import { styles } from './styles';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

const App = () => {
  return (
    <Box sx={styles.appWrapper}>
      <Router />
    </Box>
  );
};

export default observer(App);
