import { createContext, useContext, useEffect, useState } from 'react';

import { onSnapshot, collection} from 'firebase/firestore';
import {

  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { auth, db, storage } from '../../firebase-config';

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
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState({});

  const history = useHistory();

  useEffect(() => {
    const collectionRef = collection(db, 'rooms');
    onSnapshot(collectionRef, (snapshot) => {
      setChannels(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  //Messaging

  const [messages, setMessages] = useState('');
  const [typing, setTyping] = useState(false);

  const handleChange = (e) => {
    setMessages(e.target.value);
  };

  useEffect(() => {
    if (messages !== '') {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [messages]);

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

  const [url, setUrl] = useState('');

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

  const [progress, setProgress] = useState(0);

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handlerImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    uploadFiles(file);
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
      console.log(data.user);

      //This is to include displayName and PhotorUrl
      await updateProfile(data.user, {
        displayName: register.firstname,
        photoURL: url,
      });

      history.push('/');

      setRegister({
        email: '',
        password: '',
      });
      setUrl('');
    } catch (error) {
      errorChecker(error);
      console.log(error);
    } finally {
      setConfirmFields(true);
      setButtonLoader(false);
    }
  };

  // //using firestorage

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        console.log(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrl(downloadURL);
        });
      }
    );
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
        alert,
        typing,
        progress,
        setProgress,
        handlerImage,
        setMessages,
        // setRoomID,
        // loading,
        // sendMessage,
        // roomData,
        // roomDetails,
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
