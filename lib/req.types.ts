import type { IngredientType } from './types';

export type ReqIngredient = {
  [key: string]: number | string;
};

export type ReqIngredients = Partial<Record<IngredientType, ReqIngredient>>;

export interface ReqCocktail extends ReqIngredients {
  cocktail_name: string;
  recipe: string;
}
