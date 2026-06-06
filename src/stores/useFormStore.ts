import { create } from 'zustand';
import { COUNTRY_LIST } from '../constants/countryList';
import { type FormData } from '../validation/formSchema';

export interface FormSubmission {
  id: number;
  submittedAt: Date;
  data: Omit<FormData, 'password' | 'confirmPassword' | 'image'> & {
    image: string;
  };
}

interface FormState {
  submissions: FormSubmission[];
  countries: string[];
  addSubmission: (submission: FormSubmission) => void;
}

const useFormStore = create<FormState>((set) => ({
  submissions: [],
  countries: COUNTRY_LIST,
  addSubmission: (submission) =>
    set((state) => ({ submissions: [...state.submissions, submission] })),
}));

export default useFormStore;
