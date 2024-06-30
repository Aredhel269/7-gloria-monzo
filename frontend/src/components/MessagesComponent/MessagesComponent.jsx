import React, { useEffect, useState } from "react";

function MessagesComponent({ roomName }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("[MessagesComponent][useEffect] Fetching messages for room:", roomName);

    fetch(`http://localhost:3000/api/messages/messagesroom/${roomName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("[MessagesComponent][useEffect] Received messages:", data);
        const messageText = data.map((message) => message._messageText);
        setMessages(messageText);
      })
      .catch((error) => {
        console.error("[MessagesComponent][useEffect] Error fetching messages:", error);
      });
  }, [roomName]); // Assegurem-nos que useEffect es torni a executar quan roomName canvia

  return (
    <div>
      <h3>Messages</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default MessagesComponent;

   /*  const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/messages/messagesroom/${roomName}`  
        );  
        if (!response.ok) {
          throw new Error(
            `Failed to fetch messages. Status: ${response.status}`
          );  
        }  
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }  
    };  

    fetchMessages();
  }, [roomName]);   

  if (loading) {
    return <p>Loading messages...</p>;
  }  

  if (error) {
    return <p>Error fetching messages: {error}</p>;
  }  
*/




