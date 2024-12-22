/*
  # Fix RLS policies for deals management

  1. Security Updates
    - Enable RLS on deals table
    - Add policies for authenticated users to manage deals
    - Add policies for public users to view deals
*/

-- Update RLS policies for deals table
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert deals
CREATE POLICY "Allow authenticated users to insert deals"
ON deals
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update deals
CREATE POLICY "Allow authenticated users to update deals"
ON deals
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete deals
CREATE POLICY "Allow authenticated users to delete deals"
ON deals
FOR DELETE
TO authenticated
USING (true);

-- Allow everyone to view deals
CREATE POLICY "Allow public to view deals"
ON deals
FOR SELECT
TO public
USING (true);

-- Update RLS policies for deal_tags table
ALTER TABLE deal_tags ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage deal tags
CREATE POLICY "Allow authenticated users to manage deal tags"
ON deal_tags
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow public to view deal tags
CREATE POLICY "Allow public to view deal tags"
ON deal_tags
FOR SELECT
TO public
USING (true);