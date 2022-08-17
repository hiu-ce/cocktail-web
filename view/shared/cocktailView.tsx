import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Image,
  Paper,
  Skeleton,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  GlassFull,
  Plus,
  Scale,
  X,
} from 'tabler-icons-react';
import CocktailIngrChip, { AmountBadge } from './cocktailIngrChip';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cocktail: any;
  isMain?: boolean;
}

function CocktailView({ cocktail, isMain }: Props) {
  const [isOpened, setIsOpened] = useState(!isMain);
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
  const ingrKeys = cocktail
    ? Object.keys(cocktail).filter(
        (key): key is 'base' | 'sub' | 'juice' =>
          key == 'base' || key == 'sub' || key == 'juice'
      )
    : [];
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
    [color.bg, color.default]
  );

  return (
    <Card shadow="md" p="lg" radius="md">
      <Card.Section>
        <Image
          src="https://mblogthumb-phinf.pstatic.net/MjAxNzAzMTJfMjY3/MDAxNDg5Mjk2ODUyMDAz.6ZKzDX86YZh32qXlu7xuxQSOuI55wF3n9sGuLSRkF0Mg.8tx-NlT4UQgdyOVtSbqUb6VHrJqyXwzGCd6fWn_sgRwg.PNG.wlsdml1103/%EB%A6%AC%EB%88%85%EC%8A%A4.png?type=w800"
          height={250}
          alt="Norway"
        />
      </Card.Section>
      <Text weight={850} size={20} my={15}>
        {cocktail?.cocktail_name ?? 'loading...'}
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
          <ActionIcon ml="auto" onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? <X strokeWidth={1.5} /> : <Plus strokeWidth={1.5} />}
          </ActionIcon>
        </Tabs.List>
      </Tabs>
      {ingrKeys.length ? (
        ingrKeys.map((key) => {
          const item = Object.keys(cocktail[key]);
          const firstItem = item[0];
          const length = item.length;

          return length ? (
            //////fix!!!!!!
            <Box key={`cocktail-view--${String(key)}--${firstItem}`}>
              {isOpened ? (
                <CocktailIngrChip
                  ingredient={firstItem}
                  ingrKey={key}
                  activeTab={activeTab}
                  amount={cocktail[key][firstItem]}
                />
              ) : (
                <Box mb="xs" style={{ display: 'flex', alignItems: 'center' }}>
                  {ingrNameBadge(key, key)}
                  <Badge
                    color="cyan"
                    styles={(theme) => ({
                      inner: {
                        fontSize: 12,
                        textTransform: 'none',
                        color: theme.colors.gray[6],
                        display: 'flex',
                        alignItems: 'center',
                      },
                      rightSection: {
                        marginLeft: 0,
                      },
                    })}
                    variant="dot"
                    size="md"
                    mx="xs"
                  >
                    <Button
                      variant="subtle"
                      onClick={() => setIsOpened(!isOpened)}
                      styles={() => ({
                        root: {
                          ':hover': {
                            backgroundColor: 'rgba(0,0,0,0)',
                          },
                          fontSize: 12,
                        },
                      })}
                      px={0}
                      py={10}
                    >
                      <Text mr={4} color={theme.colors.gray[3]} weight={800}>
                        {length}
                      </Text>
                      <Plus
                        color={theme.colors.gray[4]}
                        size={12}
                        strokeWidth={1.5}
                      />
                    </Button>
                  </Badge>
                </Box>
              )}
              <Collapse in={isOpened}>
                {item.map((ingredient, index) => {
                  return index ? (
                    <CocktailIngrChip
                      ingredient={ingredient}
                      ingrKey={key}
                      key={`cocktailIngrChip--${String(
                        key
                      )}--${ingredient}--${index}`}
                      activeTab={activeTab}
                      amount={cocktail[key][ingredient]}
                    />
                  ) : null;
                })}
              </Collapse>
            </Box>
          ) : null;
        })
      ) : (
        <Box mb="xs">
          {ingrNameBadge('base', 'loading')}
          <AmountBadge>
            <Text>Loading</Text>
          </AmountBadge>
        </Box>
      )}

      {cocktail?.other &&
        Object.keys(cocktail.other).map(
          (other) =>
            cocktail.other && (
              <Box mb="xs" key={`cocktail-viwe--other--${other}`}>
                {ingrNameBadge('other', other)}
                <AmountBadge>{cocktail.other[other]}</AmountBadge>
              </Box>
            )
        )}
      <Divider
        mt="lg"
        mb="sm"
        py={1}
        label={
          <>
            {isOpened ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            <Box ml="xs" my={0}>
              <Text my={0}>믹싱 방법</Text>
            </Box>
          </>
        }
        labelPosition="center"
        labelProps={{
          style: {
            cursor: 'pointer',
            marginY: 0,
          },
          onClick: () => {
            setIsOpened(!isOpened);
          },
        }}
      />
      <Collapse in={isOpened}>
        <Skeleton visible={!cocktail}>
          <Paper p="md" style={{ backgroundColor: theme.colors.dark[6] }}>
            <Text>{cocktail?.recipe || 't\nt\nt\n'}</Text>
          </Paper>
        </Skeleton>
      </Collapse>

      {/* {JSON.stringify(cocktail)} */}
    </Card>
  );
}

export default CocktailView;
