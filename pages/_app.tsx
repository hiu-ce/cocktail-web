import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationsProvider } from '@mantine/notifications';
import axios from 'axios';

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
