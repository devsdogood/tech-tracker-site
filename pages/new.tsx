import { Box, Center } from '@chakra-ui/react';
import DeviceForm from 'components/devices/DeviceForm';
import Head from 'next/head';

const NewDevicePage = () => (
  <Center width="100%" mt="2em">
    <Head>
      <title>Add Device</title>
    </Head>
    <Box w="100%" maxW="500px">
      <DeviceForm buttonText="Add Device" disabled={false} />
    </Box>
  </Center>
);

export default NewDevicePage;
