import bcrypt from "bcrypt";

const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export default comparePassword;
