import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Chat = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );
  const [messages, setMessages] = useState<
    { fromUser: string; message: string }[]
  >([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [toUser, setToUser] = useState('');

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5224/chathub')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected!');

          // Registruj korisnika sa korisničkim imenom
          if (user) {
            connection
              .invoke('RegisterUser', user)
              .catch((err) => console.error(err));
          }

          connection.on('ReceivePrivateMessage', (fromUser, message) => {
            setMessages((messages) => [...messages, { fromUser, message }]);
          });
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
  }, [connection, user]);

  const sendMessage = async () => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected &&
      message &&
      user &&
      toUser
    ) {
      try {
        await connection.invoke('SendPrivateMessage', user, toUser, message); // Slanje privatne poruke
        setMessage('');
      } catch (e) {
        console.log('Error sending message: ', e);
      }
    } else {
      console.log('Connection is not in the connected state.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Your username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Send to (username)"
        value={toUser}
        onChange={(e) => setToUser(e.target.value)}
      />
      <textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        <h2>Chat Messages</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.fromUser}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
