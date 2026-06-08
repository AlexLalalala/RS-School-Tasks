import { useRef, useState } from 'react';
import useFormStore from '../stores/useFormStore';
import { Gender } from '../constants/gender';
import { formSchema, type FormFields } from '../validation/formSchema';
import { ValidationError } from 'yup';
import fileToBase64 from '../utils/fileToBase64';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

type ErrorMessages = Partial<Record<keyof FormFields, string>>;

interface UncontrolledFormProps {
  onClose: () => void;
}

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
  const [password, setPassword] = useState<string>('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);

  const readForm = (): FormFields => {
    return {
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
      name: nameRef.current?.value ?? '',
      age: Number(ageRef.current?.value),
      gender: (genderRef.current?.value ?? '') as Gender,
      terms: termsRef.current?.checked ?? false,
      country: countryRef.current?.value ?? '',
      file: fileRef.current?.files ?? new FileList(),
    };
  };

  const validateData = async (rawData: FormFields) => {
    try {
      await formSchema.validate(rawData, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorMap = error.inner.reduce<ErrorMessages>((acc, err) => {
          if (err.path) acc[err.path as keyof FormFields] = err.message;
          return acc;
        }, {});
        setErrorMessages(errorMap);
      }
      return false;
    }
  };

  const saveForm = async (rawData: FormFields) => {
    setErrorMessages({});
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

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const rawData = readForm();
    if (await validateData(rawData)) {
      saveForm(rawData);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          ref={emailRef}
          className="form-control"
          type="email"
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.email}
        </div>
      </div>
      {/* Password */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          ref={passwordRef}
          className="form-control"
          type="password"
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.password}
        </div>
      </div>
      {/* Confirm Password */}
      <div className="mb-3">
        <label htmlFor="confirm-password" className="form-label">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          ref={confirmPasswordRef}
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.confirmPassword}
        </div>
        <PasswordStrengthIndicator password={password} />
      </div>
      {/* Name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" ref={nameRef} className="form-control" type="text" />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.name}
        </div>
      </div>
      {/* Age */}
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" ref={ageRef} className="form-control" type="number" />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.age}
        </div>
      </div>
      {/* Gender */}
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          id="gender"
          ref={genderRef}
          className="form-select"
          aria-label="Gender select"
          defaultValue=""
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
          {errorMessages.gender}
        </div>
      </div>
      {/* Country */}
      <div className="mb-3">
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <input
          id="country"
          ref={countryRef}
          className="form-control"
          aria-label="Country input"
          list="country-list"
          autoComplete="off"
        />
        <datalist id="country-list">
          {countries.map((country: string, i: number) => (
            <option value={country} key={i} />
          ))}
        </datalist>
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.country}
        </div>
      </div>
      {/* File */}
      <div className="mb-3">
        <label htmlFor="file" className="form-label">
          Image
        </label>
        <input className="form-control" type="file" id="file" ref={fileRef} />
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.file}
        </div>
      </div>
      {/* Terms and Services */}
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="terms"
          ref={termsRef}
        />
        <label className="form-check-label" htmlFor="terms">
          I agree with Terms and Services
        </label>
        <div className="text-danger small" style={{ minHeight: '1.25rem' }}>
          {errorMessages.terms}
        </div>
      </div>
      {/* Submit */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
