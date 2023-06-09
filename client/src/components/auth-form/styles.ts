import { createStyleSheet } from '@/helpers';
import { lighten } from '@mui/material';

export const styles = createStyleSheet({
  authFormWrapper: {
    maxWidth: '350px',
    width: '100%',
    backgroundColor: ({ palette }) => palette.background.paper,
    borderRadius: '10px',
    overflow: 'hidden',
  },
  containedBtn: {
    background: ({ gradients }) => gradients.main,
    boxShadow: 'none',
    '&.Mui-disabled': {
      background: ({ palette }) => lighten(palette.primary.main, 0.8),
    },
    transition: 'background 0.2s ease',
  },
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px 40px 40px 40px',
  },
  header: {
    background: ({ gradients }) => gradients.main,
    padding: '20px 0',
  },
});
