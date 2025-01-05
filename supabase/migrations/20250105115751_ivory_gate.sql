/*
  # Update settings table and policies
  
  1. Tables
    - Add IF NOT EXISTS checks for settings table
  
  2. Policies
    - Add IF NOT EXISTS checks for policies
    - Add IF NOT EXISTS checks for trigger
*/

-- Create settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS if not already enabled
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can read settings" ON settings;
  DROP POLICY IF EXISTS "Admins can insert settings" ON settings;
  DROP POLICY IF EXISTS "Admins can update settings" ON settings;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create policies
CREATE POLICY "Admins can read settings"
  ON settings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert settings"
  ON settings
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update settings"
  ON settings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;

-- Create trigger
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();