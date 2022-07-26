import { ActionIcon, Autocomplete, Box, Button, Collapse } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { MouseEventHandler, useState } from 'react';
import { PlaylistX, X } from 'tabler-icons-react';
import { searchCocktails } from '../lib/api';
import { SearchItem, SearchItems } from '../lib/types';
import SearchCollapse from './shared/searchCollapse';

interface Props {
  searchItem: SearchItems;
}
export default function SearchBar({ searchItem }: Props) {
  const [value, setValue] = useState<SearchItem | undefined>();
  const [searchCollapseIsOpened, setSearchCollapseIsOpened] = useState(false);
  const search = useMutation(searchCocktails, {
    onSuccess: (data) => {
      setSearchCollapseIsOpened(true);
    },
  });

  return (
    <>
      <Box style={{ display: 'flex', width: '100%' }}>
        <Autocomplete
          dropdownComponent="div"
          maxDropdownHeight="30vh"
          limit={searchItem.length}
          value={value ? value.value : ''}
          onChange={(value) =>
            setValue(searchItem.filter((item) => item.value === value)[0])
          }
          data={searchItem}
          label="칵테일 검색"
          placeholder="칵테일이나 재료를 검색해보세요"
          radius="xs"
          rightSection={
            <ActionIcon
              size="sm"
              color="gray"
              onClick={() => {
                console.log('hi');

                setValue(undefined);
              }}
            >
              <PlaylistX />
            </ActionIcon>
          }
          style={{ width: '100%' }}
        />
        <Button
          loading={search.isLoading}
          onClick={() => {
            // console.log(value);
            if (value?.groupkey === 'cocktail') {
            } else if (value?.groupkey) {
              search.mutate({
                [value.groupkey]: value.value,
              });
            }
          }}
        >
          검색
        </Button>
      </Box>

      <Collapse in={searchCollapseIsOpened}>
        {search.data && <SearchCollapse cocktailsName={search.data} />}
      </Collapse>
    </>
  );
}
