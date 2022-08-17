import {
  ActionIcon,
  Autocomplete,
  Box,
  FocusTrap,
  Modal,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronsDown, PlaylistX, Search } from 'tabler-icons-react';
import {
  getCocktails,
  getProcessedCocktailNames,
  getProcessedIngredientNames,
  searchCocktails,
} from '../api/api';
import { ResCocktail } from '../lib/res.types';
import { SearchItem } from '../lib/types';
import CocktailView from './shared/cocktailView';
import SearchCollapse from './shared/searchCollapse';

interface Props {
  scrollToSearchBar: () => void;
}
export default function SearchBar({ scrollToSearchBar }: Props) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  const [item, setItem] = useState<SearchItem | undefined>();
  const [value, setValue] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [searchCollapseIsOpened, setSearchCollapseIsOpened] = useState(false);
  const [cocktailData, setCocktailData] = useState<ResCocktail>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [active, handlers] = useDisclosure(false);

  const cocktailsName = useQuery(['cocktailName'], getProcessedCocktailNames);

  const ingredientsName = useQuery(
    ['ingredientsName'],
    getProcessedIngredientNames
  );

  const data = [
    ...(cocktailsName.data || []),
    ...(ingredientsName.data?.flat() || []),
  ];

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
              // dropdownComponent={ScrollArea}
              dropdownPosition="bottom"
              maxDropdownHeight="45vh"
              limit={data.length || 1}
              value={value}
              onChange={(value) => setValue(value)}
              data={data || [{ value: 'loading...' }]}
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
                    disabled={!value}
                  >
                    <PlaylistX strokeWidth={1} />
                  </ActionIcon>
                  {searchMutate.data && !searchCollapseIsOpened && (
                    <ActionIcon onClick={() => setSearchCollapseIsOpened(true)}>
                      <ChevronsDown strokeWidth={1} />
                    </ActionIcon>
                  )}
                </>
              }
              onItemSubmit={(item: SearchItem) => {
                setItem(item);
                findItem(item);
              }}
              onFocus={() => {
                if (isMobile) scrollToSearchBar();
                setSearchCollapseIsOpened(false);
                handlers.close();
              }}
              style={{ width: '100%' }}
              styles={{
                dropdown: {
                  overflow: 'hidden',
                },
              }}
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
        <Modal
          centered
          opened={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          title={cocktailData?.cocktail_name}
        >
          {cocktailData && <CocktailView cocktail={cocktailData} />}
        </Modal>
      </Stack>
    </>
  );
}
