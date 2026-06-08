interface PasswordStrength {
  score: number;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const passwordStrength = (password: string): PasswordStrength => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const score = [hasLowerCase, hasUpperCase, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  return { score, hasLowerCase, hasUpperCase, hasNumber, hasSpecial };
};

export default passwordStrength;
