import React from 'react';
import { Plus } from 'lucide-react';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';

interface CustomFeatureInputProps {
  onAddFeature: (feature: string) => void;
}

export function CustomFeatureInput({ onAddFeature }: CustomFeatureInputProps) {
  const [newFeature, setNewFeature] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeature.trim()) return;
    
    onAddFeature(newFeature.trim());
    setNewFeature('');
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Zusätzliche Ausstattung eingeben..."
        value={newFeature}
        onChange={(e) => setNewFeature(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="button" 
        disabled={!newFeature.trim()}
        onClick={handleSubmit}
      >
        <Plus className="w-4 h-4 mr-2" />
        Hinzufügen
      </Button>
    </div>
  );
}