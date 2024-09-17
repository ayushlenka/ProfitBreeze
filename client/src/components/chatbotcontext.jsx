import React, { createContext, useState, useEffect } from 'react';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem('chatbotMessages');
    return savedMessages ? JSON.parse(savedMessages) : [{ from: 'bot', text: "Hello, I'm BreezeBot! How can I assist you today?" }];
  });

  useEffect(() => {
    sessionStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <ChatbotContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotContext;
