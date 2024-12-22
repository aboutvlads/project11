/*
  # Update storage policies for deal images

  1. Storage Setup
    - Create public bucket for deal images (if not exists)
    - Configure storage policies for public access and authenticated uploads

  2. Security
    - Check for existing policies before creating new ones
    - Allow public read access to images
    - Allow authenticated users to upload images
    - Set file size and mime type restrictions
*/

-- Create a public bucket for deal images if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'deal-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('deal-images', 'deal-images', true);
  END IF;
END $$;

-- Create policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Public Access' 
    AND tablename = 'objects' 
    AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'deal-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Allow authenticated uploads' 
    AND tablename = 'objects' 
    AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Allow authenticated uploads"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'deal-images' AND
      octet_length(content) < 5242880 AND
      mime_type LIKE 'image/%'
    );
  END IF;
END $$;