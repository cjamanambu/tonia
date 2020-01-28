export class LoginInput {

  constructor(
    public username: string,
    public passwordHash: string,
    public passwordSalt: string,
    public role: string
  ) {}
}
