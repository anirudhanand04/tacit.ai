import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const ChatHistory = ({ messages }) => {
  const navigate = useNavigate();

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = format(new Date(message.timestamp), 'PP'); // e.g., "Today", "2 months ago"
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date} className="space-y-1">
          <h3 className="text-xs text-gray-400 px-4">{date}</h3>
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => navigate(`/chat/${message.id}`)}
              className="w-full text-left px-4 py-1.5 hover:bg-gray-700 rounded-lg transition-colors text-xs text-gray-300"
            >
              {message.title}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory; 