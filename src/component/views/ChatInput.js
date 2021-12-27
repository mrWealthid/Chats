import React from 'react';
import { useChatContext } from '../Context/ChatContext';

const ChatInput = ({ sendMessage, roomDetails }) => {
  const { messages, handleChange, typing, users } = useChatContext();

  return (
    <div>
      {typing && (
        <p className='text-gray-300 text-xs'>
          {users.displayName} is typing{' '}
          <span className='animate-ping'>...</span>
        </p>
      )}
      <form
        onSubmit={sendMessage}
        className='border flex overflow-hidden rounded-xl'
      >
        <input
          type='text'
          value={messages}
          onChange={handleChange}
          className='w-10/12 border-none '
          placeholder={`Send Message to ${roomDetails}`}
        />

        <button className='w-2/12'>Send</button>
      </form>
    </div>
  );
};

export default ChatInput;
