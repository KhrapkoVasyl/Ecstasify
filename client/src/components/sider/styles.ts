import { createStyleSheet } from '@/helpers';
import styled from '@emotion/styled';
import { alpha, Theme } from '@mui/material';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';

export const NavLink = styled(RouterNavLink)<NavLinkProps & { theme?: Theme }>(
  ({ theme }) => {
    return {
      textDecoration: 'none',
      padding: '7px 10px',
      alignItems: 'center',
      width: '100%',
      display: 'flex',
      borderRadius: '8px',
      transition: 'background 0.3s ease',
      '&:link, &:visited': {
        color: theme.palette.text.secondary,
        background: 'transparent',
      },
      '&:hover:not(.active)': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
      '&.active': {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        '& .MuiListItemText-root .MuiTypography-root': {
          fontWeight: 500,
        },
      },
      '& .MuiListItemIcon-root': {
        color: 'inherit',
      },
    };
  }
);

export const styles = createStyleSheet({
  list: {
    padding: '10px',
  },
  logoWrapper: {
    background: (theme) => theme.gradients.main,
    padding: '20px',
    h4: {
      margin: 0,
      fontSize: '20px',
    },
  },
});
