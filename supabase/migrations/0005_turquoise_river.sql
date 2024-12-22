/*
  # Add Storage Support for Deal Images

  1. Enable Storage
    - Create a public bucket for deal images
    - Add policy for authenticated users to upload images
*/

-- Create a public bucket for deal images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('deal-images', 'deal-images', true);

-- Allow public access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'deal-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'deal-images');