import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import WithSubnavigation from 'components/navigation/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <WithSubnavigation />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
    <ToastContainer />
  </ChakraProvider>
);

export default App;
