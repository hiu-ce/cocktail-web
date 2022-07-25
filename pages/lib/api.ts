import axios from 'axios';
import type { ReqCocktail, ReqIngredients } from './req.types';
import type { IngredientType } from './types';

export async function getCocktails(name: string) {
  const response = await axios.get(
    `http://35.84.255.61:8000/cocktail/${encodeURIComponent(name)}`
  );
  return response.data;
}

export async function createCocktail(body: ReqCocktail) {
  const response = await axios.post('http://35.84.255.61:8000/cocktail', {
    ...body,
  });
  return response.data;
}

export async function deleteCocktails() {
  const response = await axios.delete(`http://35.84.255.61:8000/cocktail`);
  return response.data;
}

export async function getCocktailNames() {
  const response = await axios.get('http://35.84.255.61:8000/recipes');
  return response.data;
}

export async function getIngredientNames(type: IngredientType | null = null) {
  const response = await axios.get('http://35.84.255.61:8000/ingredients', {
    params: {
      type,
    },
  });
  return response.data;
}

export async function searchCocktails({
  base,
  sub,
  juice,
  other,
}: ReqIngredients) {
  const response = await axios.get('http://35.84.255.61:8000/search', {
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
