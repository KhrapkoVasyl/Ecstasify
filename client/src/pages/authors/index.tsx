import { IColumn } from '@/components/data-table/data-table.interface';
import AuthorForm from './components/author-form';
import { useMounted, useStore } from '@/hooks';
import { observer } from 'mobx-react-lite';
import EntityDashboard from '@/components/entity-dashboard';
import { Author } from '@/models/author';
import { Stack, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

const columns: IColumn<Author>[] = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Picture',
    key: 'imageFile',
    dataIndex: 'imageFile',
    render: (item) => (
      <img
        width={50}
        height={50}
        src={`data:${item?.mimetype};base64,${item?.base64}`}
      />
    ),
  },
];

const AuthorsPage = () => {
  const {
    getAllAuthors,
    getAllAuthorsLoading,
    authors,
    resetAuthors,
    deleteAuthor,
    setCurrentAuthor,
  } = useStore('authorsStore');

  const mounted = useMounted();

  const [searchString, setSearchString] = useState('');

  const debouncedGetAllAuthors = useMemo(
    () => (mounted ? debounce(getAllAuthors, 500) : getAllAuthors),
    [mounted]
  );

  useEffect(() => {
    debouncedGetAllAuthors(searchString);

    return () => {
      if ('cancel' in debouncedGetAllAuthors) {
        debouncedGetAllAuthors.cancel();
      }
    };
  }, [searchString]);

  return (
    <Stack>
      <EntityDashboard<Author>
        columns={columns}
        dataSource={authors}
        EntityForm={AuthorForm}
        getAllRecords={getAllAuthors}
        resetRecords={resetAuthors}
        getAllRecordsLoading={getAllAuthorsLoading}
        onDeleteRecord={deleteAuthor}
        onEditRecord={setCurrentAuthor}
        rowKey="id"
        title="Authors"
        description="List of registered authors. You can manage them from here."
        emptyMessage="No authors to show yet."
        extra={
          <TextField
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            variant="standard"
            placeholder="Search author by name"
            sx={{ width: 200 }}
            InputProps={{
              startAdornment: (
                <Search sx={{ color: (theme) => theme.palette.grey[400] }} />
              ),
            }}
          />
        }
      />
    </Stack>
  );
};

export default observer(AuthorsPage);
