import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(+process.env.SALT!);
  return bcrypt.hashSync(password, salt);
};

export default hashPassword;
