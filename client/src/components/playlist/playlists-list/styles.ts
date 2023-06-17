import { createStyleSheet } from '@/helpers';

export const styles = createStyleSheet({
  list: {
    padding: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  headerIcon: {
    alignSelf: 'center',
  },
  item: { padding: 0 },
  itemButton: {
    padding: '5px',
  },
  itemText: { fontSize: '15px' },
  itemsWrapper: {
    flex: 1,
    overflow: 'hidden',
    ':hover': {
      overflow: 'auto',
    },
  },
});
