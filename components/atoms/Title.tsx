import { Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface Props {
  children: React.ReactNode;
}

export default function CocktailTitle({ children }: Props) {
  const isBreakPoint = useMediaQuery('(max-width: 400px)');

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
        size={isBreakPoint ? 25 : 30}
        transform="uppercase"
      >
        {children}
      </Text>
    </>
  );
}
