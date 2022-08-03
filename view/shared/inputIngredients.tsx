import {
  ActionIcon,
  Box,
  Button,
  Chip,
  Badge,
  Collapse,
  Divider,
  Grid,
  Group,
  NumberInput,
  Paper,
  Table,
  TextInput,
  ThemeIcon,
  Popover,
} from '@mantine/core';
import { useFocusTrap, useFocusWithin } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { GlassFull, Trash } from 'tabler-icons-react';
import type { NumberInputHandlers } from '@mantine/core';
import { ObjectTyped } from 'object-typed';
import { IngredientsGroup, IngredientType } from '../../lib/types';
import { ReqIngredients } from '../../lib/req.types';
import { ResIngredient } from '../../lib/res.types';

interface InputIngredientsProps {
  ingredient: IngredientsGroup;
  ingredientValue: ReqIngredients;
  setIngredientValue: React.Dispatch<React.SetStateAction<ReqIngredients>>;
  scrollTo: (index: number) => void;
  componentIndex: number;
  isScrolling: boolean;
}

export default function InputIngredients({
  ingredient,
  ingredientValue,
  setIngredientValue,
  scrollTo,
  componentIndex,
}: InputIngredientsProps) {
  const values = Object.values(ingredient)[0];
  const name: IngredientType = ObjectTyped.keys(ingredient)[0];
  const [opened, setOpened] = useState(false);
  const [includeIngr, setIncludeIngr] = useState<ResIngredient[]>([]);
  const [newIngr, setNewIngr] = useState('');
  const focusTrapRef = useFocusTrap();
  const handlers = useRef<NumberInputHandlers>();
  const { ref, focused } = useFocusWithin({});

  useEffect(() => {
    const ingr = {};
    Object.assign(ingr, ...includeIngr);
    setIngredientValue({ ...ingredientValue, [name]: ingr });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeIngr]);

  useEffect(() => {
    if (focused) scrollTo(componentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  function onSubmit() {
    setIncludeIngr([...includeIngr, { [newIngr]: 0 }]);
    setNewIngr('');
    setOpened(false);
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    e.target.select();
  }

  function getIngrName(obj: ResIngredient) {
    return Object.keys(obj)[0];
  }

  function getIngrAmount(obj: ResIngredient) {
    return Object.values(obj)[0];
  }

  function getIngrNameArr(obj: ResIngredient[]) {
    return obj.map((item) => getIngrName(item));
  }

  return (
    <div ref={ref}>
      <Paper shadow="xs" p="xl">
        <Grid>
          <Grid.Col span={10}>
            <Chip.Group
              multiple
              value={getIngrNameArr(includeIngr)}
              onChange={(value) => {
                const keys = getIngrNameArr(includeIngr);
                const t = value.map((key) => {
                  return {
                    [key]: includeIngr[keys.indexOf(key)]
                      ? getIngrAmount(includeIngr[keys.indexOf(key)])
                      : 0,
                  };
                });
                setIncludeIngr(t);
              }}
            >
              {values.map((value, index) => (
                <Chip value={value} key={`addRecipe--${name}--${index}`}>
                  {value}
                </Chip>
              ))}
              {includeIngr
                .filter((x) => !values.includes(getIngrName(x)))
                .map((item, index) => (
                  <Chip
                    variant="filled"
                    value={getIngrName(item)}
                    key={`addRecipe--${name}--${index}`}
                  >
                    {getIngrName(item)}
                  </Chip>
                ))}
            </Chip.Group>
          </Grid.Col>
          <Grid.Col span={2}>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              width={260}
              position="bottom"
            >
              <Popover.Target>
                <Button onClick={() => setOpened((o) => !o)} size="xs">
                  +
                </Button>
              </Popover.Target>

              <Popover.Dropdown p={0}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <TextInput
                      icon={
                        <ThemeIcon
                          size="lg"
                          variant="gradient"
                          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                        >
                          <GlassFull size={16} />{' '}
                        </ThemeIcon>
                      }
                      radius={0}
                      ref={opened ? focusTrapRef : null}
                      placeholder={`New ${name}`}
                      variant="filled"
                      value={newIngr}
                      onChange={(event) =>
                        setNewIngr(event.currentTarget.value)
                      }
                      styles={{ rightSection: { pointerEvents: 'none' } }}
                    />
                    <Button radius={0} type="submit">
                      Add
                    </Button>
                  </Box>
                </form>
              </Popover.Dropdown>
            </Popover>
          </Grid.Col>

          <Grid.Col span={12} py={0}>
            <Collapse in={!!includeIngr.length} sx={{ width: '100%' }}>
              <Divider
                my="sm"
                label={`Enter ${name} ingredients`}
                labelPosition="center"
              />
              <Table striped highlightOnHover>
                <tbody>
                  {includeIngr
                    .map((ingr, index) => (
                      <tr key={`addRecipe--${name}--table--${ingr}--${index}`}>
                        <td style={{ width: '40%' }}>
                          <Button
                            size="xs"
                            leftIcon={<Trash />}
                            color="gray"
                            onClick={() => {
                              setIncludeIngr(
                                includeIngr.filter((x) => x !== ingr)
                              );
                            }}
                          >
                            {getIngrName(ingr)}
                          </Button>
                        </td>
                        <td style={{ width: '60%' }}>
                          {name === 'other' ? (
                            <TextInput
                              ref={focusTrapRef}
                              value={
                                getIngrAmount(ingr) !== undefined
                                  ? getIngrAmount(ingr)
                                  : ''
                              }
                              onChange={(e) =>
                                setIncludeIngr(
                                  includeIngr.map((item, idx) =>
                                    index === idx
                                      ? { [getIngrName(item)]: e.target.value }
                                      : item
                                  )
                                )
                              }
                              onFocus={onFocus}
                            />
                          ) : (
                            <Group spacing={5} style={{}}>
                              <ActionIcon
                                size={42}
                                variant="default"
                                onClick={() =>
                                  handlers.current &&
                                  handlers.current.decrement()
                                }
                              >
                                -
                              </ActionIcon>
                              <NumberInput
                                hideControls
                                value={+getIngrAmount(ingr)}
                                onChange={(val) => {
                                  setIncludeIngr(
                                    includeIngr.map((item, idx) =>
                                      index === idx
                                        ? { [getIngrName(item)]: val ? val : 0 }
                                        : item
                                    )
                                  );
                                }}
                                onFocus={onFocus}
                                ref={focusTrapRef}
                                handlersRef={handlers}
                                min={0}
                                rightSectionWidth={50}
                                rightSection={
                                  <Badge
                                    variant="gradient"
                                    gradient={{
                                      from: 'indigo',
                                      to: 'cyan',
                                      deg: 60,
                                    }}
                                  >
                                    ml
                                  </Badge>
                                }
                                styles={{
                                  input: { width: 100, textAlign: 'center' },
                                }}
                              />

                              <ActionIcon
                                size={42}
                                variant="default"
                                onClick={() =>
                                  handlers.current &&
                                  handlers.current.increment()
                                }
                              >
                                +
                              </ActionIcon>
                            </Group>
                          )}
                        </td>
                      </tr>
                    ))
                    .reverse()}
                </tbody>
              </Table>
            </Collapse>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
}
