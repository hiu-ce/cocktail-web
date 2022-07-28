import {
  ActionIcon,
  Autocomplete,
  Box,
  FocusTrap,
  Modal,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronsDown, PlaylistX, Search } from 'tabler-icons-react';
import { getCocktails, searchCocktails } from '../api/api';
import { ResCocktail } from '../lib/res.types';
import { SearchItem, SearchItems } from '../lib/types';
import CocktailView from './shared/cocktailView';
import SearchCollapse from './shared/searchCollapse';

interface Props {
  searchItem: SearchItems;
}
export default function SearchBar({ searchItem }: Props) {
  const [item, setItem] = useState<SearchItem | undefined>();
  const [value, setValue] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [searchCollapseIsOpened, setSearchCollapseIsOpened] = useState(false);
  const [cocktailData, setCocktailData] = useState<ResCocktail>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [active, handlers] = useDisclosure(false);

  const searchMutate = useMutation(searchCocktails, {
    onSuccess: () => {
      setSearchCollapseIsOpened(true);
    },
  });

  const cocktailMutate = useMutation(getCocktails, {
    onSuccess: (data) => {
      setCocktailData(data);
      setIsModalOpened(true);
    },
  });

  function findItem(searchItem: SearchItem) {
    if (searchItem?.groupkey === 'cocktail') {
      onClick(searchItem.value);
    } else if (searchItem?.groupkey) {
      setSearchedText(searchItem.value);
      searchMutate.mutate({
        [searchItem.groupkey]: searchItem.value,
      });
    }
  }

  function onClick(cocktail_name: string) {
    cocktailMutate.mutate(cocktail_name);
  }

  return (
    <>
      <Stack style={{ width: '100%' }}>
        <Box style={{ display: 'flex', width: '100%' }}>
          <FocusTrap active={active}>
            <Autocomplete
              icon={
                <>
                  <ActionIcon
                    loading={searchMutate.isLoading || cocktailMutate.isLoading}
                    onClick={() => item && findItem(item)}
                  >
                    <Search size={16} />
                  </ActionIcon>
                </>
              }
              transition="scale-y"
              transitionDuration={300}
              transitionTimingFunction="ease"
              dropdownComponent="div"
              maxDropdownHeight="45vh"
              limit={searchItem.length}
              value={value}
              onChange={(value) => setValue(value)}
              data={searchItem}
              label="칵테일 검색"
              placeholder="칵테일이나 재료를 검색해보세요"
              radius="xs"
              rightSectionWidth={
                searchMutate.data && !searchCollapseIsOpened ? 88 : 60
              }
              rightSection={
                <>
                  <ActionIcon
                    size="sm"
                    mr={10}
                    onClick={() => {
                      setValue('');
                      handlers.toggle();
                    }}
                  >
                    <PlaylistX />
                  </ActionIcon>
                  {searchMutate.data && !searchCollapseIsOpened && (
                    <ActionIcon onClick={() => setSearchCollapseIsOpened(true)}>
                      <ChevronsDown />
                    </ActionIcon>
                  )}
                </>
              }
              onItemSubmit={(item: any) => {
                setItem(item);
                findItem(item);
              }}
              onFocus={() => {
                setSearchCollapseIsOpened(false);
                handlers.close();
              }}
              style={{ width: '100%' }}
            />
          </FocusTrap>
        </Box>
        <Box style={{ display: 'flex', width: '100%' }}>
          <SearchCollapse
            cocktailsName={searchMutate.data}
            searchedText={searchedText}
            collapseOpenState={[
              searchCollapseIsOpened,
              setSearchCollapseIsOpened,
            ]}
          />
        </Box>
        {cocktailData && (
          <Modal
            centered
            opened={isModalOpened}
            onClose={() => setIsModalOpened(false)}
            title={cocktailData.cocktail_name}
          >
            <CocktailView cocktail={cocktailData} />
          </Modal>
        )}
      </Stack>
    </>
  );
}
