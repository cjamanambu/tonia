export class LoginInput {
  constructor(
    public email: string,
    public passwordHash: string,
    public passwordSalt: string,
    public role: string,
    public userID: string
  ) {}
}
