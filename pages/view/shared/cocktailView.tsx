import { Card, Image, Text } from '@mantine/core';
import { ObjectTyped } from 'object-typed';
import { ResCocktail } from '../../lib/res.types';

interface Props {
  cocktail: any;
}
function CocktailView({ cocktail }: Props) {
  console.log(
    Object.keys(cocktail).filter(
      (key) => key !== 'cocktail_name' && key !== 'recipe'
    )
  );

  return (
    <Card shadow="sm" p="lg" radius="md">
      <Card.Section>
        <Image
          src="https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?quality=82&strip=1"
          height={250}
          alt="Norway"
        />
      </Card.Section>
      <Text weight={600} size={20}>
        {cocktail.cocktail_name}
      </Text>
      {ObjectTyped.keys(cocktail)
        .filter((key) => key !== 'cocktail_name' && key !== 'recipe')
        .map(
          (key) =>
            cocktail[key] && //////fix!!!!!!
            Object.keys(cocktail[key]).map((ingredient) => (
              <Text key={`cocktail-view--${String(key)}--${ingredient}`}>
                {ingredient}
              </Text>
            ))
        )}

      {/* {JSON.stringify(cocktail)} */}
    </Card>
  );
}

export default CocktailView;
