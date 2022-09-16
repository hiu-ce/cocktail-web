import {
  ActionIcon,
  Autocomplete,
  Box,
  FocusTrap,
  Group,
  MantineColor,
  SelectItemProps,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { forwardRef, ReactNode, useState } from 'react';
import {
  Assembly,
  Atom2,
  ChartBubble,
  ChevronsDown,
  DropletFilled2,
  GlassFull,
  PlaylistX,
  Search,
} from 'tabler-icons-react';
import {
  getCocktails,
  getProcessedCocktailNames,
  getProcessedIngredientNames,
  searchCocktails,
} from '../api/api';
import { ResCocktail } from '../lib/res.types';
import { SearchItem } from '../lib/types';
import CocktailViewModal from './shared/modal/cocktailViewModal';
import SearchCollapse from './shared/searchCollapse';
interface ItemProps extends SelectItemProps {
  color: MantineColor;
  // description: string;
  icon: ReactNode;
}

// eslint-disable-next-line react/display-name
const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, icon, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        {icon}
        <div>
          <Text>{value}</Text>
        </div>
      </Group>
    </div>
  )
);

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

  const icon = {
    cocktail: <GlassFull strokeWidth={0.5} />,
    base: <DropletFilled2 strokeWidth={0.5} />,
    sub: <ChartBubble strokeWidth={0.5} />,
    juice: <Atom2 strokeWidth={0.5} />,
    other: <Assembly strokeWidth={0.5} />,
  };

  const data = [
    ...(cocktailsName.data?.map((cocktail) => ({
      ...cocktail,
      icon: icon.cocktail,
    })) || []),
    ...(ingredientsName.data
      ?.flat()
      .map((ingr) => ({ ...ingr, icon: icon[ingr.groupkey] })) || []),
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
              itemComponent={AutoCompleteItem}
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
        <CocktailViewModal
          cocktail={cocktailData}
          state={[isModalOpened, setIsModalOpened]}
        />
      </Stack>
    </>
  );
}
