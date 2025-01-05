import React from 'react';
import { Send } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface MessageInputProps {
  onSend: (message: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ihre Nachricht..."
        className="flex-1"
      />
      <Button type="submit" disabled={!message.trim()}>
        <Send className="w-4 h-4 mr-2" />
        Senden
      </Button>
    </form>
  );
}