import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  query: string;
  response: string;
  timestamp: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ query, response, timestamp }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-gray-800">{query}</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>
      
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
          <Bot className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="prose prose-sm">
            {response.split('\n').map((line, i) => (
              <p key={i} className="text-gray-800">{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};