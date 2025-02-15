export const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
export const isValidPhone = (phone: string): boolean => /^(7|8)\d{10}$/.test(phone);