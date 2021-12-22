import React, { useState } from 'react';
import { useChatContext } from '../Context/ChatContext';

const ChatInput = ({ sendMessage }) => {
  const { message, handleChange } = useChatContext();

  return (
    <div>
      <form
        onSubmit={sendMessage}
        className='border flex overflow-hidden rounded-xl'
      >
        <input
          type='text'
          value={message}
          onChange={handleChange}
          className='w-10/12 border-none'
        />

        <button className='w-2/12'>Send</button>
      </form>
    </div>
  );
};

export default ChatInput;
