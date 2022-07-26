import { ResCocktailsName } from '../../lib/res.types';

interface Props {
  cocktailsName: ResCocktailsName;
}
function SearchCollapse({ cocktailsName }: Props) {
  console.log(cocktailsName);

  return (
    <div>
      {cocktailsName.map((item, index) => (
        <div key={`searched--${item}--${index}`}>{item.cocktail_name}</div>
      ))}
    </div>
  );
}

export default SearchCollapse;
