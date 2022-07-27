import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Group,
  Modal,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { ChevronsUp, FoldUp, GlassFull } from 'tabler-icons-react';
import { getCocktails } from '../../api/api';
import { ResCocktail, ResCocktailsName } from '../../lib/res.types';
import CocktailView from './cocktailView';

interface Props {
  cocktailsName: ResCocktailsName | undefined;
  collapseOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
  searchedText: string;
}
function SearchCollapse({
  cocktailsName,
  collapseOpenState,
  // loadingCocktail,
  // onClick,
  searchedText,
}: Props) {
  const [searchCollapseIsOpened, setSearchCollapseIsOpened] = collapseOpenState;
  const [loadingCocktail, setLoadingCocktail] = useState('');
  const [cocktailData, setCocktailData] = useState<ResCocktail>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const cocktailMutate = useMutation(getCocktails, {
    onSuccess: (data) => {
      setLoadingCocktail('');
      setCocktailData(data);
      setIsModalOpened(true);
    },
  });

  function onClick(cocktail_name: string) {
    setLoadingCocktail(cocktail_name);
    cocktailMutate.mutate(cocktail_name);
  }

  return (
    <Collapse in={searchCollapseIsOpened} style={{ width: '100%' }}>
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
          {cocktailsName &&
            cocktailsName.map((item, index) => (
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
      {cocktailData && (
        <Modal
          centered
          opened={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          title={cocktailData.cocktail_name}
        >
          <CocktailView cocktail={cocktailData} />
        </Modal>
      )}
    </Collapse>
  );
}

export default SearchCollapse;
