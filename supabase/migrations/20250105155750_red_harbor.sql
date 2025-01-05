-- Create ticket status enum if not exists
DO $$ BEGIN
  CREATE TYPE ticket_status AS ENUM (
    'open',
    'in_progress', 
    'waiting_for_response',
    'resolved',
    'closed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create ticket priority enum if not exists
DO $$ BEGIN
  CREATE TYPE ticket_priority AS ENUM (
    'low',
    'medium',
    'high',
    'urgent'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
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
CREATE TABLE IF NOT EXISTS ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  message text NOT NULL,
  is_internal boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DO $$ 
BEGIN
  -- Tickets policies
  CREATE POLICY "Users can view own tickets"
    ON tickets FOR SELECT
    USING (created_by = auth.uid());

  CREATE POLICY "Admins can view all tickets"
    ON tickets FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );

  CREATE POLICY "Users can create tickets"
    ON tickets FOR INSERT
    WITH CHECK (created_by = auth.uid());

  CREATE POLICY "Admins can update tickets"
    ON tickets FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );

  -- Ticket messages policies
  CREATE POLICY "Users can view messages for their tickets"
    ON ticket_messages FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM tickets
        WHERE tickets.id = ticket_id
        AND (tickets.created_by = auth.uid() OR NOT is_internal)
      )
    );

  CREATE POLICY "Admins can view all messages"
    ON ticket_messages FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );

  CREATE POLICY "Users can create messages for their tickets"
    ON ticket_messages FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM tickets
        WHERE tickets.id = ticket_id
        AND tickets.created_by = auth.uid()
      )
    );

  CREATE POLICY "Admins can create messages"
    ON ticket_messages FOR INSERT
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );

EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tickets_created_by ON tickets(created_by);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket_id ON ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_user_id ON ticket_messages(user_id);