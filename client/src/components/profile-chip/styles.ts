import { createStyleSheet } from '@/helpers';

export const styles = createStyleSheet({
  menu: {
    '& .MuiPaper-root': {
      minWidth: 180,
      marginTop: '10px',
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
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
