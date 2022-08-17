import { Badge, Box, Text, useMantineTheme } from '@mantine/core';
import { mlOzCalc } from '../../lib/utils';

interface AmountProps {
  amount?: number;
  subText?: string | JSX.Element;
  children?: JSX.Element;
}
export function AmountBadge({ amount, children, subText }: AmountProps) {
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
          alignItems: 'center',
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
interface NameBadgeProps {
  ingrKey: 'base' | 'sub' | 'juice' | 'other';
  ingredient: string;
}
function NameBadge({ ingrKey, ingredient }: NameBadgeProps) {
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
  return (
    <Badge
      styles={{
        root: {
          color: color.default[ingrKey],
          backgroundColor: color.bg[ingrKey],
        },
      }}
      size="lg"
      radius="md"
      p="xs"
    >
      {ingredient}
    </Badge>
  );
}

interface Props {
  ingredient: string;
  ingrKey: 'base' | 'sub' | 'juice';
  amount: number;
  activeTab: string | null;
}

function CocktailIngrChip({ ingredient, ingrKey, amount, activeTab }: Props) {
  return (
    <Box mb="xs" key={`cocktail-view--${String(ingrKey)}--${ingredient}`}>
      {/* {ingrNameBadge(key, ingredient)} */}
      <NameBadge ingrKey={ingrKey} ingredient={ingredient} />
      <AmountBadge amount={amount} subText={activeTab ? activeTab : 'ml'}>
        {activeTab === 'ml' ? (
          <Text>{amount}</Text>
        ) : (
          <Text>{mlOzCalc(amount)}</Text>
        )}
      </AmountBadge>
    </Box>
  );
}

export default CocktailIngrChip;
