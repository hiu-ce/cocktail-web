import { Card, Image, Text } from '@mantine/core';
import { ObjectTyped } from 'object-typed';
import { ResCocktail } from '../../lib/res.types';

interface Props {
  cocktail: ResCocktail;
}
function CocktailView({ cocktail }: Props) {
  const ingrKeys = ObjectTyped.keys(cocktail).filter(
    (key) => key !== 'cocktail_name' && key !== 'recipe' && key !== 'other'
  );

  return (
    <Card shadow="md" p="lg" radius="md">
      <Card.Section>
        <Image
          src="https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?quality=82&strip=1"
          height={250}
          alt="Norway"
        />
      </Card.Section>
      <Text weight={600} size={20} my={15}>
        {cocktail.cocktail_name}
      </Text>
      {ingrKeys.map(
        (key) =>
          cocktail[key] && //////fix!!!!!!
          Object.keys(cocktail[key]).map((ingredient) => (
            <Text key={`cocktail-view--${String(key)}--${ingredient}`}>
              {ingredient} : {cocktail[key][ingredient]} ml
            </Text>
          ))
      )}

      {cocktail.other &&
        Object.keys(cocktail.other).map(
          (other) =>
            cocktail.other && (
              <Text key={`cocktail-viwe--other--${other}`}>
                {other} : {cocktail.other[other]}
              </Text>
            )
        )}

      <Text>믹싱 방법 : {cocktail.recipe}</Text>

      {/* {JSON.stringify(cocktail)} */}
    </Card>
  );
}

export default CocktailView;
