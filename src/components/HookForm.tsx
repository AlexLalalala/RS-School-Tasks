import { useForm } from 'react-hook-form';
import { type FormFields, formSchema } from '../validation/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Gender } from '../constants/gender';
import useFormStore from '../stores/useFormStore';
import fileToBase64 from '../utils/fileToBase64';

interface HookFormProps {
  onClose: () => void;
}

const HookForm = ({ onClose }: HookFormProps) => {
  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const saveForm = async (rawData: FormFields) => {
    const image = await fileToBase64(rawData.file[0]);
    addSubmission({
      id: crypto.randomUUID(),
      submittedAt: new Date(),
      data: {
        email: rawData.email,
        name: rawData.name,
        age: rawData.age,
        gender: rawData.gender,
        terms: rawData.terms,
        country: rawData.country,
        image,
      },
    });
  };

  const onSubmit = async (data: FormFields) => {
    await saveForm(data);
    console.log(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          className="form-control"
          type="email"
          {...register('email')}
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.email?.message}
        </div>
      </div>
      {/* Password */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          className="form-control"
          type="password"
          {...register('password')}
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.password?.message}
        </div>
      </div>
      {/* Confirm Password */}
      <div className="mb-3">
        <label htmlFor="confirm-password" className="form-label">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          className="form-control"
          type="password"
          {...register('confirmPassword')}
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.confirmPassword?.message}
        </div>
      </div>
      {/* Name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          className="form-control"
          type="text"
          {...register('name')}
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.name?.message}
        </div>
      </div>
      {/* Age */}
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          id="age"
          className="form-control"
          type="number"
          {...register('age')}
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.age?.message}
        </div>
      </div>
      {/* Gender */}
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          id="gender"
          className="form-select"
          aria-label="Gender select"
          {...register('gender')}
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value={Gender.PreferNotToSay}>Prefer not to say</option>
          <option value={Gender.Male}>Male</option>
          <option value={Gender.Female}>Female</option>
          <option value={Gender.NonBinary}>Non-Binary</option>
        </select>
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.gender?.message}
        </div>
      </div>
      {/* Country */}
      <div className="mb-3">
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <input
          id="country"
          className="form-control"
          aria-label="Country input"
          list="country-list"
          autoComplete="off"
          {...register('country')}
        />
        <datalist id="country-list">
          {countries.map((country: string, i: number) => (
            <option value={country} key={i} />
          ))}
        </datalist>
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.country?.message}
        </div>
      </div>
      {/* File */}
      <div className="mb-3">
        <label htmlFor="file" className="form-label">
          Image
        </label>
        <input
          className="form-control"
          type="file"
          id="file"
          {...register('file')}
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.file?.message}
        </div>
      </div>
      {/* Terms and Services */}
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="terms"
          {...register('terms')}
        />
        <label className="form-check-label" htmlFor="terms">
          I agree with Terms and Services
        </label>
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errors.terms?.message}
        </div>
      </div>
      {/* Submit */}
      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
