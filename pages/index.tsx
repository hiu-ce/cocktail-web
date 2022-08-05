import { Button, Center, Grid, Group, Modal, ScrollArea } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddRecipe from '../view/addRecipe';
import SearchBar from '../view/searchBar';
import CocktailTitle from '../view/title';
import Body from '../view/body';

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  // call this method whenever you want to refresh server-side props
  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <ScrollArea style={{ height: '100vh', overflow: 'hidden' }}>
      <Center>
        <Grid style={{ width: '80vw', maxWidth: 1000 }} mb={60}>
          <Grid.Col xs={1}></Grid.Col>
          <Grid.Col xs={10}>
            <Center>
              <CocktailTitle />
            </Center>
          </Grid.Col>
          <Grid.Col xs={1}>
            <Group position="center" align="center" style={{ height: '100%' }}>
              <Button onClick={() => setOpened(true)}>Add Recipe</Button>
            </Group>
          </Grid.Col>
          <main style={{ width: '100%' }}>
            <Grid.Col xs={12} style={{ width: '100%' }}>
              <Center style={{ width: '100%' }}>
                <SearchBar />
              </Center>
            </Grid.Col>
            <Grid.Col xs={12}>
              <Body />
            </Grid.Col>
          </main>
        </Grid>
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title="Add cocktail recipe"
          size="lg"
          style={{ overflow: 'hidden' }}
          trapFocus
        >
          <AddRecipe setOpened={setOpened} />
        </Modal>
      </Center>
    </ScrollArea>
  );
};

export default Home;
