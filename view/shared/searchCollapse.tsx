import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronsUp, FoldUp, GlassFull } from 'tabler-icons-react';
import { getCocktails } from '../../api/api';
import { ResCocktail, ResCocktailsName } from '../../lib/res.types';
import CocktailView from './cocktailView';

interface Props {
  cocktailsName: ResCocktailsName;
  setSearchCollapseIsOpened: (state: boolean) => void;
  loadingCocktail: string;
  onClick: (cocktail_name: string) => void;
  searchedText: string;
}
function SearchCollapse({
  cocktailsName,
  setSearchCollapseIsOpened,
  loadingCocktail,
  onClick,
  searchedText,
}: Props) {
  return (
    <Paper radius="xs" shadow="md" style={{ width: '100%' }}>
      <Box style={{ display: 'flex', width: '100%' }} p={15}>
        <Title style={{ width: '100%' }} order={5}>
          Searched Cocktails : {searchedText}
        </Title>
        <Group position="right">
          <ActionIcon onClick={() => setSearchCollapseIsOpened(false)}>
            <ChevronsUp />
          </ActionIcon>
        </Group>
      </Box>
      <Box p={15} pt={0}>
        {cocktailsName.map((item, index) => (
          <Button
            leftIcon={<GlassFull size={20} />}
            variant="light"
            radius="xs"
            m={5}
            key={`searched--${item}--${index}`}
            value={item.cocktail_name}
            loading={item.cocktail_name === loadingCocktail}
            loaderProps={{ size: 20 }}
            onClick={() => onClick(item.cocktail_name)}
          >
            {item.cocktail_name}
          </Button>
        ))}
      </Box>
    </Paper>
  );
}

export default SearchCollapse;
