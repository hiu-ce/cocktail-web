import { Box, Button, Chip, Divider, Paper, Spoiler } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useCallback } from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IngredientsNameArr, SelectSearchItems } from '../../lib/types';

interface Props {
  ingredients: IngredientsNameArr;
  state: [SelectSearchItems, Dispatch<SetStateAction<SelectSearchItems>>];
  ingrName: { name: string; key: string };
}
export default function IngredientSelector({
  ingredients,
  state,
  ingrName,
}: Props) {
  const [value, setValue] = useState<string[]>([]);
  const [ingrState, setIngrState] = state;
  const { ref } = useElementSize();

  useEffect(() => {
    setIngrState({ ...ingrState, [ingrName.key]: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const spoilerButton = useCallback(
    (text: string) => (
      <Button component="div" radius="xl" size="xs" mt="xs">
        {text}
      </Button>
    ),
    []
  );

  return (
    <Paper shadow="md" p="md" pt={2} my="md">
      <Divider mt={0} mb="md" label={ingrName.name} labelPosition="center" />
      {/* <ScrollArea.Autosize maxHeight={105}> */}
      <Spoiler
        maxHeight={105}
        showLabel={spoilerButton('show more')}
        hideLabel={spoilerButton('hide')}
      >
        <Box ref={ref}>
          <Chip.Group multiple value={value} onChange={setValue}>
            {ingredients.map((data: any, index) => (
              <Chip value={data.value} key={index}>
                {data.value}
              </Chip>
            ))}
          </Chip.Group>
        </Box>
      </Spoiler>
      {/* </ScrollArea.Autosize> */}
    </Paper>
  );
}
