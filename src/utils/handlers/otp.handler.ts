import * as Speakeasy from 'speakeasy';

export const otpHandler = {
  generate: (secret: string) => {
    const otp = Speakeasy.totp({
      secret,
      algorithm: 'sha512',
      encoding: 'base64',
      step: 300, // 5 Minutes
    });
    return otp;
  },
  verify: (secret: string, otp: string) => {
    const verifiedResult = Speakeasy.totp.verify({
      secret,
      token: otp,
      algorithm: 'sha512',
      encoding: 'base64',
      step: 300,
    });
    return verifiedResult;
  },
};
