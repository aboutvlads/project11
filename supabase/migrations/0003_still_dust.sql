/*
  # Add URLs to deals

  1. Changes
    - Add `url` column to deals table
    - Update existing deals with sample URLs
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add URL column to deals table
ALTER TABLE deals 
ADD COLUMN url text;

-- Update existing deals with sample URLs
UPDATE deals SET url = 
  CASE destination
    WHEN 'Paris' THEN 'https://www.google.com/search?q=flights+to+paris'
    WHEN 'Amsterdam' THEN 'https://www.google.com/search?q=flights+to+amsterdam'
    WHEN 'Rome' THEN 'https://www.google.com/search?q=flights+to+rome'
    WHEN 'Barcelona' THEN 'https://www.google.com/search?q=flights+to+barcelona'
    WHEN 'London' THEN 'https://www.google.com/search?q=flights+to+london'
    WHEN 'Tokyo' THEN 'https://www.google.com/search?q=flights+to+tokyo'
    WHEN 'New York' THEN 'https://www.google.com/search?q=flights+to+new+york'
    ELSE 'https://www.google.com/flights'
  END;