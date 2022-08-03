import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Title,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { ChevronsUp, GlassFull } from 'tabler-icons-react';
import { getCocktails } from '../../api/api';
import { ResCocktail, ResCocktailsName } from '../../lib/res.types';
import { josa } from '../../lib/utils';
import CocktailView from './cocktailView';

interface Props {
  cocktailsName: ResCocktailsName | undefined;
  collapseOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
  searchedText: string;
}
function SearchCollapse({
  cocktailsName,
  collapseOpenState,
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
    <Collapse
      in={searchCollapseIsOpened}
      style={{ width: '100%' }}
      transitionDuration={400}
    >
      <Paper radius="xs" shadow="md" style={{ width: '100%' }}>
        <Box style={{ display: 'flex' }} p="md" pb="xs">
          <Title style={{ width: '100%' }} order={5}>
            {searchedText}
            {josa(searchedText) ? '이' : '가'} 포함된 레시피
          </Title>
          <Group position="right">
            <ActionIcon onClick={() => setSearchCollapseIsOpened(false)}>
              <ChevronsUp />
            </ActionIcon>
          </Group>
        </Box>
        <Box p="md" pt={0}>
          <Box style={{ minHeight: 46, position: 'relative' }}>
            <LoadingOverlay transitionDuration={300} visible={!cocktailsName} />
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
        </Box>
      </Paper>
      <Modal
        centered
        opened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        title={cocktailData?.cocktail_name}
      >
        {cocktailData && <CocktailView cocktail={cocktailData} />}
      </Modal>
    </Collapse>
  );
}

export default SearchCollapse;
