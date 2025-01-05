/*
  # Create logos storage bucket

  Creates a public storage bucket for portal logos with proper permissions.
*/

-- Create storage bucket for logos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create storage policies
DO $$ 
BEGIN
  -- Allow public read access to logos
  CREATE POLICY "Public read access for logos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'logos');

  -- Allow admin upload access
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

  -- Allow admin update access  
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

  -- Allow admin delete access
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
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;