import { CheckRounded } from '@mui/icons-material';
import { IconButton, Popover, PopoverProps, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { styles } from './styles';

interface ICreatePlaylistPopoverProps {
  PopoverProps: PopoverProps;
}

const CreatePlaylistPopover = ({
  PopoverProps,
}: ICreatePlaylistPopoverProps) => {
  return (
    <Popover
      PaperProps={{
        sx: styles.wrapper,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      {...PopoverProps}
    >
      <Stack direction="row" alignItems="center" gap="5px">
        <TextField
          size="small"
          color="primary"
          variant="standard"
          sx={styles.nameInput}
          placeholder="Playlist Name"
        />
        <IconButton color="primary" size="small">
          <CheckRounded fontSize="small" />
          {/* <CircularProgress size="17px" /> */}
        </IconButton>
      </Stack>
    </Popover>
  );
};

export default CreatePlaylistPopover;
