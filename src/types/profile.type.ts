export type AddProfileParams = {
  authId: string;
  firstName: string;
  lastName: string;
  subName: string;
  birthday: Date;
  gender: string;
  avatar: string;
};

export type EditProfileParams = {
  firstName: string;
  lastName: string;
  subName: string;
  birthday: Date;
  gender: string;
  avatar: string;
};
