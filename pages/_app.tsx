import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { NotificationsProvider } from '@mantine/notifications';
import '../styles/globals.css';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  }, []);

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Cokctail-Recipes</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colors: {
              ///'#536976 -> #292E49',
              // #232526 -> #414345
            },
            // white: '#f8f8f8',
            // black: '#bbbbbb',
            colorScheme: 'dark',
            primaryColor: 'cyan',
            primaryShade: 8,
            defaultGradient: {
              from: 'cyan',
              to: 'teal',
              deg: 90,
            },
            // shadows: {
            //   md: '1px 1px 3px rgba(0, 0, 0, .30)',
            //   xl: '5px 5px 7px rgba(0, 0, 0, .30)',
            // },

            components: {
              Button: {
                defaultProps: {
                  variant: 'outline',
                },
              },
              Modal: {
                styles: (theme) => ({
                  modal: {
                    backgroundColor: theme.colors.dark[6],
                  },
                  header: {
                    margin: theme.spacing.xs,
                    marginTop: 0,
                  },
                }),

                defaultProps: {
                  transition: 'fade',
                  transitionDuration: 500,
                  transitionTimingFunction: 'ease',
                  closeOnEscape: false,
                },
              },
              Paper: {
                styles: (theme) => ({
                  root: {
                    backgroundColor: theme.colors.dark[7],
                  },
                }),
                defaultProps: {
                  shadow: 'md',
                  radius: 'xs',
                },
              },
              LoadingOverlay: {
                defaultProps: {
                  overlayColor: 'none',
                },
              },
              Card: {
                styles: (theme) => ({
                  root: {
                    backgroundColor: theme.colors.dark[7],
                  },
                }),
                defaultProps: {
                  shadow: 'md',
                  radius: 'md',
                },
              },
              Spoiler: {
                styles: (theme) => ({
                  control: {
                    fontSize: '14px',
                    WebkitTextFillColor: theme.colors.gray[5],
                    ':hover': {
                      textDecoration: 'none',
                    },
                  },
                }),
              },
            },
          }}
        >
          <NotificationsProvider>
            <Global
              styles={(theme) => ({
                body: {
                  ...theme.fn.fontStyles(),
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[5]
                      : theme.white,

                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[2]
                      : theme.black,
                  lineHeight: theme.lineHeight,
                },
              })}
            />

            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
