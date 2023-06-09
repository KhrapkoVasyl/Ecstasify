import { SxProps, Theme } from '@mui/material';

export const createStyleSheet = <T extends string>(
  rules: Record<T, SxProps<Theme>>
) => rules;
