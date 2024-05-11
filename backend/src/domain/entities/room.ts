export class Room {
    private _roomId!: number;
    private _roomName: string;
  
    constructor(roomName: string) {
      this._roomName = roomName;
    }
  
    get roomId(): number {
      return this._roomId;
    }
  
    get roomName(): string {
      return this._roomName;
    }
  }
  