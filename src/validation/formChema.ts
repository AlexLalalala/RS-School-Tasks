import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

const requiredMessageFactory = (prop: string) => {
  return `${prop} is required`;
};

const symbolRequirementMessageFactory = (sym: string) => {
  return `Must contain at least one ${sym}`;
};

export const formSchema = yup.object({
  name: yup
    .string()
    .required(requiredMessageFactory('Name'))
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),

  age: yup
    .number()
    .required(requiredMessageFactory('Age'))
    .min(0, 'Age must be positive'),

  email: yup
    .string()
    .required(requiredMessageFactory('Email'))
    .email('Invalid Email'),

  password: yup
    .string()
    .min(8)
    .matches(/[0-9]/, symbolRequirementMessageFactory('number'))
    .matches(/[a-z]/, symbolRequirementMessageFactory('lower case letter'))
    .matches(/[A-Z]/, symbolRequirementMessageFactory('upper case letter'))
    .matches(
      /[^a-zA-Z0-9]/,
      symbolRequirementMessageFactory('special character')
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),

  gender: yup.string().required(requiredMessageFactory('Gender')),

  terms: yup.boolean().required().oneOf([true], 'You must accept the terms'),

  country: yup.string().required(requiredMessageFactory('Country')),

  file: yup
    .mixed<FileList>()
    .required(requiredMessageFactory('Image'))
    .test('filePresent', 'Image is required', (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test('fileType', 'Must be .png or .jpeg', (value) => {
      if (value instanceof FileList && value.length === 0) return true;
      return ALLOWED_TYPES.includes(value[0].type);
    })
    .test('fileSize', 'Must be under 5Mb', (value) => {
      if (value instanceof FileList && value.length === 0) return true;
      return value[0].size <= MAX_FILE_SIZE;
    }),
});

export type FormData = yup.InferType<typeof formSchema>;
