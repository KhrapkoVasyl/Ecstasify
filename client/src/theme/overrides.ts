export const overrides = {
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
  MuiPopover: {
    elevation: 0,
    styleOverrides: {
      paper: {
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      },
    },
  },
};
