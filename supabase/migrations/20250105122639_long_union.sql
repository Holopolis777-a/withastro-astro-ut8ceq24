-- Create storage bucket for logos if it doesn't exist
DO $$ 
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('logos', 'logos', true)
  ON CONFLICT (id) DO NOTHING;

  -- Enable RLS
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

  -- Create storage policies
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