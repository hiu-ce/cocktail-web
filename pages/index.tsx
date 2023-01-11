import { Button, Center, Grid, Group, Modal, ScrollArea } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import AddRecipe from '../components/template/addRecipe';
import SearchBar from '../components/organism/searchBar';
import Body from '../components/template/body';
import { useWindowScroll } from '@mantine/hooks';
import CocktailTitle from '../components/atoms/Title';

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const viewport = useRef<HTMLDivElement | null>(null);
  const title = useRef<HTMLTitleElement | null>(null);
  const [, scrollTo] = useWindowScroll();

  const scrollToBottom = () => {
    viewport.current &&
      scrollTo({
        y: viewport.current.scrollHeight + 500,
      });
  };

  const scrollToSearchBar = () => {
    title.current &&
      scrollTo({
        y: title.current.scrollHeight,
      });
  };
  // call this method whenever you want to refresh server-side props
  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <ScrollArea style={{ overflow: 'hidden' }} viewportRef={viewport} mx="auto">
      <Center>
        <Grid m="xl" style={{ width: '100%', maxWidth: 1000 }} mb={60}>
          <header ref={title} style={{ width: '100%' }}>
            <Grid style={{ width: '100%' }}>
              <Grid.Col xs={2}></Grid.Col>
              <Grid.Col xs={8}>
                <Center>
                  <CocktailTitle>Cocktail-Recipes</CocktailTitle>
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
