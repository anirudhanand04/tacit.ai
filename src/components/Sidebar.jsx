import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiSearch, FiUsers, FiBox, FiGrid, FiFolder, FiSettings, FiUser, FiShield, FiLogOut, FiMenu, FiX, FiFile, FiArchive, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import ProfileSettings from './ProfileSettings';
import ChatHistory from './ChatHistory';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([
    {
      title: "Greetings! How can I assist you...",
      timestamp: new Date(),
      messages: [] // Store actual chat messages here
    },
    {
      title: "Competitor Analysis Profile",
      timestamp: new Date(),
      messages: []
    },
    {
      title: "Document Summary Request",
      timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
      messages: []
    },
    {
      title: "Hello! How can I assist you tod...",
      timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
      messages: []
    }
  ]);

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleStartClick = (e) => {
    e.preventDefault();
    navigate('/dashboard', { replace: true });
  };

  const handleSignOut = () => {
    // Clear any stored user data/tokens if needed
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('chatHistory');
    
    // Close settings popup
    setIsSettingsOpen(false);
    
    // Navigate to landing page
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent('sidebarStateChange', {
        detail: { isOpen: !isSidebarOpen }
      })
    );
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 p-2 rounded-lg bg-gray-800 z-30 transition-all duration-300 ${
          isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        <FiMenu className="w-5 h-5 text-white" />
      </button>

      {/* Left Sidebar */}
      <div className={`fixed h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-64'
      } bg-[#1e2228] border-r border-gray-800 flex flex-col z-20`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white px-4">{userName}</h2>
            <button 
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={toggleSidebar}
            >
              <FiX className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content with custom scrollbar */}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600 scroll-smooth">
          <style jsx>{`
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: rgba(75, 85, 99, 0.5);
              border-radius: 3px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background-color: rgba(75, 85, 99, 0.8);
            }
            .scrollbar-thin {
              scrollbar-width: thin;
              scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
            }
            .scroll-smooth {
              scroll-behavior: smooth;
            }
          `}</style>

          <nav className="space-y-2">
            <button 
              onClick={handleStartClick}
              className={`w-full text-white text-left px-4 py-2 rounded-lg flex items-center space-x-3 transition-colors ${
                location.pathname === '/dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <FiMessageSquare />
              <span>Start</span>
            </button>

            <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
              <FiSearch />
              <span>Search</span>
            </button>

            <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
              <FiUsers />
              <span>Agents</span>
            </button>

            <Link 
              to="/tasks"
              className={`w-full text-white text-left px-4 py-2 rounded-lg flex items-center space-x-3 transition-colors ${
                location.pathname === '/tasks' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <FiBox />
              <span>Tasks</span>
            </Link>

            <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
              <FiGrid />
              <span>Integrations</span>
            </button>

            <div className="pt-4">
              <button 
                onClick={() => setIsContentOpen(!isContentOpen)}
                className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <FiFile className="w-4 h-4" />
                  <span>Your content</span>
                </div>
                {isContentOpen ? (
                  <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                ) : (
                  <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                )}
              </button>

              {isContentOpen && (
                <div className="mt-1 ml-4 space-y-1">
                  {/* Add your content items here */}
                </div>
              )}

              <div className="mt-2">
                <button 
                  onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                  className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <FiArchive className="w-4 h-4" />
                    <span>Your collections</span>
                  </div>
                  {isCollectionsOpen ? (
                    <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  ) : (
                    <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  )}
                </button>
                
                {isCollectionsOpen && (
                  <>
                    <div className="mx-4 my-2 border-t border-gray-700/50"></div>
                    
                    <div className="mt-2 ml-4">
                      <ChatHistory messages={chatHistory} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Settings - Fixed at bottom */}
        <div className="p-4 border-t border-gray-800 relative">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3"
          >
            <FiSettings />
            <span>Settings</span>
          </button>

          {/* Settings Popup */}
          {isSettingsOpen && (
            <div className="absolute bottom-full left-0 mb-2 bg-[#2d3139] rounded-lg shadow-lg w-56 p-2">
              <div className="space-y-1">
                <button 
                  onClick={() => {
                    setIsProfileOpen(true);
                    setIsSettingsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded flex items-center space-x-2 text-white"
                >
                  <FiUser className="text-gray-400" />
                  <span>Profile</span>
                </button>
                <Link 
                  to="/privacy-policy"
                  className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded flex items-center space-x-2 text-white"
                >
                  <FiShield className="text-gray-400" />
                  <span>Privacy Policy</span>
                </Link>
                <hr className="border-gray-700 my-2" />
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded flex items-center space-x-2 text-red-400"
                >
                  <FiLogOut className="text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Settings Modal */}
      <ProfileSettings 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSave={(newName) => setUserName(newName)}
      />

      {/* Click outside listeners */}
      {(isSettingsOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsSettingsOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Sidebar; 