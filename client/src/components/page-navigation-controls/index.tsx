import {
  NavigateBeforeRounded,
  NavigateNextRounded,
} from '@mui/icons-material';
import { Stack } from '@mui/material';
import CustomIconButton from '../icon-button';
import { styles } from './styles';

const PageNavigationControls = () => {
  return (
    <Stack direction="row" gap="10px" alignItems="center">
      <CustomIconButton
        tooltipText="Previous Page"
        icon={<NavigateBeforeRounded />}
        IconButtonProps={{
          sx: styles.iconButton,
        }}
      />
      <CustomIconButton
        tooltipText="Next Page"
        icon={<NavigateNextRounded />}
        IconButtonProps={{
          sx: styles.iconButton,
        }}
      />
    </Stack>
  );
};

export default PageNavigationControls;
