import {
  Box,
  Center,
  Chip,
  Divider,
  Paper,
  Spoiler,
  Text,
} from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useCallback } from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';
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
    (children: JSX.Element) => (
      <div className="my-box">
        <Center style={{ height: '100%' }}>{children}</Center>
      </div>
    ),
    []
  );

  return (
    <Paper shadow="md" p="md" pt={2} mb="md">
      <Divider mt="xs" mb="sm" label={ingrName.name} labelPosition="center" />
      <Spoiler
        maxHeight={105}
        showLabel={spoilerButton(
          <>
            <ChevronDown size={18} />
            <Text ml={3} mr={6}>
              더보기
            </Text>
          </>
        )}
        hideLabel={spoilerButton(
          <>
            <ChevronUp size={18} />
            <Text ml={3} mr={6}>
              접기
            </Text>
          </>
        )}
      >
        <Box ref={ref}>
          <Chip.Group multiple value={value} onChange={setValue}>
            {ingredients.map((data, index) => (
              <Chip value={data.value} key={index}>
                {data.value}
              </Chip>
            ))}
          </Chip.Group>
        </Box>
      </Spoiler>
    </Paper>
  );
}
