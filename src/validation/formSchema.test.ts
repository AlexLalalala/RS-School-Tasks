import { formSchema } from './formSchema';

export const testFile = new File(['x'], 'test.png', { type: 'image/png' });

const validData = {
  name: 'John',
  age: 25,
  email: 'john@example.com',
  password: 'Abcdef1!',
  confirmPassword: 'Abcdef1!',
  gender: 'male',
  terms: true,
  country: 'Georgia',
  file: [testFile],
};

const validate = (overrides: object) =>
  formSchema.validate({ ...validData, ...overrides }, { abortEarly: false });

describe('formSchema', () => {
  it('passes with correct input', async () => {
    await expect(formSchema.validate(validData)).resolves.toBeDefined();
  });

  it('rejects a name that starts with a lowercase letter', async () => {
    const error = await validate({ name: 'john' }).catch((e) => e);
    expect(error.message).toMatch(/uppercase/i);
  });

  it('rejects a password missing a special character', async () => {
    const error = await validate({
      password: 'Abcdef12',
      confirmPassword: 'Abcdef12',
    }).catch((e) => e);
    expect(error.message).toMatch(/special character/i);
  });

  it('rejects when passwords do not match', async () => {
    const error = await validate({ confirmPassword: 'Different1!' }).catch(
      (e) => e
    );
    expect(error.message).toMatch(/passwords must match/i);
  });
});
