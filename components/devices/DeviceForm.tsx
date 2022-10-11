import { Formik, Field } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import deviceSchema from '@shared/schemas/device-schema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assign } from 'lodash';

type DeviceFormProps = {
  buttonText: 'Add Device' | 'Update Device';
  disabled: boolean,
  id?: number,
  initialValues?: {
    name: string,
    ip: string,
  },
};

// eslint-disable-next-line react/function-component-definition
const DeviceForm: React.FC<DeviceFormProps> = ({
  buttonText, disabled, initialValues, id,
}) => (
  <Box bg="white" rounded="md" px="1em">
    <Formik
      initialValues={initialValues || { name: '', ip: '' }}
      validationSchema={deviceSchema}
      onSubmit={async (values, { resetForm }) => {
        const url = id ? 'update' : 'create';
        const data = id ? values : assign(values, { id });

        try {
          await axios.post(`/api/devices/${url}`, data);
        } catch (e: any) {
          // reset form when updating if error
          if (id) {
            resetForm();
          }

          return toast.error(`Error updating device: ${e.response?.data.error}`);
        }

        // if creating new device, reset form when complete
        if (!id) {
          resetForm();
        }

        return toast.success(`Updated device: ${values.name}`);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!errors.name && touched.name}>
              <FormLabel>Device Name</FormLabel>
              <Field
                as={Input}
                id="name"
                name="name"
                type="name"
                variant="filled"
                disabled={disabled}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.ip && touched.ip}>
              <FormLabel>Device IP</FormLabel>
              <Field
                as={Input}
                id="ip"
                name="ip"
                type="ip"
                variant="filled"
                disabled={disabled}
              />
              <FormErrorMessage>{errors.ip}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="orange" width="full" disabled={disabled}>
              {buttonText}
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  </Box>
);

export default DeviceForm;
