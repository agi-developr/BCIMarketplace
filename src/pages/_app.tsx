import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import '@/styles/globals.css'
import Head from 'next/head'
import AuthProvider from '@/components/AuthProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>BCI Marketplace - Your Gateway to Brain Computer Interfaces</title>
          <meta name="description" content="BCI Marketplace - Discover cutting-edge brain computer interfaces for gaming, productivity, wellness, and more" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  )
} 