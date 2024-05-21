export class Room {
    private _roomId!: string;
    private _roomName: string;
  
    constructor(roomName: string) {
      this._roomName = roomName;
    }
  
    get roomId(): string {
      return this._roomId;
    }
  
    get roomName(): string {
      return this._roomName;
    }
  }
  