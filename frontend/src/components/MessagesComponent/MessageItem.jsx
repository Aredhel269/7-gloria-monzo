const MessageItem = ({ message }) => {
  return (
    <li className="message-item">
      <div className="message-text">{message.messageText}</div>
      <div className="message-info">
        <span className="message-user">{message.userName}</span>
      </div>
    </li>
  );
};

export default MessageItem;
