import { Button, Center, Grid, Group, Modal } from '@mantine/core';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { getCocktailNames, getCocktails, getIngredientNames } from '../api/api';
import { ingredientType } from '../lib/constant';
import {
  ResCocktail,
  ResCocktailsName,
  ResIngredientsName,
} from '../lib/res.types';
import { IngredientsGroup, IngredientType } from '../lib/types';
import AddRecipe from '../view/addRecipe';
import Ingredient from '../view/ingredient';
import SearchBar from '../view/searchBar';
import CocktailTitle from '../view/title';
import TodayDrink from '../view/todayDrink';

interface Props {
  searchItem: {
    value: string;
    group: string;
    groupkey: string;
  }[];
  ingredientsName: {
    value: string;
    group: string;
    groupkey: IngredientType;
  }[][];
  randomCocktail: ResCocktail;
  ingredientsGroup: Partial<Record<IngredientType, string[]>>[];
}

const Home: NextPage = ({
  searchItem,
  ingredientsName,
  randomCocktail,
  ingredientsGroup,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  // call this method whenever you want to refresh server-side props
  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Center>
      <Grid style={{ width: '80vw' }}>
        <Grid.Col xs={1}></Grid.Col>
        <Grid.Col xs={10}>
          <Center>
            <CocktailTitle />
          </Center>
        </Grid.Col>
        <Grid.Col xs={1}>
          <Group position="center">
            <Button onClick={() => setOpened(true)}>Open Modal</Button>
          </Group>
        </Grid.Col>

        <Grid.Col xs={12} style={{ width: '100%' }}>
          <Center style={{ width: '100%' }}>
            <SearchBar searchItem={searchItem} />
          </Center>
        </Grid.Col>
        <Grid.Col xs={6}>
          <TodayDrink cocktail={randomCocktail} />
        </Grid.Col>
        <Grid.Col xs={6}>
          <Ingredient ingredientsName={ingredientsName} />
          <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Add cocktail recipe"
            size="lg"
            style={{ overflow: 'hidden' }}
          >
            <AddRecipe
              setOpened={setOpened}
              ingredientsGroup={ingredientsGroup}
            />
          </Modal>
        </Grid.Col>
      </Grid>
    </Center>
  );
};

const date = () => {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const getDate = [year, month, day].join('');
  return `${getDate}`;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ingreGroupName: string[] = ['Base', 'Liquor', 'Juice', 'Other'];
  const cocktailsData: ResCocktailsName = await getCocktailNames();
  const cocktailsName = cocktailsData.map((d) => ({
    value: d.cocktail_name,
    group: 'Cocktail',
    groupkey: 'cocktail',
  }));
  const randomCocktailId = (parseInt(date()) * 806) % cocktailsData.length;
  const randomCocktail = await getCocktails(
    cocktailsData[randomCocktailId].cocktail_name
  );

  const ingredientsData: ResIngredientsName = await getIngredientNames();

  console.log(
    (
      Object.keys(ingredientsData) as unknown as Array<
        keyof typeof ingredientsData
      >
    )[0]
  );

  const ingredientsGroup: IngredientsGroup[] = Object.values(
    ingredientsData
  ).map((data, index) => ({
    [Object.keys(ingredientsData)[index]]: data.map((d) => Object.values(d)[0]),
  }));

  console.log(ingredientsGroup);

  const ingredientsName = Object.values(ingredientsData).map((data, index) => {
    return data.map((d) => ({
      value: d.drink_name ? d.drink_name : d.name,
      key: `ingredient--${d.drink_name ? d.drink_name : d.name}--${
        ingreGroupName[index]
      }`,
      group: ingreGroupName[index],
      groupkey: ingredientType[index],
    }));
  });
  const searchItem = [...cocktailsName, ...ingredientsName.flat()];

  return {
    props: {
      searchItem,
      ingredientsName,
      randomCocktail,
      ingredientsGroup,
    }, // will be passed to the page component as props
  };
};

export default Home;
