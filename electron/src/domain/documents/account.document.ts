export class AccountDocument {
  constructor(
    public accountID: string,
    public accountType: string,
    public accountUsername: string,
    public passwordHash: string,
  ) {}
}
