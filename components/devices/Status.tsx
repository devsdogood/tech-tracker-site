import Moment from 'react-moment';
import {
  Box,
  Text,
  Stack,
  useColorModeValue,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Device } from '@prisma/client';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeviceForm from './DeviceForm';

type StatusProps = {
  device: Device,
};

function Status({ device }: StatusProps) {
  const color = device?.status === 'ONLINE' ? 'green' : 'red';
  const [editing, setEditing] = useState(false);

  const deleteDevice = async () => {
    try {
      await axios.post('/api/devices/delete', { id: device.id });
    } catch (e: any) {
      return toast.error(`Error deleting device: ${e.response?.data.error}`);
    }

    return toast.success(`Deleted device: ${device.name}`);
  };

  return (
    <Box
      maxW="350px"
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="xl"
      rounded="md"
      overflow="hidden"
      pb={6}
    >
      <Stack
        p={6}
        color={useColorModeValue('gray.800', 'white')}
      >
        <SimpleGrid columns={2}>
          <Text
            fontSize="sm"
            fontWeight={500}
            bg={useColorModeValue(`${color}.50`, `${color}.900`)}
            p={2}
            px={3}
            color={`${color}.500`}
            rounded="full"
            width="max-content"
          >
            {device.status}
          </Text>
          <Box marginLeft="auto">
            <IconButton
              width="max-content"
              aria-label="Edit device data"
              onClick={() => setEditing(!editing)}
              icon={<EditIcon />}
              mr={2}
            />
            <IconButton
              colorScheme="red"
              width="max-content"
              aria-label="Edit device data"
              onClick={() => deleteDevice()}
              icon={<DeleteIcon />}
            />
          </Box>
        </SimpleGrid>
      </Stack>

      <Stack>
        <DeviceForm
          buttonText="Update Device"
          initialValues={device}
          disabled={!editing}
          id={device.id}
        />
      </Stack>

      <Stack px={6} pt={2}>
        <Text fontSize="sm">
          Last updated
          {' '}
          <Moment fromNow>
            {device.lastUpdated}
          </Moment>
        </Text>
      </Stack>
    </Box>
  );
}

export default Status;
