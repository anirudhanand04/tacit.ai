import React, { useState } from 'react';
import { FiX, FiTrash2, FiLogOut } from 'react-icons/fi';

const ProfileSettings = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: 'ANIRUDH ANAND',
    email: 'aanand1_be19@thapar.edu',
    industry: 'Technology & Engineering',
    about: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData.name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e2228] rounded-xl w-full max-w-xl max-h-[90vh] flex flex-col relative">
        {/* Header - Fixed */}
        <div className="flex items-start justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Your profile</h2>
            <p className="text-gray-400 text-sm">Manage your personal information</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors text-white"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#2d3139] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#2d3139] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-[#2d3139] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">About you</label>
              <textarea
                placeholder="Relevant information about yourself, like your experience and interests"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                rows={4}
                className="w-full bg-[#2d3139] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <p className="text-sm text-gray-400">
              We'll use this data to personalize your experience.
            </p>
          </form>

          {/* Danger Zone */}
          <div className="space-y-4 pt-6 border-t border-gray-800">
            <h3 className="text-lg font-medium text-white">More Options</h3>
            
            <button className="w-full text-left px-4 py-3 rounded-lg bg-[#2d3139] hover:bg-gray-700 transition-colors flex items-center space-x-3">
              <FiLogOut className="text-red-400" />
              <span className="text-red-400">Leave workspace</span>
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-lg bg-[#2d3139] hover:bg-gray-700 transition-colors flex items-center space-x-3">
              <FiTrash2 className="text-red-400" />
              <span className="text-red-400">Delete account</span>
            </button>
          </div>

          {/* Export Option */}
          <div className="pt-6 border-t border-gray-800">
            <button className="text-gray-400 hover:text-white transition-colors">
              Export account data
            </button>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="border-t border-gray-800 p-6">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings; 