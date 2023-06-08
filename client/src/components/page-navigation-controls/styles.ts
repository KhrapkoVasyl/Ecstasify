import { createStyleSheet } from '@/helpers';
import { lighten } from '@mui/system';

export const styles = createStyleSheet({
  iconButton: {
    backgroundColor: ({ palette }) => lighten(palette.text.secondary, 0.9),
  },
});
