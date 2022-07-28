import { Box, Grid, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { ObjectTyped } from 'object-typed';
import { useEffect, useState } from 'react';
import { searchCocktails } from '../api/api';
import { ReqSearch } from '../lib/req.types';
import { ResCocktail } from '../lib/res.types';
import { IngredientsName, SelectSearchItems } from '../lib/types';
import CocktailView from './shared/cocktailView';
import IngredientSelector from './shared/ingredientSelector';
import SearchCollapse from './shared/searchCollapse';
interface Props {
  cocktail: ResCocktail;
  ingredientsName: IngredientsName;
}

function Body({ cocktail, ingredientsName }: Props) {
  const [selectIngrState, setSelectIngrState] = useState<SelectSearchItems>({
    base: [],
    sub: [],
    juice: [],
    other: [],
  });
  const [isOpened, setIsOpened] = useState(false);

  const ingredientsMutate = useMutation(searchCocktails, {
    onSuccess: (data) => {
      console.log(data);
      setIsOpened(true);
    },
  });

  useEffect(() => {
    const param: Partial<ReqSearch> = {};
    ObjectTyped.entries(selectIngrState).forEach(
      ([key, value]) => !!value.length && (param[key] = `${value}`)
    );
    if (Object.keys(param).length) ingredientsMutate.mutate(param);
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
          <SearchCollapse
            cocktailsName={ingredientsMutate.data}
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
