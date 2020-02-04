export interface ILogin {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  role: string;
  userID: string;
}
