import { createStyleSheet } from '@/helpers';

export const styles = createStyleSheet({
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  pageWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
