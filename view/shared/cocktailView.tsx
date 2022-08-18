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
import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  GlassFull,
  Minus,
  Plus,
  Scale,
  X,
} from 'tabler-icons-react';
import CocktailIngrChip, { AmountBadge, NameBadge } from './cocktailIngrChip';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cocktail: any;
  isMobileMain?: boolean;
}

function CocktailView({ cocktail, isMobileMain }: Props) {
  const [isOpened, setIsOpened] = useState(!isMobileMain);
  const theme = useMantineTheme();
  const color = {
    base: 'cyan',
    sub: 'blue',
    juice: 'indigo',
    // other: 'lime',
    other: 'violet',
  };
  const ingrKeys = cocktail
    ? Object.keys(cocktail).filter(
        (key): key is 'base' | 'sub' | 'juice' | 'other' =>
          key == 'base' || key == 'sub' || key == 'juice' || key == 'other'
      )
    : [];
  const [activeTab, setActiveTab] = useState<string | null>('ml');

  useEffect(() => {
    setIsOpened(!isMobileMain);
  }, [isMobileMain]);

  return (
    <Card shadow="md" p="lg" radius="md">
      <Card.Section>
        {isMobileMain && (
          <Collapse in={!isOpened}>
            <Divider
              mt="xs"
              mb={0}
              mx="20%"
              label={
                <>
                  <Plus size={12} strokeWidth={1} />
                  <Text ml="xs">Open to show image</Text>
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
              variant="dashed"
              size="xs"
            />
          </Collapse>
        )}
        <Collapse in={isOpened || !isMobileMain}>
          <Skeleton visible={cocktail?.img_url === undefined}>
            <Image
              src={
                cocktail?.img_url ||
                'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?quality=82&strip=1'
              }
              height={250}
              alt="Cocktail Image"
            />
          </Skeleton>
        </Collapse>
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
                  <NameBadge ingrKey={key} ingredient={key} />
                  <Badge
                    color={color[key]}
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
          <NameBadge ingrKey="base" ingredient="loading" />
          <AmountBadge>
            <Text>Loading</Text>
          </AmountBadge>
        </Box>
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
      <Collapse in={isOpened && cocktail}>
        <Paper p="md" style={{ backgroundColor: theme.colors.dark[6] }}>
          <Text>{cocktail?.recipe || 't\nt\nt\n'}</Text>
        </Paper>
      </Collapse>
    </Card>
  );
}

export default CocktailView;
