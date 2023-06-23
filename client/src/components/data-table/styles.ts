import { createStyleSheet } from '@/helpers';
import { lighten } from '@mui/system';

export const styles = createStyleSheet({
  tableHead: {
    background: ({ palette }) => lighten(palette.primary.main, 0.85),
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  tableCell: {
    color: ({ palette }) => palette.primary.main,
    background: 'none',
    whiteSpace: 'nowrap',
  },
  rowWrapper: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  rowCell: {
    whiteSpace: 'nowrap',
  },
});
