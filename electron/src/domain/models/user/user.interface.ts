export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: string;
  type: string;
  isRegistered: boolean; // @TODO might not be necessary since we can just check if login ID is null
  loginID: string;
}
