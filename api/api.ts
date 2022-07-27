import axios from 'axios';
import type { ReqCocktail, ReqSearch } from '../lib/req.types';
import type { IngredientType } from '../lib/types';
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
  const response = await axios.get('/recipes');
  return response.data;
}

export async function getIngredientNames(type: IngredientType | null = null) {
  const response = await axios.get('/ingredients', {
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
