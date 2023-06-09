import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Stack } from '@mui/material';
import CustomIconButton from '../icon-button';
import { styles } from './styles';

const PageNavigationControls = () => {
  return (
    <Stack direction="row" gap="10px" alignItems="center">
      <CustomIconButton
        tooltipText="Previous Page"
        icon={<NavigateBefore />}
        IconButtonProps={{
          sx: styles.iconButton,
        }}
      />
      <CustomIconButton
        tooltipText="Next Page"
        icon={<NavigateNext />}
        IconButtonProps={{
          sx: styles.iconButton,
        }}
      />
    </Stack>
  );
};

export default PageNavigationControls;
