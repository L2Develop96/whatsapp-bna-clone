export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  return emailRegex.test(email);
};

export const isValidPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};
