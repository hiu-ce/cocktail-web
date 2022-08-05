import { ResCocktailsName, ResIngredientsName } from './../lib/res.types';
import axios from 'axios';
import type { ReqCocktail, ReqSearch } from '../lib/req.types';
import type { IngredientType } from '../lib/types';
import { ingredientType, ingreGroupName } from '../lib/constant';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getCocktails(name: string) {
  const response = await axios.get(`/cocktail/${encodeURIComponent(name)}`);

  return response.data;
}

export async function createCocktail(body: ReqCocktail) {
  const response = await axios.post('/cocktail', {
    ...body,
  });
  return response.data;
}

export async function deleteCocktails() {
  const response = await axios.delete(`/cocktail`);
  return response.data;
}

export async function getCocktailNames() {
  const response = await axios.get<ResCocktailsName>('/recipes');
  return response.data;
}

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

export async function getRandomCocktail() {
  const cocktailsData = await getCocktailNames();
  const randomCocktailId = (parseInt(date()) * 806) % cocktailsData.length;
  const data = await getCocktails(
    cocktailsData[randomCocktailId].cocktail_name
  );

  return data;
}

export async function getProcessedCocktailNames() {
  const data = await getCocktailNames();
  return data.map((d) => ({
    value: d.cocktail_name,
    group: 'Cocktail',
    groupkey: 'cocktail',
  }));
}

export async function getIngredientNames(type: IngredientType | null = null) {
  const response = await axios.get<ResIngredientsName>('/ingredients', {
    params: {
      type,
    },
  });
  return response.data;
}

export async function getIngredientsGroup() {
  const res = await getIngredientNames();
  return Object.values(res).map((data, index) => ({
    [Object.keys(res)[index]]: data.map((d) => Object.values(d)[0]),
  }));
}

export async function getProcessedIngredientNames() {
  const data = await getIngredientNames();
  return Object.values(data).map((data, index) => {
    return data.map((d) => ({
      value: d.drink_name ? d.drink_name : d.name,
      key: `ingredient--${d.drink_name ? d.drink_name : d.name}--${
        ingreGroupName[index]
      }`,
      group: ingreGroupName[index],
      groupkey: ingredientType[index],
    }));
  });
}

export async function searchCocktails({
  base,
  sub,
  juice,
  other,
}: Partial<ReqSearch>) {
  const response = await axios.get('/search', {
    params: {
      base,
      sub,
      juice,
      other,
    },
  });
  return response.data;
}

export async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}
