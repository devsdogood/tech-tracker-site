import {
  VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Center,
} from '@chakra-ui/react';
import { PrismaClient, User } from '@prisma/client';
import userSchema from '@shared/schemas/user-schema';
import axios from 'axios';
import { Formik, Field } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return {
    props: { users },
  };
}

type NewUserPageProps = {
  users: User[];
};
const NewUserPage: React.FC<NewUserPageProps> = ({ users }) => {
  useEffect(() => {
    axios.post('/api/auth/add', { email: 'tyleremanuel23@gmail.com' });
  });

  return (
    <Center width="100%" mt="2em">
      <Box w="100%" maxW="500px">
        <Formik
          initialValues={{ email: '' }}
          validationSchema={userSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await axios.post('/api/auth/add', values);
            } catch (e: any) {
              return toast.error(`Error adding user: ${e.response?.data.error}`);
            }

            resetForm();
            return toast.success(`Added user: ${values.email}`);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel>User Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                  <b>Existing Users:</b>
                  {' '}
                  <Box>
                    <ul style={{ marginLeft: '2em' }}>{users.map((u) => <li key={u.id}>{u.email}</li>)}</ul>
                  </Box>
                </FormControl>
                <Button type="submit" colorScheme="orange" width="full">
                  Add
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default NewUserPage;
