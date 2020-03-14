import bcrypt from "bcryptjs";

const create = async (plain: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);

  return await bcrypt.hash(plain, salt);
};

const check = async (plain: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(plain, hashed);
};

export default {
  create,
  check
};
