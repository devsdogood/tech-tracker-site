import Moment from 'react-moment';
import {
  Box,
  Text,
  Stack,
  useColorModeValue,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Device } from '@prisma/client';
import { useState } from 'react';
import DeviceForm from './DeviceForm';

type StatusProps = {
  device: Device;
};

function Status({ device }: StatusProps) {
  const color = device?.status === 'ONLINE' ? 'green' : 'red';
  const [editing, setEditing] = useState(false);

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
          <IconButton
            marginLeft="auto"
            width="max-content"
            aria-label="Edit device data"
            onClick={() => setEditing(!editing)}
            icon={<EditIcon />}
          />
        </SimpleGrid>
      </Stack>

      <Stack>
        <DeviceForm
          buttonText="Update Device"
          initialValues={device}
          disabled={!editing}
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
