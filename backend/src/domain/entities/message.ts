export class Message {
    private _messageId!: number;
    private _messageText: string;
    private _userId: number;
    private _roomId: number;
  
    constructor(messageText: string, userId: number, roomId: number) {
      this._messageText = messageText;
      this._userId = userId;
      this._roomId = roomId;
    }
  
    get messageId(): number {
      return this._messageId;
    }
  
    get messageText(): string {
      return this._messageText;
    }
  
    get userId(): number {
      return this._userId;
    }
  
    get roomId(): number {
      return this._roomId;
    }
  }
  