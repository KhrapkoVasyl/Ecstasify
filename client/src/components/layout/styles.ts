import { createStyleSheet } from '@/helpers';

export const styles = createStyleSheet({
  layout: {
    maxHeight: '100vh',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    width: 0,
    flex: 1,
    position: 'relative',
  },
  content: {
    padding: '70px 32px 32px 32px',
    flex: 1,
    height: 0,
    overflow: 'auto',
  },
  siderWrapper: {
    height: '100%',
    flex: '0 0 240px',
  },
  audioPlayerWrapper: {
    gridColumn: '1 / -1',
  },
});
