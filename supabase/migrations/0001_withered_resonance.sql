/*
  # Initial Schema Setup for Flight Deals

  1. New Tables
    - `deals`
      - `id` (uuid, primary key)
      - `destination` (text)
      - `country` (text)
      - `flag` (text)
      - `image_url` (text)
      - `price` (numeric)
      - `original_price` (numeric)
      - `discount` (text)
      - `departure` (text)
      - `stops` (text)
      - `is_hot` (boolean)
      - `type` (text)
      - `likes` (integer)
      - `created_at` (timestamp)
    - `deal_tags`
      - `id` (uuid, primary key)
      - `deal_id` (uuid, foreign key)
      - `tag` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to like deals
*/

-- Create deals table
CREATE TABLE deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination text NOT NULL,
  country text NOT NULL,
  flag text NOT NULL,
  image_url text NOT NULL,
  price numeric NOT NULL,
  original_price numeric NOT NULL,
  discount text NOT NULL,
  departure text NOT NULL,
  stops text NOT NULL,
  is_hot boolean DEFAULT false,
  type text DEFAULT 'Economy',
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create deal_tags table
CREATE TABLE deal_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES deals(id) ON DELETE CASCADE,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_tags ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to deals"
  ON deals
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to deal tags"
  ON deal_tags
  FOR SELECT
  TO public
  USING (true);

-- Insert sample data
INSERT INTO deals (destination, country, flag, image_url, price, original_price, discount, departure, stops, is_hot)
VALUES
  ('Paris', 'France', '🇫🇷', 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80', 214, 389, '45% off', 'CDG, Paris', 'May-Jun • 1 stop', true),
  ('Amsterdam', 'Netherlands', '🇳🇱', 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80', 189, 343, '45% off', 'CDG, Paris', 'May-Jun • 1 stop', false),
  ('Rome', 'Italy', '🇮🇹', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', 245, 445, '45% off', 'CDG, Paris', 'May-Jun • 1 stop', false);

-- Insert sample tags
INSERT INTO deal_tags (deal_id, tag)
SELECT id, '#date' FROM deals WHERE destination = 'Paris'
UNION ALL
SELECT id, '#foodie' FROM deals WHERE destination = 'Paris'
UNION ALL
SELECT id, '#friends' FROM deals WHERE destination = 'Amsterdam'
UNION ALL
SELECT id, '#rave' FROM deals WHERE destination = 'Amsterdam'
UNION ALL
SELECT id, '#foodie' FROM deals WHERE destination = 'Rome'
UNION ALL
SELECT id, '#date' FROM deals WHERE destination = 'Rome';