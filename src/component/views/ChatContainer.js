import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { doc, onSnapshot, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useChatContext } from '../Context/ChatContext';

const ChatContainer = () => {
  const { roomId } = useParams();

  const {
    messages,
    users,
    setMessages,
    loading,
    sendMessage,
    roomData,
    roomDetails,
    setRoomID,
  } = useChatContext();

  // const [roomId, setRoomId] = useState('');
  // const [roomData, setRoomData] = useState({
  //   details: '',
  //   messages: [],
  // });

  useEffect(() => {
    if (!roomId) return;
    setRoomID(roomId);
  }, [roomId, setRoomID]);
  return (
    <div className='w-full flex-col   flex px-3 min-h-screen '>
      <div className='flex-1'>
        <p className='p-2  border border-gray-400 text-white rounded-lg'>
          # {!roomId ? 'Channels' : roomDetails}
        </p>

        <ChatMessages messages={roomData} loading={loading} />
      </div>
      <div>
        <ChatInput sendMessage={sendMessage} roomDetails={roomDetails} />
      </div>
    </div>
  );
};

export default ChatContainer;
