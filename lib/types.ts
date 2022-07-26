export type IngredientType = 'base' | 'sub' | 'juice' | 'other';

export type IngredientsGroup = Partial<Record<IngredientType, string[]>>;
/*{base : ['골드 럼', ...]}
  {sub : ['오렌지 큐라소', ...]}
  ...
*/

export type SearchItem = {
  value: string;
  group: string;
  groupkey: string;
};

export type SearchItems = SearchItem[];

export type IngredientsName = {
  value: string;
  group: string;
  groupkey: IngredientType;
}[][];
