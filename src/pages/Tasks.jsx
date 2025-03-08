import React from 'react';
import { 
  FiCheckSquare, 
  FiCalendar, 
  FiClock, 
  FiStar 
} from 'react-icons/fi';

const Tasks = () => {
  return (
    <div className="flex h-screen bg-[#1a1d21]">
      {/* Left sidebar */}
      <div className="w-64 bg-[#1e2228] border-r border-gray-800">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Tasks</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <FiCheckSquare className="w-5 h-5 mr-3" />
                  All Tasks
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <FiCalendar className="w-5 h-5 mr-3" />
                  Today
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <FiClock className="w-5 h-5 mr-3" />
                  Upcoming
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <FiStar className="w-5 h-5 mr-3" />
                  Important
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-white mb-6">All Tasks</h1>
          {/* Add your tasks content here */}
          <div className="space-y-4">
            {/* Task items will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks; 