import { Slider, SliderProps, Stack, SvgIconProps } from '@mui/material';
import {
  VolumeUpOutlined,
  VolumeOffOutlined,
  VolumeDownOutlined,
  VolumeMuteOutlined,
} from '@mui/icons-material';
import { styles } from './styles';
import { VolumeLevels } from '@/enums';

const VOLUME_CHANGE_STEP = 0.01;

interface IVolumeControl {
  value: number;
  onChange: (value: number) => void;
}

const VolumeControl = ({ onChange, value }: IVolumeControl) => {
  const handleSliderChange: SliderProps['onChange'] = (_, value) => {
    if (typeof value === 'number') {
      onChange(value);
    }
  };

  const volumeIconProps: SvgIconProps = {
    sx: styles.iconButton,
    fontSize: 'small',
  };

  return (
    <Stack sx={styles.volumeControlWrapper}>
      {value === VolumeLevels.None && (
        <VolumeOffOutlined {...volumeIconProps} />
      )}
      {value > VolumeLevels.None && value < VolumeLevels.Low && (
        <VolumeMuteOutlined {...volumeIconProps} />
      )}
      {value >= VolumeLevels.Low && value < VolumeLevels.Medium && (
        <VolumeDownOutlined {...volumeIconProps} />
      )}
      {value >= VolumeLevels.Medium && (
        <VolumeUpOutlined {...volumeIconProps} />
      )}
      <Slider
        size="small"
        value={value}
        min={VolumeLevels.None}
        max={VolumeLevels.High}
        step={VOLUME_CHANGE_STEP}
        onChange={handleSliderChange}
      />
    </Stack>
  );
};

export default VolumeControl;
