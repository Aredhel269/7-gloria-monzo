export class Message {
    private _messageId!: string;
    private _messageText: string;
    private _userId: string;
    private _roomName: string;
  
    constructor(messageText: string, userId: string, _roomName: string) {
      this._messageText = messageText;
      this._userId = userId;
      this._roomName = _roomName;
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
  
    get roomName(): string {
      return this._roomName;
    }
  }
  