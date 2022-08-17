import { Text, useMantineTheme } from '@mantine/core';

export default function CocktailTitle() {
  const theme = useMantineTheme();
  return (
    <>
      <Text
        m="xl"
        mx="xs"
        align="center"
        variant="gradient"
        gradient={{
          from: theme.colors.teal[3],
          to: theme.colors.cyan[3],
          deg: 0,
        }}
        style={{ fontFamily: 'LeferiBase' }}
        weight={550}
        size={30}
        transform="uppercase"
      >
        Cocktail - Recipes
      </Text>
    </>
  );
}
