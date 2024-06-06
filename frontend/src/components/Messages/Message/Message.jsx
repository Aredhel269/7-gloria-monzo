import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, sender }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = trimmedName === sender.toLowerCase(); // Use sender in lowercase

  return (
    <div className={`messageContainer ${isSentByCurrentUser ? 'justifyEnd' : 'justifyStart'}`}>
      {isSentByCurrentUser ? (
        <>
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </>
      ) : (
        <>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10">{sender}</p>
        </>
      )}
    </div>
  );
};

export default Message;
