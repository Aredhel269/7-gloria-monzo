export class User {
  private _userId: string;
  private _userName: string;
  private _password: string;
  rooms: string[] = []; // Llista de sales de xat a les quals pertany l'usuari

  constructor(userName: string, password: string, userId?: string) {
    this._userId = userId || '';
    this._userName = userName;
    this._password = password;
  }

  get userId(): string {
    return this._userId;
  }

  get userName(): string {
    return this._userName;
  }

  get password(): string {
    return this._password;
  }

  // Mètode per afegir una sala de xat a les sales de l'usuari
  addRoom(roomId: string) {
    this.rooms.push(roomId);
  }

  // Mètode per eliminar una sala de xat de les sales de l'usuari
  removeRoom(roomId: string) {
    this.rooms = this.rooms.filter(room => room !== roomId);
  }
}
