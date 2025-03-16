export interface loginType {
  email: string;
  password: string;
}

export interface addAdminType {
  email: string;
  password: string;
  phone: string;
  name: string;
}

export interface resetPassword {
  newPassword: string;
  token: string;
}
