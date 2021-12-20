import { createContext, useContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  return (
    <ChatContext.Provider value={'Hello'}>{children}</ChatContext.Provider>
  );
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { useChatContext, ChatProvider };
