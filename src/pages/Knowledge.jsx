import React, { useState, useRef, useEffect } from 'react';
import { FiPaperclip, FiSend } from 'react-icons/fi';
import { sendMessage } from '../services/claudeService';

const Knowledge = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Add user message to chat
      const newMessage = { role: 'user', content: userMessage };
      setMessages(prev => [...prev, newMessage]);

      // Get response from Claude
      const response = await sendMessage(userMessage);
      
      // Add Claude's response to chat
      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);

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
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <h2 className="text-xl font-semibold mb-2">Knowledge Management</h2>
              <p className="text-sm">Ask anything about your knowledge base</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
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
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <form 
            onSubmit={handleSendMessage}
            className="bg-[#2d3139] rounded-lg shadow-lg flex items-center h-11 relative"
          >
            <div className="relative">
              <button 
                type="button"
                onClick={() => setIsUploadOpen(!isUploadOpen)}
                className="h-11 px-4 hover:bg-gray-700 transition-colors rounded-l-lg"
              >
                <FiPaperclip className="text-gray-400 hover:text-white" />
              </button>
              {isUploadOpen && (
                <div className="absolute bottom-12 left-0 bg-[#2d3139] rounded-lg shadow-lg p-2 w-56">
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-700 rounded text-sm">
                      Upload file
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-gray-700 rounded text-sm">
                      Upload folder
                    </button>
                  </div>
                </div>
              )}
            </div>

            <input 
              ref={inputRef}
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about your knowledge base" 
              className="flex-1 bg-transparent px-4 focus:outline-none text-sm h-full text-white placeholder-gray-400"
              disabled={isLoading}
            />

            <button 
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className={`h-11 px-4 transition-colors rounded-r-lg flex items-center justify-center min-w-[44px] ${
                isLoading || !inputMessage.trim() 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Knowledge; 