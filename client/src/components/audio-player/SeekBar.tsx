import { Slider, SliderProps } from '@mui/material';
import { styles } from './styles';

interface ISeekBarProps {
  playbackDuration: number;
  playbackTime: number;
  disabled?: boolean;
  onSeekChange: (seek: number) => void;
  onSeekEnd: (seek: number) => void;
}

const SeekBar = ({
  playbackDuration,
  playbackTime,
  disabled = false,
  onSeekChange,
  onSeekEnd,
}: ISeekBarProps) => {
  const handleSliderChange: SliderProps['onChange'] = (_, value) => {
    if (typeof value === 'number') {
      onSeekChange(value);
    }
  };

  const handleSliderChangeCommited: SliderProps['onChangeCommitted'] = (
    _,
    value
  ) => {
    if (typeof value === 'number') {
      onSeekEnd(value);
    }
  };

  return (
    <Slider
      size="small"
      sx={styles.slider}
      disabled={disabled}
      value={playbackTime}
      max={playbackDuration}
      onChange={handleSliderChange}
      onChangeCommitted={handleSliderChangeCommited}
    />
  );
};

export default SeekBar;
