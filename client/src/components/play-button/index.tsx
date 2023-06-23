import React from 'react';
import CustomIconButton from '../icon-button';
import { CircularProgress } from '@mui/material';
import {
  PauseCircleRounded,
  PlayCircleFilledWhiteRounded,
} from '@mui/icons-material';
import { styles } from './styles';

interface IPlayButtonProps {
  isPlaying?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const PlayButton = ({
  isPlaying = false,
  disabled = false,
  loading = false,
  onClick,
}: IPlayButtonProps) => {
  return (
    <CustomIconButton
      tooltipText={isPlaying ? 'Pause' : 'Play'}
      IconButtonProps={{
        onClick,
        disabled,
        color: 'primary',
        sx: styles.playbackToggle,
      }}
      icon={
        <>
          {loading && <CircularProgress size="50px" sx={styles.audioLoader} />}
          {isPlaying && !disabled ? (
            <PauseCircleRounded />
          ) : (
            <PlayCircleFilledWhiteRounded />
          )}
        </>
      }
    />
  );
};

export default PlayButton;
