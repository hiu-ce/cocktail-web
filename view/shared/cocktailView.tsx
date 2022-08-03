import {
  Badge,
  Box,
  Card,
  Divider,
  Image,
  Paper,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { GlassFull, Scale } from 'tabler-icons-react';
import { mlOzCalc } from '../../lib/utils';

interface Props {
  cocktail: any;
}

interface AmountProps {
  amount?: number;
  subText?: string;
  children?: JSX.Element;
}
function AmountBadge({ amount, children, subText }: AmountProps) {
  const theme = useMantineTheme();

  function amountColor() {
    return !amount
      ? 'violet'
      : amount <= 30
      ? 'cyan'
      : amount <= 60
      ? 'blue'
      : 'indigo';
  }

  return (
    <Badge
      color={amountColor()}
      styles={(theme) => ({
        inner: {
          fontSize: 12,
          textTransform: 'none',
          color: theme.colors.gray[6],
          display: 'flex',
        },
      })}
      variant="dot"
      size="md"
      mx="xs"
    >
      <Text mr={subText && 4} color={theme.colors.gray[3]} weight={800}>
        {children}
      </Text>
      {subText}
    </Badge>
  );
}

function CocktailView({ cocktail }: Props) {
  const theme = useMantineTheme();
  const color = {
    default: {
      base: theme.colors.cyan[2],
      sub: theme.colors.teal[2],
      juice: theme.colors.green[2],
      // other: theme.colors.lime[2],
      other: theme.fn.rgba(theme.colors.lime[1], 0.9),
    },
    bg: {
      base: theme.fn.rgba(theme.colors.cyan[8], 0.28),
      sub: theme.fn.rgba(theme.colors.teal[8], 0.28),
      juice: theme.fn.rgba(theme.colors.green[9], 0.28),
      other: theme.fn.rgba(theme.colors.lime[9], 0.28),
    },
  };
  const ingrKeys = Object.keys(cocktail).filter(
    (key): key is 'base' | 'sub' | 'juice' =>
      key == 'base' || key == 'sub' || key == 'juice'
  );
  const [activeTab, setActiveTab] = useState<string | null>('ml');

  const ingrNameBadge = useCallback(
    (key: 'base' | 'sub' | 'juice' | 'other', ingredient: string) => (
      <Badge
        styles={{
          root: {
            color: color.default[key],
            backgroundColor: color.bg[key],
          },
        }}
        size="lg"
        radius="md"
        p="xs"
      >
        {ingredient}
      </Badge>
    ),
    []
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
      <Text weight={850} size={20} my={15}>
        {cocktail.cocktail_name}
      </Text>
      <Tabs
        styles={{
          tabsList: {
            // height: 25,
          },
          tab: {
            paddingRight: 12,
            paddingLeft: 12,
            paddingTop: 6,
            paddingBottom: 6,
          },
        }}
        radius="xs"
        value={activeTab}
        onTabChange={setActiveTab}
        mb="md"
      >
        <Tabs.List>
          <Tabs.Tab value="ml" icon={<GlassFull strokeWidth={1.5} size={16} />}>
            ML
          </Tabs.Tab>
          <Tabs.Tab value="oz" icon={<Scale strokeWidth={1.5} size={16} />}>
            OZ
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {ingrKeys.map(
        (key) =>
          cocktail[key] && //////fix!!!!!!
          Object.keys(cocktail[key]).map((ingredient) => (
            <Box mb="xs" key={`cocktail-view--${String(key)}--${ingredient}`}>
              {ingrNameBadge(key, ingredient)}
              <AmountBadge
                amount={cocktail[key][ingredient]}
                subText={activeTab ? activeTab : 'ml'}
              >
                {activeTab === 'ml'
                  ? cocktail[key][ingredient]
                  : mlOzCalc(cocktail[key][ingredient])}
              </AmountBadge>
            </Box>
          ))
      )}

      {cocktail.other &&
        Object.keys(cocktail.other).map(
          (other) =>
            cocktail.other && (
              <Box mb="xs" key={`cocktail-viwe--other--${other}`}>
                {ingrNameBadge('other', other)}
                <AmountBadge>{cocktail.other[other]}</AmountBadge>
              </Box>
            )
        )}
      <Divider mt="lg" mb="sm" label="믹싱 방법" labelPosition="center" />
      <Paper p="md" style={{ backgroundColor: theme.colors.dark[6] }}>
        <Text>{cocktail.recipe}</Text>
      </Paper>

      {/* {JSON.stringify(cocktail)} */}
    </Card>
  );
}

export default CocktailView;
