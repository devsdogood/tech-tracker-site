import { Box, Center } from '@chakra-ui/react';
import DeviceForm from 'components/devices/DeviceForm';

function NewDevicePage() {
  return (
    <Center width="100%" mt="2em">
      <Box w="100%" maxW="500px">
        <DeviceForm buttonText="Add Device" disabled={false} />
      </Box>
    </Center>
  );
}

export default NewDevicePage;
