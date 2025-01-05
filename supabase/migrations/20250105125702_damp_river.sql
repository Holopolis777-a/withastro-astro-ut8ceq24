-- Drop existing bucket if it exists
DO $$ 
BEGIN
  DELETE FROM storage.buckets WHERE id = 'logos';
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create storage bucket with proper configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'logos',
  'logos',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/svg+xml']::text[]
);

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public read access for logos" ON storage.objects;
  DROP POLICY IF EXISTS "Admin upload access for logos" ON storage.objects;
  DROP POLICY IF EXISTS "Admin update access for logos" ON storage.objects;
  DROP POLICY IF EXISTS "Admin delete access for logos" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create new policies with proper roles
CREATE POLICY "Public read access for logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'logos');

CREATE POLICY "Admin upload access for logos"
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'logos' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role') AND
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
    (auth.role() = 'authenticated' OR auth.role() = 'service_role') AND
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
    (auth.role() = 'authenticated' OR auth.role() = 'service_role') AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );