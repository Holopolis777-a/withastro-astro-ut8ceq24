import React from 'react';
import { formatDate } from '../../../utils/dateUtils';
import type { Message } from '../../../types/message';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.fromUser
              ? 'bg-primary-50 ml-12'
              : 'bg-gray-50 mr-12'
          }`}
        >
          <p className="text-gray-900">{message.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatDate(message.timestamp)}
          </p>
        </div>
      ))}
    </div>
  );
}