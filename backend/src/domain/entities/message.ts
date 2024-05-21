export class Message {
    private _messageId!: string;
    private _messageText: string;
    private _userId: string;
    private _roomId: string;
  
    constructor(messageText: string, userId: string, roomId: string) {
      this._messageText = messageText;
      this._userId = userId;
      this._roomId = roomId;
    }
  
    get messageId(): string {
      return this._messageId;
    }
  
    get messageText(): string {
      return this._messageText;
    }
  
    get userId(): string {
      return this._userId;
    }
  
    get roomId(): string {
      return this._roomId;
    }
  }
  