import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global, MantineProvider } from '@mantine/core';
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
                styles: (theme) => ({
                  root: {
                    ':disabled': {
                      backgroundImage: theme.fn.gradient({
                        // from: theme.colors.cyan[9],
                        // to: theme.colors.teal[9],
                        from: '#0D505C',
                        to: '#0D505C',
                      }),
                    },
                    // label: {
                    //   backgroundColor: 'red',
                    // },
                  },
                }),
                defaultProps: {
                  variant: 'gradient',
                },
              },
              Modal: {
                defaultProps: {
                  transition: 'fade',
                  transitionDuration: 500,
                  transitionTimingFunction: 'ease',
                },
              },
              Paper: {
                styles: (theme) => ({
                  root: {
                    backgroundColor: theme.colors.dark[6],
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
                defaultProps: {
                  shadow: 'md',
                  radius: 'md',
                },
              },
            },
          }}
        >
          <NotificationsProvider>
            <Global
              styles={(theme) => ({
                body: {
                  ...theme.fn.fontStyles(),
                  // backgroundImage:
                  //   theme.colorScheme === 'dark'
                  //     ? theme.fn.gradient({
                  //         from: '#232526',
                  //         to: 'cyan',
                  //         deg: 100,
                  //       })
                  //     : theme.white,
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[5]
                      : theme.white,

                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[5]
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
