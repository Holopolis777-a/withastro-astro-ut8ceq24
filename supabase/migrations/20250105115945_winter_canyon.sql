/*
  # Create settings table and storage bucket

  1. New Tables
    - `settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Storage
    - Create `logos` bucket for storing logo files

  3. Security
    - Enable RLS on settings table
    - Add policies for admin access
    - Create storage policies for logos bucket
*/

-- Drop existing objects if they exist
DO $$ BEGIN
  DROP TABLE IF EXISTS settings CASCADE;
  DROP FUNCTION IF EXISTS update_updated_at CASCADE;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create settings table
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create policies
DO $$ BEGIN
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

  CREATE POLICY "Admins can delete settings"
    ON settings
    FOR DELETE
    USING (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name)
VALUES ('logos', 'logos')
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
DO $$ BEGIN
  CREATE POLICY "Admins can upload logos"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
      bucket_id = 'logos' AND
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );

  CREATE POLICY "Anyone can view logos"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'logos');

  CREATE POLICY "Admins can update logos"
    ON storage.objects
    FOR UPDATE
    USING (
      bucket_id = 'logos' AND
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );

  CREATE POLICY "Admins can delete logos"
    ON storage.objects
    FOR DELETE
    USING (
      bucket_id = 'logos' AND
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.role = 'admin'
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;