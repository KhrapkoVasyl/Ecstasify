import { LinearProgress } from '@mui/material';

const LoadingProgress = () => {
  return (
    <LinearProgress
      sx={{ position: 'absolute', top: 0, width: '100%', left: 0 }}
    />
  );
};

export { LoadingProgress };
