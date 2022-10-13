import { Box, SimpleGrid } from '@chakra-ui/react';
import useDevices from '@util/hooks/useDevices';
import Status from 'components/devices/Status';
import Head from 'next/head';

const Dashboard = () => {
  const devices = useDevices();

  return (
    <Box m="2em">
      <Head>
        <title>Device Dashboard</title>
      </Head>
      <SimpleGrid minChildWidth="250px" spacing="40px">
        {devices?.map((d) => <Status device={d} key={d.id} />)}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
