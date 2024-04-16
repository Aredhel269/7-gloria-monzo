import React from 'react';
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <div className="message">
              <div className="message-sender">{message.sender}</div>
              <div className="message-content">{message.context}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

MessageList.PropTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default MessageList;
