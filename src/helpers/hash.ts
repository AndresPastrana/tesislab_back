import { compare, hash, hashSync } from "bcrypt";
import { generate } from "generate-password";
const saltRounds = 10;
export const hashString = async (valueToHash: string): Promise<string> => {
  const bcryptHash = await hash(valueToHash, saltRounds);
  return bcryptHash;
};

export const compareHash = async (
  plainText: string,
  hashedData: string
): Promise<Boolean> => {
  const isTheSame = await compare(plainText, hashedData);
  return isTheSame;
};

//  TODO:Genearte secure hashed password
export const generateSecurePassword = () => {
  const stringPassword = generate({ length: 8, numbers: true, exclude: "@" });
  const hashedpassword = hashSync(stringPassword, 10);
  return { stringPassword, hashedpassword };
};
