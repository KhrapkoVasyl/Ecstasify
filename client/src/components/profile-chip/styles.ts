import { createStyleSheet } from '@/helpers';

export const styles = createStyleSheet({
  menu: {
    '& .MuiPaper-root': {
      minWidth: 180,
      marginTop: '10px',
    },
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      fontSize: '14px',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: '10px',
      },
    },
  },
  chip: {
    '&:active': {
      boxShadow: 'none',
    },
    fontSize: '14px',
  },
  avatar: {
    width: '25px',
    height: '25px',
  },
});
