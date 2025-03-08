import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiSettings, FiChevronDown, FiUser, FiShield, FiLogOut, FiPaperclip, FiSend, FiCheck, FiClock, FiPlus, FiX, FiGlobe, FiFilter, FiAlertCircle } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { sendMessage } from '../services/claudeService';
import teamImage from '../assets/team-grid.jpeg';
import { API_CONFIG } from '@/config/api';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review meeting notes', status: 'pending', time: '2h ago' },
    { id: 2, title: 'Summarize quarterly report', status: 'completed', time: '1d ago' },
    { id: 3, title: 'Prepare presentation slides', status: 'pending', time: '3h ago' },
  ]);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const newTaskRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [askQuery, setAskQuery] = useState('');

  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (e) => {
      if (e.detail) {
        setIsSidebarOpen(e.detail.isOpen);
      }
    };

    window.addEventListener('sidebarStateChange', handleSidebarChange);
    return () => window.removeEventListener('sidebarStateChange', handleSidebarChange);
  }, []);

  const handleConnectCalendar = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = window.location.origin + '/dashboard';
    
    const scope = 'https://www.googleapis.com/auth/calendar.readonly';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scope}&access_type=offline&prompt=consent`;
    
    window.location.href = authUrl;
  };

  const handleSignOut = () => {
    // Clear all auth tokens
    localStorage.removeItem('googleToken');
    
    // Clear any other user data if needed
    // localStorage.clear(); // Use this if you want to clear everything
    
    // Redirect to landing page
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      // Decode the JWT token to get email
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.email;
      // Extract name from email (everything before @)
      const name = email.split('@')[0]
        // Convert to title case and remove numbers/special chars
        .replace(/[0-9_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (showNewTask) {
      newTaskRef.current?.focus();
    }
  }, [showNewTask]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      status: 'pending',
      time: 'Just now'
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setShowNewTask(false);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create new chat ID
      const chatId = Date.now().toString();
      
      // Get response from Claude
      const response = await sendMessage(userMessage);

      // Create new chat with both messages
      const newChat = {
        id: chatId,
        title: userMessage.slice(0, 25) + (userMessage.length > 25 ? "..." : ""),
        timestamp: new Date(),
        messages: [
          { role: 'user', content: userMessage },
          { role: 'assistant', content: response }
        ]
      };

      // Update chat history
      const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      history.unshift(newChat);
      localStorage.setItem('chatHistory', JSON.stringify(history));

      // Navigate to new chat page
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error('Failed to get response:', error);
      setIsLoading(false);
      setInputMessage(userMessage); // Restore the message in case of error
      setError('Failed to send message. Please try again.');
    }
  };

  const handleAskSubmit = async (e) => {
    e.preventDefault();
    if (!askQuery.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AI_ENDPOINT}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({
          message: askQuery,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      const data = await response.json();
      console.log('Response:', data);
      setAskQuery('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const SettingsPopup = () => (
    <div 
      className={`absolute bottom-16 left-4 bg-[#1e2228] rounded-lg shadow-lg w-64 p-2 transform transition-all duration-200 ${
        isSettingsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <div className="space-y-1">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left">
          <FiUser className="text-gray-400" />
          <span>Profile</span>
        </button>
        
        <Link 
          to="/privacy-policy"
          className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left"
        >
          <FiShield className="text-gray-400" />
          <span>Privacy Policy</span>
        </Link>

        <hr className="border-gray-700 my-2" />
        
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left text-red-400"
        >
          <FiLogOut className="text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  const FileUploadPopup = () => (
    <div 
      className={`absolute bottom-12 left-0 bg-[#2d3139] rounded-lg shadow-lg p-2 transform transition-all duration-200 w-56 ${
        isUploadOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <div className="space-y-1">
        <button className="w-full text-left px-3 py-1.5 hover:bg-gray-700 rounded text-sm">
          Upload file
        </button>
        <button className="w-full text-left px-3 py-1.5 hover:bg-gray-700 rounded text-sm">
          Upload folder
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#1a1d21] text-white">
      {/* Toggle button for closed sidebar */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed top-4 left-4 p-2 rounded-full bg-gray-800 z-30 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        <div className="w-5 h-5 flex items-center justify-center">≡</div>
      </button>

      {/* Add click outside listener */}
      {isSettingsOpen && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Main content wrapper with proper padding */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-64' : 'ml-2'
      }`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-6">
              <span className="text-blue-400">Your Assistant</span>
              <span>Browse Agents</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Demo</span>
              <Link 
                to="/knowledge" 
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Knowledge Management
              </Link>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-700 rounded-full">Invite</button>
              <button className="px-4 py-2 bg-gray-700 rounded-full">Help</button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Meeting Card */}
            <div className="bg-[#1e2228] p-6 rounded-xl">
              <div className="mb-4">
                <img 
                  src={teamImage} 
                  alt="Team members grid" 
                  className="rounded-lg w-[450px] h-auto object-cover"
                />
              </div>
              <div className="mb-6 max-w-sm">
                <h2 className="text-lg font-medium mb-1.5">Unlock automatic meeting summaries</h2>
                <p className="text-xs text-gray-400 mb-3">Connect calendars and get summaries you can talk to.</p>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleConnectCalendar}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
                  >
                    Connect Calendar
                  </button>
                  <button className="text-xs text-gray-400 hover:text-white transition-colors font-medium">
                    View Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Tasks Card */}
            <div className="bg-[#1e2228] p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Tasks</h3>
                <button 
                  onClick={() => setShowNewTask(true)}
                  className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FiPlus className="text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* New Task Input */}
              {showNewTask && (
                <form 
                  onSubmit={handleAddTask}
                  className="mb-3"
                >
                  <div className="flex items-center bg-[#2d3139] rounded-lg overflow-hidden">
                    <input
                      ref={newTaskRef}
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title..."
                      className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none text-white placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewTask(false);
                        setNewTaskTitle('');
                      }}
                      className="p-3 hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Tasks List */}
              <div className="space-y-3">
                {tasks.map(task => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between group bg-[#2d3139] rounded-lg p-3 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`p-1 rounded-md transition-colors ${
                          task.status === 'completed' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <span className={`text-sm ${
                        task.status === 'completed' ? 'text-gray-500 line-through' : ''
                      }`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <FiClock className="w-3 h-3" />
                      <span>{task.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Card */}
            <div className="bg-[#1e2228] p-6 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <FiSearch className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search all tabs" 
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
              <h3 className="text-gray-400 mt-4">Recent</h3>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-2xl rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600'
                    : message.role === 'error'
                    ? 'bg-red-500'
                    : 'bg-[#2d3139]'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-4 left-72 right-24">
          <div className="max-w-4xl">
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
                placeholder="Ask anything, use @ to tag files and collections" 
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

      {/* Click outside listener for upload menu */}
      {isUploadOpen && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setIsUploadOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard; 