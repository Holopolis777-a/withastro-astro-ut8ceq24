import React from 'react';
import { Mail } from 'lucide-react';
import { useMessageStore } from '../../store/messageStore';
import { MessageInput } from './components/MessageInput';
import { MessageList } from './components/MessageList';

export default function Messages() {
  const { messages, sendMessage, fetchMessages, loading } = useMessageStore();

  React.useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary-400 rounded-xl">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Nachrichten</h1>
          <p className="text-gray-500">Ihre Kommunikation mit unserem Team</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-4">Lädt...</div>
          ) : (
            <MessageList messages={messages} />
          )}
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}