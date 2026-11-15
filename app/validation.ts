export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  businessName: string;
};

export function validateLoginForm(values: LoginFormValues) {
  const errors: Partial<Record<keyof LoginFormValues, string>> = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password || values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateRegisterForm(values: RegisterFormValues) {
  const errors: Partial<Record<keyof RegisterFormValues, string>> = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password || values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}
