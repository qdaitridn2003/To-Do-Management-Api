import { StrategyEnum } from 'src/commons';

export type RegisterAccountParams = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type LoginAccountParams = {
  username: string;
  password: string;
};

export type AccountInfo = {
  firstName: string;
  lastName: string;
  subName: string;
  email: string;
  provider: StrategyEnum;
  avatar: string;
};

export type ResetPasswordParams = RegisterAccountParams;

export type ChangePasswordParams = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type SetPasswordParams = {
  password: string;
  confirmPassword: string;
};
