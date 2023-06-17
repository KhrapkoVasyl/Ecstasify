import { ThemeOptions } from '@mui/system';

export const overrides: ThemeOptions['components'] = {
  MuiListSubheader: {
    styleOverrides: {
      root: {
        backgroundColor: 'unset',
        paddingRight: 0,
        lineHeight: '40px',
        paddingLeft: '12px',
        fontSize: '16px',
      },
    },
  },
};
