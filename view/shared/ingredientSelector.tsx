import { Chip, Paper } from '@mantine/core';
import { useState } from 'react';

interface Props {
  ingredients: [];
}
export default function IngredientSelector({ ingredients }: Props) {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Paper shadow="xs" p="md">
      <Chip.Group multiple value={value} onChange={setValue}>
        {ingredients.map((data: any, index) => (
          <Chip value={data.value} key={index}>
            {data.value}
          </Chip>
        ))}
      </Chip.Group>
    </Paper>
  );
}
