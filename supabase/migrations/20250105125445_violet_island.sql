-- Create storage bucket for logos if it doesn't exist
DO $$ 
BEGIN
  -- First check if bucket exists
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'logos'
  ) THEN
    -- Create the bucket
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('logos', 'logos', true);
  END IF;
END $$;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public read access for logos" ON storage.objects;
  DROP POLICY IF EXISTS "Admin upload access for logos" ON storage.objects;
  DROP POLICY IF EXISTS "Admin update access for logos" ON storage.objects;
  DROP POLICY IF EXISTS "Admin delete access for logos" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create new policies
CREATE POLICY "Public read access for logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'logos');

CREATE POLICY "Admin upload access for logos"
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'logos' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Admin update access for logos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'logos' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Admin delete access for logos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'logos' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );