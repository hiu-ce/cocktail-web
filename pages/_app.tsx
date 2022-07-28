import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { NotificationsProvider } from '@mantine/notifications';

const queryClient = new QueryClient();

export default function App(props: AppProps) {
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
            colors: {
              'ocean-blue': [
                '#7AD1DD',
                '#5FCCDB',
                '#44CADC',
                '#2AC9DE',
                '#1AC2D9',
                '#11B7CD',
                '#09ADC3',
                '#0E99AC',
                '#128797',
                '#147885',
              ],
              'bright-pink': [
                '#F0BBDD',
                '#ED9BCF',
                '#EC7CC3',
                '#ED5DB8',
                '#F13EAF',
                '#F71FA7',
                '#FF00A1',
                '#E00890',
                '#C50E82',
                '#AD1374',
              ],
            },
            components: {
              Button: {
                defaultProps: {
                  variant: 'gradient',
                },
              },
            },
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
