export class User {
  constructor(
    public name: string,
    public email: string,
    private _token: string,
    private _expiresIn: Date
  ) {}
  get getToken() {
    if (!this._expiresIn || this._expiresIn < new Date()) {
      return null;
    }
    return this._token;
  }
}
