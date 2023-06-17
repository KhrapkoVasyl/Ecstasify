import { createStyleSheet } from '@/helpers';
import { alpha } from '@mui/system';

export const styles = createStyleSheet({
  wrapper: {
    background: ({ palette }) => alpha(palette.primary.main, 0.3),
    width: '38px',
    height: '38px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2px',
  },
  icon: {
    color: ({ palette }) => palette.common.white,
  },
});
