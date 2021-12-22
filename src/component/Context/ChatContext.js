import { createContext, useContext, useEffect, useState } from 'react';

import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';

import { auth, db } from '../../firebase-config';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const collectionRef = collection(db, 'rooms');

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    console.log(channels);
    const collectionRef = collection(db, 'rooms');
    onSnapshot(collectionRef, (snapshot) => {
      setChannels(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    console.log(channels);
  }, []);

  // collectionRef.doc

  const [messages, setMessages] = useState('');

  const handleChange = (e) => {
    setMessages(e.target.value);
  };

  //   addDoc(colRef, {
  //     title: addBookForm.title.value,
  //     author: addBookForm.author.value,
  //     createdAt: serverTimestamp(),
  //   }).then(() => {
  //     addBookForm.reset();
  //   });
  // });

  //   useEffect(() => {
  //     onSnapshot(collection(db, 'Rooms'), (snapshot) => {
  //       console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  //   }, []);
  return (
    <ChatContext.Provider
      value={{
        channels,
        messages,
        // setRoomId,
        // sendMessage,
        handleChange,
        // setRoomData,
        // roomData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { useChatContext, ChatProvider };
