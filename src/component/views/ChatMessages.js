import { db } from '../../firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

const ChatMessages = ({ messages }) => {
  return (
    <div>
      This are my Messages
      {messages.map((msg, index) => (
        <div className='flex gap-2' key={index}>
          <p>{msg.name}</p>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
