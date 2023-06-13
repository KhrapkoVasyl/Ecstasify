import { formatPlaybackTime } from '@/helpers';
import { Box, Typography } from '@mui/material';
import { PlaybackTime as Time } from './styles';

interface IPlaybackTimeProps {
  currentTime?: number;
  fullDuration?: number;
}

const PlaybackTime = ({
  currentTime = 0,
  fullDuration = 0,
}: IPlaybackTimeProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
      }}
    >
      <Time align="right">{formatPlaybackTime(currentTime)}</Time>
      <Typography color="text.secondary" fontSize={12}>
        /
      </Typography>
      <Time align="left">{formatPlaybackTime(fullDuration)}</Time>
    </Box>
  );
};

export default PlaybackTime;
