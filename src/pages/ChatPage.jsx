import React, { useState, useRef, useEffect } from 'react';
import { FiPaperclip, FiSend } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { sendMessage } from '../services/claudeService';

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const chat = history.find(chat => chat.id === chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  }, [chatId]);

  // Auto scroll and focus
  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      const newMessage = { role: 'user', content: userMessage };
      setMessages(prev => [...prev, newMessage]);

      const response = await sendMessage(userMessage);
      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);

      // Update chat history
      const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      const chatIndex = history.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        history[chatIndex].messages = [...messages, newMessage, assistantMessage];
        localStorage.setItem('chatHistory', JSON.stringify(history));
      }
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages(prev => [...prev, { 
        role: 'error', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1d21] text-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.role === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-[#2d3139] text-gray-100'
              }`}
            >
              <div className="prose prose-invert">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <form 
            onSubmit={handleSendMessage}
            className="bg-[#2d3139] rounded-lg shadow-lg flex items-center h-11 relative"
          >
            {/* ... existing input form code ... */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 