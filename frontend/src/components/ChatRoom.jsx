import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ChatRoom({ socket, userName }) {
  const { roomId } = useParams(); // Obtenim el roomId des de l'URL
  const [message, setMessage] = useState(""); // Estat per al missatge actual
  const [messages, setMessages] = useState([]); // Estat per a la llista de missatges
  const [participants, setParticipants] = useState([]); // Estat per a la llista de participants
  const [isWriting, setIsWriting] = useState(false); // Estat per a la notificació d'escriptura

  // Ús de useEffect per unir-se a la sala i configurar els esdeveniments del socket
  useEffect(() => {
    // Enviar esdeveniment per unir-se a la sala
    socket.emit("joinRoom", { roomName: roomId, userName });

    // Rebre missatges nous i actualitzar l'estat dels missatges
    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Rebre missatges existents i actualitzar l'estat dels missatges
    socket.on("existingMessages", (existingMessages) => {
      setMessages(existingMessages);
    });

    // Rebre notificacions d'escriptura i actualitzar l'estat
    socket.on("userWriting", (data) => {
      if (data.userName !== userName) {
        setIsWriting(true);
        setTimeout(() => setIsWriting(false), 3000); // Notificació durant 3 segons
      }
    });

    // Rebre llista de participants i actualitzar l'estat
    socket.on("updateParticipants", (roomParticipants) => {
      setParticipants(roomParticipants);
    });

    // Cleanup dels esdeveniments del socket quan el component es desmunta
    return () => {
      socket.off("chatMessage");
      socket.off("existingMessages");
      socket.off("userWriting");
      socket.off("updateParticipants");
    };
  }, [roomId, socket, userName]); // Només tornar a executar si roomId, socket o userName canvien

  // Funció per enviar un missatge
  const sendMessage = () => {
    if (message !== "") {
      socket.emit("chatMessage", {
        room: roomId,
        message,
        userName,
      });
      setMessage(""); // Reiniciar el missatge després d'enviar-lo
    }
  };

  // Funció per manejar l'esdeveniment d'escriptura
  const handleTyping = (e) => {
    if (e.key === "Enter") {
      sendMessage(); // Enviar missatge quan es prem Enter
    } else {
      socket.emit("userTyping", { roomName: roomId, userName });
    }
  };

  return (
    <div className="chatroom-container">
      {/* Capçalera de la sala de xat */}
      <div className="header">
        <h2>Room: {roomId}</h2>
        <button onClick={() => socket.emit("leaveRoom", { roomName: roomId, userName })}>
          Leave Room
        </button>
      </div>
      {/* Àrea principal de xat */}
      <div className="main-chat-area">
        <div className="chat-area">
          {/* Mostra tots els missatges */}
          {messages.map((msg, index) => (
            <p key={index}>
              <b>{msg.userName}:</b> {msg.message}
            </p>
          ))}
        </div>
        {/* Notificació d'escriptura */}
        {isWriting && <div className="writing-notification">{`<<${userName}>> is writing...`}</div>}
        {/* Àrea d'entrada de missatges */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping} // Utilitzar onKeyDown per a l'escriptura
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
      {/* Barra lateral amb la llista de participants */}
      <div className="sidebar">
        <h3>Participants</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatRoom;
