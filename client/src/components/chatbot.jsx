import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ChatAltIcon } from '@heroicons/react/solid';
import ChatbotContext from './chatbotcontext';

const Chatbot = () => {
  const { messages, setMessages } = useContext(ChatbotContext);
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { from: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        prompt: userInput,
      });
      const botReply = response.data.reply;
      setMessages([...newMessages, { from: 'bot', text: botReply }]);
    } catch (error) {
      // Error handling with rate limiting
      if (error.response && error.response.status === 429) {
        setMessages([...newMessages, { from: 'bot', text: error.response.data }]);
      } 
      else {
          setMessages([...newMessages, { from: 'bot', text: 'Sorry, there was an error.' }]);
      }
    }
  };

  return (
    <div className="chatbot-container fixed bottom-4 right-4">
      <button onClick={toggleChat} className="chat-icon bg-cornflowerblue text-white p-4 rounded-full">
        <ChatAltIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {chatOpen && (
        <div className="chat-box bg-white shadow-lg rounded-lg p-4 max-w-lg w-full">
          <div className="chat-messages overflow-y-auto h-64 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.from === 'user' ? 'text-right' : 'text-left'}>
                {msg.from === 'user' ? (
                  <div className="bg-blue-100 text-gray-700 p-3 rounded-lg inline-block max-w-xs">
                    <p className="font-semibold">You:</p>
                    <p>{msg.text}</p>
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-700 p-3 rounded-lg inline-block max-w-xs">
                    <p className="font-semibold">BreezeBot:</p>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="chat-input mt-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-cornflowerblue focus:border-cornflowerblue"
              placeholder="Ask a question..."
            />
            <button onClick={handleSendMessage} className="bg-cornflowerblue text-white p-2 rounded-md mt-2">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
