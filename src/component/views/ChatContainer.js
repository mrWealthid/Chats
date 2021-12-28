import React, { useEffect, useState, useRef } from 'react';

import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { doc, onSnapshot, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useChatContext } from '../Context/ChatContext';

const ChatContainer = () => {
  const { roomId } = useParams();

  const chatRef = useRef(null);
  const MessageRef = useRef(null);
  const { messages, users, setMessages } = useChatContext();

  // const [roomId, setroomId] = useState('');
  // const [roomData, setRoomData] = useState({
  //   details: '',
  //   messages: [],
  // });

  // useEffect(() => {
  //   if (chatRef.current) {
  //     const Navs = chatRef.current.getBoundingClientRect();
  //     console.log(Navs);
  //   }
  // }, [chatRef.current]);

  const [roomDetails, setRoomDetails] = useState('');

  const [roomData, setRoomData] = useState([]);

  const [loading, setLoading] = useState(false);

  // const collectionsRef = collection(db, 'rooms');

  // const docRef = doc(db, 'rooms', roomId);

  useEffect(() => {
    const element = chatRef.current.getBoundingClientRect();

    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    // console.log(
    //   'height/width viewport',
    //   document.documentElement.clientHeight,
    //   document.documentElement.clientWidth
    // );

    window.scrollTo({
      left: element.left + window.pageXOffset,
      top: element.top + window.pageYOffset,
      behavior: 'smooth',
    });
  }, [roomId, roomData, loading]);

  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // useEffect(() => {
  //   // window.scrollTo(0, 0);

  //   // window.scrollIntoView();
  //   chatRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //   });
  // }, [roomId, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      console.log(messages);
      const docRef = doc(db, 'rooms', roomId);

      const newObj = {
        name: users.displayName,
        userId: users.uid,
        photoURL: users.photoURL,
        message: messages,
        timeStamp: new Date().toISOString(),
        messageId: Date.now(),
      };

      const newMessage = [...roomData, newObj];

      await updateDoc(docRef, {
        messages: newMessage,
      });

      setMessages('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!roomId) return false;

        setLoading(true);

        // const docRef = doc(db, 'rooms', roomId);

        // const docSnap = await getDoc(docRef);

        onSnapshot(doc(db, 'rooms', roomId), (doc) => {
          setRoomData(doc.data()?.messages);
          setRoomDetails(doc.data().name);
        });

        // if (docSnap.exists()) console.log(docSnap.data());

        // setRoomData({
        //   messages: [...roomData.messages, messages],
        // });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [roomId]);

  return (
    <section
      className='w-full flex-col mb-6  flex px-3 min-h-screen '
      ref={MessageRef}
    >
      <div className='flex-1 mb-6 '>
        <p className='p-2  border border-gray-400 text-white rounded-lg '>
          # {!roomId && roomDetails ? 'Channels' : roomDetails}
        </p>

        {loading
          ? '...Loading'
          : roomData.map((msg, index) => (
              <ChatMessages msg={msg} loading={loading} key={index} />
            ))}
        <div ref={chatRef}></div>
      </div>

      <div>
        <ChatInput sendMessage={sendMessage} roomDetails={roomDetails} />
      </div>
    </section>
  );
};

export default ChatContainer;
