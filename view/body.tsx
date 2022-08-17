import {
  Box,
  Collapse,
  Divider,
  Grid,
  Loader,
  Paper,
  Skeleton,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ObjectTyped } from 'object-typed';
import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, X } from 'tabler-icons-react';
import {
  getProcessedIngredientNames,
  getRandomCocktail,
  searchCocktails,
} from '../api/api';
import { ReqSearch } from '../lib/req.types';
import { ResCocktailsName } from '../lib/res.types';
import { SelectSearchItems } from '../lib/types';
import CocktailView from './shared/cocktailView';
import IngredientSelector from './shared/ingredientSelector';
import SearchCollapse from './shared/searchCollapse';

type ResSearchError = AxiosError<{
  data: ResCocktailsName;
  error_message: string;
  error_code: number;
}>;

interface Props {
  scrollToBottom: () => void;
}

function Body({ scrollToBottom }: Props) {
  const theme = useMantineTheme();
  const isMobile = !useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);

  const [selectIngrState, setSelectIngrState] = useState<SelectSearchItems>({
    base: [],
    sub: [],
    juice: [],
    other: [],
  });
  const [isOpened, setIsOpened] = useState(false);
  const [isDividerOpened, setIsDividerOpened] = useState(false);

  const ingredientsName = useQuery(
    ['ingredientsName'],
    getProcessedIngredientNames
  );

  const randomCocktail = useQuery(['randomCocktail'], getRandomCocktail);

  const ingredientsMutate = useMutation(searchCocktails, {
    onSuccess: () => {
      setIsOpened(true);
      setIsDividerOpened(true);
    },
    onError: (error: ResSearchError) => {
      setIsOpened(true);
      setIsDividerOpened(true);
      if (error.response?.data) {
        showNotification({
          id: 'search-ingredients',
          color: 'bright-pink',
          title: 'No result for search',
          message: error.response.data.error_message,
          icon: <X />,
          autoClose: 1500,
        });
      }
    },
  });

  const data =
    ingredientsMutate.data || ingredientsMutate.error?.response?.data.data;

  const loadingSkeleton = useCallback(
    () => (
      <Paper shadow="md" p="md" pt={2} my="md">
        <Divider
          mt="xs"
          mb="sm"
          label={<Loader size="xs" />}
          labelPosition="center"
        />
        <Skeleton height={105} />
      </Paper>
    ),
    []
  );

  useEffect(() => {
    const param: Partial<ReqSearch> = {};
    ObjectTyped.entries(selectIngrState).forEach(
      ([key, value]) => !!value.length && (param[key] = `${value}`)
    );
    if (Object.keys(param).length) {
      ingredientsMutate.mutate(param);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIngrState]);

  useEffect(() => {
    if (data) {
      setTimeout(() => scrollToBottom(), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Grid>
      <Grid.Col xs={6}>
        <Text
          className="my-text"
          style={{ fontFamily: 'Fira Sans' }}
          weight={700}
          size={30}
        >
          Recommend Today Drink
        </Text>
        <CocktailView cocktail={randomCocktail.data} isMobileMain={isMobile} />
      </Grid.Col>
      <Grid.Col xs={6}>
        {ingredientsName.isLoading ? (
          <div>{Array(3).fill(loadingSkeleton())}</div>
        ) : (
          ingredientsName.data &&
          ingredientsName.data
            .filter((data) => data?.[0].groupkey !== 'other')
            .map((data, index: number) => (
              <IngredientSelector
                ingredients={data}
                state={[selectIngrState, setSelectIngrState]}
                ingrName={{ name: data[0].group, key: data[0].groupkey }}
                key={`ingredient--${data[0].group}--${index}`}
              />
            ))
        )}
        <Box my="md">
          <Collapse
            in={!isOpened && (data || ingredientsMutate.isLoading)}
            transitionDuration={isDividerOpened ? 600 : 300}
            style={{ height: 25 }}
          >
            <Divider
              style={{ height: 23 }}
              py={1}
              label={
                <>
                  {ingredientsMutate.isLoading ? (
                    <Loader size={12} />
                  ) : (
                    <ChevronDown size={12} />
                  )}
                  <Box ml="xs" my={0}>
                    <Text my={0}> Search results</Text>
                  </Box>
                </>
              }
              labelPosition="center"
              labelProps={{
                style: {
                  cursor: 'pointer',
                  marginY: 0,
                },
                onClick: () => {
                  setIsOpened(true);
                },
              }}
            />
          </Collapse>

          <SearchCollapse
            cocktailsName={data}
            searchedText="선택한 재료들"
            collapseOpenState={[isOpened, setIsOpened]}
          />
        </Box>
      </Grid.Col>
    </Grid>
  );
}

export default Body;
