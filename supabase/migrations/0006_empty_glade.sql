/*
  # Storage configuration for deal images

  1. Storage Setup
    - Create public bucket for deal images
    - Configure storage policies for public access and authenticated uploads

  2. Security
    - Allow public read access to images
    - Allow authenticated users to upload images
    - Set file size limits and allowed mime types
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

-- Allow public access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'deal-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'deal-images' AND
  octet_length(content) < 5242880 AND -- 5MB max file size
  mime_type LIKE 'image/%'
);