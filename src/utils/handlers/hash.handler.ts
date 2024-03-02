import * as Argon from 'argon2';

export const hashHandler = {
  generate: async (value: string | Buffer) => {
    try {
      const hashedValue = await Argon.hash(value);
      return hashedValue;
    } catch (error) {
      return error;
    }
  },
  verify: async (hashValue: string, plainValue: string | Buffer) => {
    try {
      const verifiedValue = await Argon.verify(hashValue, plainValue);
      return verifiedValue;
    } catch (error) {
      return error;
    }
  },
};
