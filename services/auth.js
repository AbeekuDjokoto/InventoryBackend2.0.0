import bcrypt from "bcryptjs";

export const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return { hash, salt };
};

export const comparePassword = async (password, generated) => {
    const isValid = await bcrypt.compare(password, generated);
    return isValid;
}