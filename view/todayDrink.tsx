import { Text } from '@mantine/core';
import { ResCocktail } from '../lib/res.types';
import CocktailView from './shared/cocktailView';

interface Props {
  cocktail: ResCocktail;
}

const TodayDrink = ({ cocktail }: Props) => {
  return (
    <>
      <Text weight={800} size={30}>
        Recommend Today Drink
      </Text>
      <CocktailView cocktail={cocktail} />
    </>
  );
};

export default TodayDrink;
