import React, { useEffect, useState } from 'react';
import { getRecipe } from '../utils/helpers';

import DisplayContent from './DisplayContent';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import {
  getDoc,
  doc,
  onSnapshot,
  collection,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useChatContext } from '../Context/ChatContext';

const ChatContainer = () => {
  const { roomId } = useParams();

  const { messages } = useChatContext();

  // const [roomId, setRoomId] = useState('');
  // const [roomData, setRoomData] = useState({
  //   details: '',
  //   messages: [],
  // });

  const [roomDetails, setRoomDetails] = useState('');

  const [roomData, setRoomData] = useState([]);

  // const collectionsRef = collection(db, 'rooms');

  // const docRef = doc(db, 'rooms', roomId);
  useEffect(() => {
    (async () => {
      try {
        if (!roomId) return false;
        const docRef = doc(db, 'rooms', roomId);

        const docSnap = await getDoc(docRef);

        const unsub = onSnapshot(doc(db, 'rooms', roomId), (doc) => {
          setRoomData(doc.data().messages);
          setRoomDetails(doc.data().name);
        });

        // if (docSnap.exists()) console.log(docSnap.data());

        // setRoomData({
        //   messages: [...roomData.messages, messages],
        // });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    console.log(messages);
    const docRef = doc(db, 'rooms', roomId);

    const newObj = { name: 'Wealth', message: messages };

    const newMessage = [...roomData, newObj];

    updateDoc(docRef, {
      messages: newMessage,
    });
  };

  return (
    <div className='w-full flex-col  flex px-3 min-h-screen'>
      <div className='flex-1'>
        <p className='p-2 bg-gray-500 text-white'>
          Chat Container-{roomDetails}
        </p>

        <ChatMessages messages={roomData} />
      </div>
      <div>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
