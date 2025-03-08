import React, { useState } from 'react';
import { FiCheck, FiClock, FiPlus, FiCalendar, FiTag, FiFilter, FiSearch, FiMessageSquare, FiUsers, FiBox, FiGrid, FiFolder, FiSettings } from 'react-icons/fi';

const LeftSidebar = () => (
  <div className="fixed top-0 left-0 h-full w-64 bg-[#1e2228] border-r border-gray-800 p-4">
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white px-4">Thapar</h2>
    </div>

    <nav className="space-y-2">
      <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
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

      <button className="w-full text-white text-left px-4 py-2 rounded-lg bg-gray-700 flex items-center space-x-3">
        <FiBox />
        <span>Tasks</span>
      </button>

      <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
        <FiGrid />
        <span>Integrations</span>
      </button>

      <div className="pt-4">
        <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
          <FiFolder />
          <span>Your content</span>
        </button>

        <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
          <FiFolder />
          <span>Your collections</span>
        </button>
      </div>
    </nav>

    <div className="absolute bottom-4 left-4 right-4">
      <button className="w-full text-white text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-3">
        <FiSettings />
        <span>Settings</span>
      </button>
    </div>
  </div>
);

const RightSidebar = () => (
  <div className="fixed top-0 right-0 h-full w-64 bg-[#1e2228] border-l border-gray-800 p-6">
    <div className="space-y-6">
      <div>
        <button className="w-full bg-[#2d3139] text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors">
          All tasks
        </button>
      </div>

      <div>
        <button className="w-full bg-[#2d3139] text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors flex items-center justify-between">
          <span>Create task</span>
          <span className="text-gray-400">⌘K</span>
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white">Created by me</h3>
        <div className="space-y-2">
          <button className="w-full text-white text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
            My recently used
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white">Categories</h3>
        <div className="space-y-2">
          {['Customer success', 'Customer Support', 'Emails', 'HR', 'Investments & Private Equity'].map(category => (
            <button 
              key={category}
              className="w-full text-white text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Review meeting notes', 
      status: 'pending', 
      time: '2h ago',
      dueDate: '2024-03-01',
      priority: 'high',
      category: 'Work'
    },
    // ... more tasks
  ]);

  const [showNewTask, setShowNewTask] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['Work', 'Personal', 'Study', 'Project'];
  const priorities = ['low', 'medium', 'high'];

  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'medium',
    category: 'Work'
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask.title,
          status: 'pending',
          time: 'Just now',
          dueDate: newTask.dueDate,
          priority: newTask.priority,
          category: newTask.category
        }
      ]);
      setNewTask({ title: '', dueDate: '', priority: 'medium', category: 'Work' });
      setShowNewTask(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    if (selectedCategory !== 'all') return task.category === selectedCategory;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#1a1d21]">
      <LeftSidebar />
      
      <div className="ml-64 mr-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2 text-white">Browse tasks</h1>
          <p className="text-gray-300">
            Discover and create premade tasks that combine multiple instructions
            and specific knowledge
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks"
            className="w-full bg-[#2d3139] rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className="bg-[#2d3139] rounded-xl p-6 hover:bg-gray-700/50 transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  {task.creator} · {task.usageCount}
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                  {task.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RightSidebar />
    </div>
  );
};

export default TasksPage; 