import MessageItem from "../MessagesComponent/MessageItem";

const MessageList = ({ messages }) => {
  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </ul>
  );
};

export default MessageList;
