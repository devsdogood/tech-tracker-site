import { Box, SimpleGrid } from '@chakra-ui/react';
import useDevices from '@util/hooks/useDevices';
import Status from 'components/devices/Status';

function Dashboard() {
  const devices = useDevices();

  return (
    <Box m="2em">
      <SimpleGrid minChildWidth="250px" spacing="40px">
        {devices?.map((d) => <Status device={d} key={d.id} />)}
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
