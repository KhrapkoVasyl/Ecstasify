import { createStyleSheet } from '@/helpers';

export const styles = createStyleSheet({
  playbackToggle: {
    padding: '6px',
    position: 'relative',
    alignSelf: 'center',
    '.MuiSvgIcon-root': {
      fontSize: '40px',
    },
  },
  audioLoader: {
    position: 'absolute',
  },
});
