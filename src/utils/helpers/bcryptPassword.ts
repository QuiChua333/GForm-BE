import { genSalt, hash, compare } from 'bcrypt';

interface IBcryptParams {
  salt?: string | number;
  source: string;
}

interface IBcryptVerifyParams {
  plainTextPassword: string;
  hashedPassword: string;
}

function generateSalt(characterNumber = 10): Promise<string> {
  return genSalt(characterNumber);
}

async function generateWithBcrypt({
  salt,
  source,
}: IBcryptParams): Promise<string> {
  salt = salt || (await generateSalt());

  return hash(source, salt);
}

async function verifyWithBcrypt({
  plainTextPassword,
  hashedPassword,
}: IBcryptVerifyParams): Promise<boolean> {
  return compare(plainTextPassword, hashedPassword);
}

export default { generateWithBcrypt, verifyWithBcrypt };
