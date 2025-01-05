/*
  # Ticketsystem Schema

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `status` (enum)
      - `priority` (enum)
      - `created_by` (uuid, references auth.users)
      - `assigned_to` (uuid, references auth.users, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `ticket_messages`
      - `id` (uuid, primary key)
      - `ticket_id` (uuid, references tickets)
      - `user_id` (uuid, references auth.users)
      - `message` (text)
      - `created_at` (timestamptz)
      - `is_internal` (boolean)

  2. Security
    - Enable RLS on all tables
    - Add policies for user and admin access
*/

-- Create ticket status enum
CREATE TYPE ticket_status AS ENUM (
  'open',
  'in_progress',
  'waiting_for_response',
  'resolved',
  'closed'
);

-- Create ticket priority enum
CREATE TYPE ticket_priority AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
);

-- Create tickets table
CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  status ticket_status NOT NULL DEFAULT 'open',
  priority ticket_priority NOT NULL DEFAULT 'medium',
  created_by uuid NOT NULL REFERENCES auth.users(id),
  assigned_to uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create ticket messages table
CREATE TABLE ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_internal boolean NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for tickets table
CREATE POLICY "Users can view their own tickets"
  ON tickets
  FOR SELECT
  USING (created_by = auth.uid());

CREATE POLICY "Admins can view all tickets"
  ON tickets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Users can create tickets"
  ON tickets
  FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Admins can update any ticket"
  ON tickets
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create policies for ticket messages table
CREATE POLICY "Users can view messages for their tickets"
  ON ticket_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tickets
      WHERE tickets.id = ticket_id
      AND (tickets.created_by = auth.uid() OR NOT is_internal)
    )
  );

CREATE POLICY "Admins can view all messages"
  ON ticket_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Users can create messages for their tickets"
  ON ticket_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tickets
      WHERE tickets.id = ticket_id
      AND tickets.created_by = auth.uid()
    )
  );

CREATE POLICY "Admins can create any message"
  ON ticket_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for tickets table
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();