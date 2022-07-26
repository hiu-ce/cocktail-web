import { IngredientsName } from '../../lib/types';
import IngredientSelector from './shared/ingredientSelector';

interface Props {
  ingredientsName: IngredientsName;
}

export default function Ingredient({ ingredientsName }: Props) {
  return (
    <div>
      {ingredientsName.map((data: any, index: number) => (
        <IngredientSelector ingredients={data} key={index} />
      ))}
    </div>
  );
}
