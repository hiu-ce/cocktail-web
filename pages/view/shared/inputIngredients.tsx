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
import { IngredientsGroup, IngredientType } from '../../../lib/types';
import { ReqIngredients } from '../../../lib/req.types';
import { ResIngredient } from '../../../lib/res.types';

interface InputIngredientsProps {
  ingredient: IngredientsGroup;
  ingredientValue: ReqIngredients;
  setIngredientValue: React.Dispatch<React.SetStateAction<ReqIngredients>>;
  scrollTo: (index: number) => void;
  componentIndex: number;
  isScrolling: boolean;
}

export function InputIngredients({
  ingredient,
  ingredientValue,
  setIngredientValue,
  scrollTo,
  componentIndex,
  isScrolling,
}: InputIngredientsProps) {
  const values = Object.values(ingredient)[0];
  const name: IngredientType = ObjectTyped.keys(ingredient)[0];
  const [opened, setOpened] = useState(false);
  const [includeIngr, setIncludeIngr] = useState<string[]>([]);
  const [amount, setAmount] = useState<ResIngredient>({});
  const [newIngr, setNewIngr] = useState('');
  const focusTrapRef = useFocusTrap();
  const handlers = useRef<NumberInputHandlers>();
  const { ref, focused } = useFocusWithin();

  useEffect(() => {
    const obj: ResIngredient = {};
    setAmount({
      ...includeIngr.reduce(function (target, key) {
        if (!Object.keys(amount).includes(key)) target[key] = 0;
        else target[key] = amount[key];
        return target;
      }, obj),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeIngr]);

  useEffect(() => {
    setIngredientValue({ ...ingredientValue, [name]: amount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    if (focused) scrollTo(componentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  function onSubmit() {
    setIncludeIngr([...includeIngr, newIngr]);
    setNewIngr('');
    setOpened(false);
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    e.target.select();
  }

  return (
    <div ref={ref}>
      <Paper
        shadow="xs"
        p={20}
        my={10}
        sx={(theme: any) => ({
          backgroundColor: theme.colors.gray[0],
        })}
      >
        <Grid>
          <Grid.Col span={10}>
            <Chip.Group multiple value={includeIngr} onChange={setIncludeIngr}>
              {values.map((value, index) => (
                <Chip value={value} key={`addRecipe--${name}--${index}`}>
                  {value}
                </Chip>
              ))}
              {/* </Chip.Group>
            <Chip.Group
              sx={{ marginTop: 10 }}
              multiple
              value={includeIngr}
              onChange={setIncludeIngr}
            > */}
              {includeIngr
                .filter((x) => !values.includes(x))
                .map((value, index) => (
                  <Chip
                    variant="filled"
                    value={value}
                    key={`addRecipe--${name}--${index}`}
                  >
                    {value}
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
              withArrow
            >
              <Popover.Target>
                <Button onClick={() => setOpened((o) => !o)} size="xs">
                  +
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
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
                      placeholder={`New ${name}`}
                      variant="filled"
                      value={newIngr}
                      onChange={(event: any) =>
                        setNewIngr(event.currentTarget.value)
                      }
                      styles={{ rightSection: { pointerEvents: 'none' } }}
                    />
                    <Button type="submit">Add</Button>
                  </Box>
                </form>
              </Popover.Dropdown>
            </Popover>
          </Grid.Col>
          <Grid.Col span={12}>
            <Collapse in={!!includeIngr.length} sx={{ width: '100%' }}>
              <Divider
                my="sm"
                label={`Enter ${name} ingredients`}
                labelPosition="center"
              />
              <Table striped highlightOnHover>
                <tbody>
                  {[...includeIngr].reverse().map((ingr, index) => (
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
                          {ingr}
                        </Button>
                      </td>
                      <td style={{ width: '60%' }}>
                        {name === 'other' ? (
                          <TextInput
                            ref={index === 0 ? focusTrapRef : null}
                            value={
                              amount[ingr] !== undefined ? amount[ingr] : ''
                            }
                            onChange={(e) => {
                              setAmount({
                                ...amount,
                                [ingr]: e.target.value,
                              });
                            }}
                            onFocus={onFocus}
                          />
                        ) : (
                          <Group spacing={5} style={{}}>
                            <ActionIcon
                              size={42}
                              variant="default"
                              onClick={() =>
                                handlers.current && handlers.current.decrement()
                              }
                            >
                              -
                            </ActionIcon>

                            <NumberInput
                              hideControls
                              value={+amount[ingr]}
                              onChange={(val) =>
                                setAmount({
                                  ...amount,
                                  [ingr]: val ? val : 0,
                                })
                              }
                              onFocus={onFocus}
                              ref={index === 0 ? focusTrapRef : null}
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
                                handlers.current && handlers.current.increment()
                              }
                            >
                              +
                            </ActionIcon>
                          </Group>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Collapse>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
}
