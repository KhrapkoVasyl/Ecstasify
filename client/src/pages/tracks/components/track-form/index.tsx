import { Autocomplete, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Modal from '@/components/modal';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react-lite';
import { IEntityFormProps } from '@/types/entity-form';
import { FormMode } from '@/enums/form-mode';
import { useEffect } from 'react';
import { Track } from '@/models/track';
import ImageUpload from '@/components/image-upload';

const TrackForm = ({ open, onClose }: IEntityFormProps) => {
  const {
    tracksStore: {
      createTrack,
      createTrackLoading,
      resetCurrentTrack,
      updateTrack,
      currentTrack,
      getAllGenres,
      genres,
    },
    authorsStore: { authors, getAllAuthors },
  } = useStores();

  const formMode = currentTrack ? FormMode.Edit : FormMode.Create;

  const defaultValues =
    formMode === FormMode.Edit
      ? {
          name: currentTrack?.name,
          genreId: currentTrack?.genre.id,
          authorId: currentTrack?.authorId,
        }
      : { name: '' };

  const { control, handleSubmit, reset } = useForm<Track>({
    defaultValues,
  });

  const resetForm = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    resetForm();
  }, [open]);

  useEffect(() => {
    getAllAuthors();
    getAllGenres();
  }, []);

  const handleClose = () => {
    resetForm();
    resetCurrentTrack();
    onClose();
  };

  const handleCreateTrack = async (data: Track) => {
    console.log({ data });
    await createTrack({
      name: data.name,
      genre: { id: data.genreId },
      authorId: data.authorId,
    });
    handleClose();
  };

  const handleUpdateTrack = async (data: Track) => {
    if (currentTrack) {
      await updateTrack(currentTrack?.id, {
        name: data.name,
        genre: { id: data.genreId },
        authorId: data.authorId,
      });
      handleClose();
    }
  };

  const submitHandler =
    formMode === FormMode.Create ? handleCreateTrack : handleUpdateTrack;

  return (
    <Modal
      title={`${formMode === FormMode.Create ? 'Add' : 'Edit'} Track`}
      description="Please fill all of the fields."
      okProps={{
        text: formMode === FormMode.Create ? 'Create' : 'Save',
        onClick: handleSubmit(submitHandler),
        loading: createTrackLoading,
      }}
      cancelProps={{ onClick: handleClose }}
      open={open}
      onClose={handleClose}
    >
      <Stack spacing={3}>
        <Controller
          name="coverImg"
          control={control}
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              placeholder="Name"
              label="Name"
              fullWidth
            />
          )}
        />
        <Controller
          name="authorId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={authors.map((item) => item.id)}
              getOptionLabel={(option) => {
                return (
                  authors.find((author) => author.id === option)?.name ?? ''
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Author"
                  placeholder="Choose an author"
                  variant="outlined"
                />
              )}
              onChange={(_, data) => {
                field.onChange(data);
              }}
            />
          )}
        />
        <Controller
          name="genreId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={genres.map((item) => item.id)}
              getOptionLabel={(option) => {
                return genres.find((genre) => genre.id === option)?.name ?? '';
              }}
              getOptionKey={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Genre"
                  placeholder="Choose a genre"
                  variant="outlined"
                />
              )}
              onChange={(_, data) => {
                field.onChange(data);
              }}
            />
          )}
        />
      </Stack>
    </Modal>
  );
};

export default observer(TrackForm);
