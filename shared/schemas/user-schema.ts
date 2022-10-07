import * as yup from 'yup';

const userSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export default userSchema;
