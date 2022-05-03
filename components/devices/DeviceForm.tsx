import { useForm } from '@mantine/form';
import {
  TextInput, Button, Group, Box,
} from '@mantine/core';

function DeviceForm() {
  const form = useForm({
    initialValues: {
      name: '',
      ip: '',
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form>
        <TextInput
          required
          label="Name"
          placeholder="Enter Device Name"
          // eslint-disable-next-line
          {...form.getInputProps('name')}
        />
        <TextInput
          required
          label="IP"
          placeholder="Enter Device IP"
          // eslint-disable-next-line
          {...form.getInputProps('ip')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
export default DeviceForm;
