import React, { useEffect, useState } from 'react';
import SignalRService from '../services/signalRService';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    SignalRService.startConnection();

    // Subscribe to receiving messages
    SignalRService.connection.on('ReceiveMessage', (user, message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user, message },
      ]);
    });
  }, []);

  const handleSendMessage = () => {
    SignalRService.sendMessage(user, message);
    setMessage('');
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter your username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong>{msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
