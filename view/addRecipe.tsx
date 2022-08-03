import {
  Box,
  Button,
  Group,
  ScrollArea,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { Check, X } from 'tabler-icons-react';
import { createCocktail } from '../api/api';
import { ReqIngredients } from '../lib/req.types';
import { IngredientsGroup } from '../lib/types';
import InputIngredients from './shared/inputIngredients';

interface Props {
  setOpened: (opened: boolean) => void;
  ingredientsGroup: IngredientsGroup[];
}

export default function AddRecipe({ setOpened, ingredientsGroup }: Props) {
  // const loader = useLoaderData();
  // const fetcher = useFetcher();
  const [ingredientValue, setIngredientValue] = useState<ReqIngredients>({
    base: {},
    sub: {},
    juice: {},
    other: {},
  });

  const viewport = useRef<HTMLDivElement | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);

  const [cocktailName, setCocktailName] = useState('');
  const [recipe, setRecipe] = useState('');

  const [error, setError] = useState(true);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const [prevPosition, setPrevPosition] = useState(scrollPosition);
  const [sec, setSec] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const interval = useInterval(() => {
    setSec((s) => !s);
  }, 100);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsScrolling(scrollPosition !== prevPosition);
    setPrevPosition(scrollPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sec]);

  const scrollTo = (index: number) => {
    if (viewport.current) {
      viewport.current.focus({ preventScroll: true });
      const height = refs.current.map((item) => item.scrollHeight);
      const top = [0];
      height.reduce((a, b) => {
        top.push(a + 24);
        return a + 10 + b;
      });
      viewport.current.scrollTo({ top: top[index], behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ingrChecked = !Object.values(ingredientValue).filter(
      (d) => Object.values(d).length > 0
    ).length;
    setError(ingrChecked || !cocktailName || !recipe);
  }, [cocktailName, ingredientValue, recipe]);

  const postCocktail = useMutation(createCocktail, {
    onSuccess: () => {
      updateNotification({
        id: 'post-cocktail',
        color: 'teal',
        title: 'Add data successfully',
        message: '칵테일 레시피가 성공적으로 등록되었습니다',
        icon: <Check />,
        autoClose: 2000,
      });
      setOpened(false);
    },
    onError: () => {
      updateNotification({
        id: 'post-cocktail',
        color: 'red',
        title: 'Data post failure',
        message: '칵테일 레시피 등록을 실패했습니다',
        icon: <X />,
        autoClose: 3000,
      });
    },
  });

  return (
    <>
      <TextInput
        required
        label="Cocktail Name"
        description="칵테일 이름을 입력하세요"
        data-autofocus
        value={cocktailName}
        onChange={(e) => {
          setCocktailName(e.currentTarget.value);
        }}
        id="input-demo"
        placeholder="칵테일"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        mb="xs"
      />
      <ScrollArea.Autosize
        maxHeight="55vh"
        type="scroll"
        viewportRef={viewport}
        onScrollPositionChange={onScrollPositionChange}
      >
        <Box mb={150}>
          {ingredientsGroup.map((ingredient, index) => (
            <Box
              key={`addRecipe--${index}`}
              ref={(ref: HTMLDivElement) => (refs.current[index] = ref)}
              my="sm"
            >
              <Text transform="uppercase" size="lg" weight={700} m="xs">
                {Object.keys(ingredient)[0]}
              </Text>
              <InputIngredients
                ingredient={ingredient}
                ingredientValue={ingredientValue}
                setIngredientValue={setIngredientValue}
                scrollTo={scrollTo}
                componentIndex={index}
                isScrolling={isScrolling}
              />
            </Box>
          ))}
        </Box>
      </ScrollArea.Autosize>

      <Textarea
        required
        label="제작 방법"
        description="순서, 믹싱 방법 등을 입력하세요"
        value={recipe}
        onChange={(event) => setRecipe(event.currentTarget.value)}
        autosize
        minRows={2}
        maxRows={4}
        placeholder="ex) 재료를 모두 넣어 빌드한다"
      />

      <Group position="right" mt={10}>
        <Button
          disabled={error}
          onClick={() => {
            showNotification({
              id: 'post-cocktail',
              loading: true,
              title: 'Add cocktail data',
              message: `칵테일 ${cocktailName} 등록 중입니다`,
              autoClose: false,
              disallowClose: true,
            });
            postCocktail.mutate({
              cocktail_name: cocktailName,
              ...ingredientValue,
              recipe,
            });
          }}
        >
          Submit
        </Button>
      </Group>
    </>
  );
}
