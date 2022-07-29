import { Box, Collapse, Divider, Grid, Loader, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ObjectTyped } from 'object-typed';
import { useEffect, useState } from 'react';
import { ChevronDown, X } from 'tabler-icons-react';
import { searchCocktails } from '../api/api';
import { ReqSearch } from '../lib/req.types';
import { ResCocktail, ResCocktailsName } from '../lib/res.types';
import { IngredientsName, SelectSearchItems } from '../lib/types';
import CocktailView from './shared/cocktailView';
import IngredientSelector from './shared/ingredientSelector';
import SearchCollapse from './shared/searchCollapse';
interface Props {
  cocktail: ResCocktail;
  ingredientsName: IngredientsName;
}

type ResSearchError = AxiosError<{
  data: ResCocktailsName;
  error_message: string;
  error_code: number;
}>;

function Body({ cocktail, ingredientsName }: Props) {
  const [selectIngrState, setSelectIngrState] = useState<SelectSearchItems>({
    base: [],
    sub: [],
    juice: [],
    other: [],
  });
  const [isOpened, setIsOpened] = useState(false);
  const [isDividerOpened, setIsDividerOpened] = useState(false);

  const ingredientsMutate = useMutation(searchCocktails, {
    onSuccess: (data) => {
      console.log(data);
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
          autoClose: 5000,
        });
      }
    },
  });

  const data =
    ingredientsMutate.data || ingredientsMutate.error?.response?.data.data;

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

  return (
    <Grid>
      <Grid.Col xs={6}>
        <Text weight={800} size={30}>
          Recommend Today Drink
        </Text>
        <CocktailView cocktail={cocktail} />
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
                  console.log('click');
                  setIsOpened(true);
                },
              }}
            />
          </Collapse>

          <SearchCollapse
            cocktailsName={data}
            searchedText="Result"
            collapseOpenState={[isOpened, setIsOpened]}
          />
        </Box>
      </Grid.Col>
      <Grid.Col xs={6}>
        {ingredientsName.map((data, index: number) => (
          <IngredientSelector
            ingredients={data}
            state={[selectIngrState, setSelectIngrState]}
            ingrName={{ name: data[0].group, key: data[0].groupkey }}
            key={`ingredient--${data[0].group}--${index}`}
          />
        ))}
      </Grid.Col>
    </Grid>
  );
}

export default Body;
