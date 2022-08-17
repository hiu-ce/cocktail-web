import { Button, Center, Grid, Group, Modal, ScrollArea } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import AddRecipe from '../view/addRecipe';
import SearchBar from '../view/searchBar';
import CocktailTitle from '../view/title';
import Body from '../view/body';
import { Plus } from 'tabler-icons-react';

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const viewport = useRef<HTMLDivElement | null>(null);
  const title = useRef<HTMLTitleElement | null>(null);

  const scrollToBottom = () =>
    viewport.current &&
    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    });

  const scrollToSearchBar = () => {
    viewport.current &&
      title.current &&
      viewport.current.scrollTo({
        top: title.current.scrollHeight,
        behavior: 'smooth',
      });
  };
  // call this method whenever you want to refresh server-side props
  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <ScrollArea
      style={{ height: '100vh', overflow: 'hidden' }}
      viewportRef={viewport}
    >
      <Center>
        <Grid m="xl" style={{ width: '100%', maxWidth: 1000 }} mb={60}>
          <header ref={title} style={{ width: '100%' }}>
            <Grid style={{ width: '100%' }}>
              <Grid.Col xs={2}></Grid.Col>
              <Grid.Col xs={8}>
                <Center>
                  <CocktailTitle />
                </Center>
              </Grid.Col>
              <Grid.Col xs={2}>
                <Group
                  position="center"
                  align="center"
                  style={{ height: '100%' }}
                >
                  <Button onClick={() => setOpened(true)}>Add Recipe</Button>
                </Group>
              </Grid.Col>
            </Grid>
          </header>
          <main style={{ width: '100%' }}>
            <Grid.Col xs={12} style={{ width: '100%' }}>
              <Center style={{ width: '100%' }}>
                <SearchBar scrollToSearchBar={scrollToSearchBar} />
              </Center>
            </Grid.Col>
            <Grid.Col xs={12}>
              <Body scrollToBottom={scrollToBottom} />
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
