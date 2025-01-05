import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function ForgotPasswordButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate('/reset-password')}
      className="mt-4 w-full text-primary-400 hover:text-primary-500"
    >
      Passwort vergessen?
    </Button>
  );
}