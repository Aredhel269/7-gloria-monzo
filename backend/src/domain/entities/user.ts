export class User {
    private _userId!: number;
    private _userName: string;
    private _displayName: string | undefined;
    private _password: string;
  
    constructor(userName: string, password: string, displayName?: string) {
      this._userName = userName;
      this._password = password;
      this._displayName = displayName;
    }
  
    get userId(): number {
      return this._userId;
    }
  
    get userName(): string {
      return this._userName;
    }
  
    get displayName(): string | undefined {
      return this._displayName;
    }
  
    get password(): string {
      return this._password;
    }
  }

export interface PrismaUser {
  userName: string
  displayName: string
  password: string
  rooms: any[]
}
