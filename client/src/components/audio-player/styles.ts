import { createStyleSheet } from '@/helpers';
import { styled } from '@mui/material';

export const styles = createStyleSheet({
  playerWrapper: {
    backgroundColor: '#fff',
    height: '92px',
    display: 'flex',
    padding: '10px 15px',
    boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
  },
  trackCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderRadius: 0,
    flex: 1,
  },
  trackImg: {
    width: '55px',
    height: '55px',
  },
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  skipButton: {
    color: (theme) => theme.palette.text.secondary,
  },
  progressWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '10px',
  },
  timelineProgress: {
    flex: 1,
  },
  expandButtonWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  expandButton: {
    alignSelf: 'center',
  },
  slider: {
    '.MuiSlider-track': {
      background: (theme) => theme.gradients.main,
      borderColor: 'transparent',
    },
    '.MuiSlider-rail, .MuiSlider-track': {
      height: '4px',
    },
    '.MuiSlider-thumb': {
      opacity: 0,
    },
    '&:hover, &:active': {
      '.MuiSlider-thumb': {
        opacity: 1,
      },
    },
    '.MuiSlider-thumb.Mui-active': {
      boxShadow: '0px 0px 0px 10px rgb(102 126 234 / 16%)',
    },
    padding: '8px 0',
  },
  favoriteIcon: {
    color: '#e74c3c',
  },
});

export const PlaybackTime = styled('div')<{ align: 'left' | 'right' }>(
  ({ theme, align = 'left' }) => ({
    fontSize: '12px',
    minWidth: '40px',
    textAlign: align,
    color: theme.palette.text.secondary,
  })
);
