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
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const collectionRef = collection(db, 'rooms');

  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState({});

  const history = useHistory();

  useEffect(() => {
    console.log(channels);
    const collectionRef = collection(db, 'rooms');
    onSnapshot(collectionRef, (snapshot) => {
      setChannels(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    console.log(channels);
  }, []);

  //Messaging

  const [messages, setMessages] = useState('');

  const handleChange = (e) => {
    setMessages(e.target.value);
  };

  //Auth

  const [alert, setAlert] = useState({
    type: false,
    msg: '',
  });

  const [confirmFields, setConfirmFields] = useState(false);

  const [buttonLoader, setButtonLoader] = useState(false);
  const [register, setRegister] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsers(currentUser);

      console.log(currentUser);
      // currentUser && dispatch(isLoggedIn(currentUser));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (login.email !== '' && login.password !== '') {
      setConfirmFields(false);
    } else {
      setConfirmFields(true);
    }
  }, [login.email, login.password]);

  //firebase Auth handling

  const errorChecker = ({ code }) => {
    if (code === 'auth/email-already-in-use') {
      setAlert({ type: true, msg: 'Email Already In Use' });
    } else if (code === 'auth/network-request-failed') {
      setAlert({ type: true, msg: 'Please Check Your Network Connection...' });
    } else if (code === 'auth/weak-password') {
      setAlert({
        type: true,
        msg: 'Password should be at least 6 characters',
      });
    } else if (code === 'auth/wrong-password') {
      setAlert({
        type: true,
        msg: 'Wrong Credentials',
      });
    } else if (code === 'auth/user-not-found') {
      setAlert({
        type: true,
        msg: "Account doesn't exist ",
      });
    }
  };
  // Register Button disable;
  useEffect(() => {
    if (
      register.email !== '' &&
      register.password !== '' &&
      register.firstname !== '' &&
      register.lastname
    ) {
      setConfirmFields(true);
    } else {
      setConfirmFields(false);
    }
  }, [
    register.email,
    register.firstname,
    register.lastname,
    register.password,
  ]);

  //Signup

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setButtonLoader(true);
    setConfirmFields(false);
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        register.email,
        register.password
      );

      console.log(data);

      //This is to include displayName and PhotorUrl
      await updateProfile(data.user, { displayName: register.firstname });

      history.push('/');

      setRegister({
        email: '',
        password: '',
      });
    } catch (error) {
      errorChecker(error);
      console.log(error);
    } finally {
      setConfirmFields(true);
      setButtonLoader(false);
    }
  };

  //Login

  useEffect(() => {
    if (login.email !== '' && login.password !== '') {
      setConfirmFields(true);
    } else {
      setConfirmFields(false);
    }
  }, [login.email, login.password]);

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setButtonLoader(true);
    setConfirmFields(false);
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);

      history.push('/');
    } catch (error) {
      errorChecker(error);
    } finally {
      setConfirmFields(true);
      setButtonLoader(false);
    }
  };

  const handleLogout = async () => {
    history.push('/Logout');

    // dispatch(isLoggedOut());
    await signOut(auth);
    // setUserDetails({});
    history.push('/login');
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
        confirmFields,
        users,
        register,
        login,
        handleSignup,
        handleChangeLogin,
        handleChangeRegister,
        handleLogout,
        handleLogin,
        buttonLoader,
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
