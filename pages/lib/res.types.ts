//Cocktails 레시피
//재료

import type { IngredientType } from './types';

/*{
		"다크 럼" : 30,
		"골드 럼" : 30
	} */
export interface ResIngredient {
  [key: string]: string | number;
}
/* 	 
  "base" : {
		"다크 럼" : 30,
		"골드 럼" : 30
	},
  "sub" : {...},
  "juice" : {...},
  "other" : {...}
*/
export type ResIngredients = Record<IngredientType, ResIngredient>;

// {
//   [Key in IngredientType]?: ResIngredient;
// };
export interface ResCocktail extends Partial<ResIngredient> {
  cocktail_name: string;
  recipe: string;
}
export type ResCocktails = ResCocktail[];

//칵테일 이름 리스트

export interface ResCocktailName {
  cocktail_name: string;
}
export type ResCocktailsName = ResCocktailName[];

//재료 리스트
export interface ResIngredientName {
  [key: string]: string;
}
export type ResIngredientsName = Record<IngredientType, ResIngredientName[]>;

export type ResSpecIngredientsName = ResIngredientName[]; //type 특정시
