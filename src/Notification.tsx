/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';

function NotificationComponent() {
  const [messages, setMessages] = useState<any[]>([]);
  const websocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a WebSocket connection.
    websocketRef.current = new WebSocket('ws://localhost:8080/ws');

    // When a message is received from the server, update the state.
    websocketRef.current.onmessage = (event) => {
      const messageData = event.data;
      setMessages(prevMessages => [...prevMessages, messageData]);
    };

    // Handle any errors that occur.
    websocketRef.current.onerror = (error) => {
      console.log(`WebSocket Error: ${error}`);
    };

    // Cleanup the WebSocket connection when the component is unmounted.
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  return (
    <div className=''>
      <h2>Notifications</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationComponent;

       
