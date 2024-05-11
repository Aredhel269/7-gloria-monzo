export class Message {
    private _messageId!: number;
    private _message: string;
    private _userId: number;
    private _roomId: number;
  
    constructor(message: string, userId: number, roomId: number) {
      this._message = message;
      this._userId = userId;
      this._roomId = roomId;
    }
  
    get messageId(): number {
      return this._messageId;
    }
  
    get message(): string {
      return this._message;
    }
  
    get userId(): number {
      return this._userId;
    }
  
    get roomId(): number {
      return this._roomId;
    }
  }
  