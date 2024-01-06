import { useStore } from '@/hooks';
import { Delete, Image } from '@mui/icons-material';
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface IImageUploadProps {
  value?: File;
  onChange: (value: File) => void;
}

const ImageUpload = ({ value, onChange }: IImageUploadProps) => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const { uploadFile, uploadFileLoading } = useStore('filesStore');

  console.log({ value });

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? [];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const src = await uploadFile(formData);

      if (src) {
        setPreviewImg(src);
        onChange(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewImg(null);
  };

  return (
    <div>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginBottom: 1 }}
      >
        Upload image
      </Typography>
      {uploadFileLoading && <LinearProgress sx={{ marginBottom: '20px' }} />}
      {!previewImg ? (
        <Box
          sx={{
            border: (theme) => `2px dashed ${theme.palette.primary.main}`,
            padding: '25px',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
            position: 'relative',
          }}
        >
          <Box
            component="input"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={handleUploadImage}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
          <Box
            sx={{
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: (theme) => theme.palette.primary.light,
            }}
          >
            <Image color="primary" />
          </Box>
          <Stack alignItems="center">
            <Typography sx={{ color: (theme) => theme.palette.grey[400] }}>
              Drop a file here or{' '}
              <Box
                sx={{
                  display: 'inline',
                  margin: 0,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                browse
              </Box>
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ margin: 0 }}
            >
              Supported format: .jpg, .png, .gif
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            height: '70px',
            padding: '7px',
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <img
            height="100%"
            width={56}
            src={previewImg}
            style={{ objectFit: 'cover' }}
          />
          <IconButton
            style={{ alignSelf: 'center' }}
            onClick={handleRemoveImage}
          >
            <Delete />
          </IconButton>
        </Box>
      )}
    </div>
  );
};

export default observer(ImageUpload);
