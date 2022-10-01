import * as yup from 'yup';
import ipRegex from 'ip-regex';

const deviceSchema = yup.object().shape({
  ip: yup.string().test('is-valid-ipv4', (ip) => `${ip.value} is not valid ip`, (ip) => ipRegex().test(ip!)),
  name: yup.string().required(),
});

export default deviceSchema;
