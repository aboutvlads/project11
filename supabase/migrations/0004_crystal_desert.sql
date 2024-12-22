/*
  # Add deal details

  1. New Columns
    - `departure_time` (text)
    - `arrival_time` (text)
    - `flight_duration` (text)
    - `posted_by` (text)
    - `posted_by_avatar` (text)
    - `posted_by_description` (text)

  2. Changes
    - Add new columns to deals table
    - Update existing deals with random data
*/

-- Add new columns
ALTER TABLE deals
ADD COLUMN departure_time text,
ADD COLUMN arrival_time text,
ADD COLUMN flight_duration text,
ADD COLUMN posted_by text,
ADD COLUMN posted_by_avatar text,
ADD COLUMN posted_by_description text;

-- Update existing deals with random data
UPDATE deals
SET
  departure_time = CASE 
    WHEN destination = 'Paris' THEN '08:30 AM'
    WHEN destination = 'Amsterdam' THEN '10:30 AM'
    WHEN destination = 'Rome' THEN '09:15 AM'
    WHEN destination = 'Barcelona' THEN '11:45 AM'
    WHEN destination = 'London' THEN '07:20 AM'
    WHEN destination = 'Tokyo' THEN '14:30 PM'
    WHEN destination = 'New York' THEN '13:15 PM'
    ELSE '10:00 AM'
  END,
  arrival_time = CASE 
    WHEN destination = 'Paris' THEN '10:45 AM'
    WHEN destination = 'Amsterdam' THEN '12:45 PM'
    WHEN destination = 'Rome' THEN '11:30 AM'
    WHEN destination = 'Barcelona' THEN '14:00 PM'
    WHEN destination = 'London' THEN '08:35 AM'
    WHEN destination = 'Tokyo' THEN '09:45 AM'
    WHEN destination = 'New York' THEN '16:30 PM'
    ELSE '12:00 PM'
  END,
  flight_duration = CASE 
    WHEN destination = 'Paris' THEN '2h 15m'
    WHEN destination = 'Amsterdam' THEN '2h 15m'
    WHEN destination = 'Rome' THEN '2h 15m'
    WHEN destination = 'Barcelona' THEN '2h 15m'
    WHEN destination = 'London' THEN '1h 15m'
    WHEN destination = 'Tokyo' THEN '11h 15m'
    WHEN destination = 'New York' THEN '7h 15m'
    ELSE '3h 00m'
  END,
  posted_by = CASE 
    WHEN destination = 'Paris' THEN 'Sophie Martin'
    WHEN destination = 'Amsterdam' THEN 'Lucas van der Berg'
    WHEN destination = 'Rome' THEN 'Marco Rossi'
    WHEN destination = 'Barcelona' THEN 'Isabella Garcia'
    WHEN destination = 'London' THEN 'James Wilson'
    WHEN destination = 'Tokyo' THEN 'Yuki Tanaka'
    WHEN destination = 'New York' THEN 'Emily Johnson'
    ELSE 'Alex Thompson'
  END,
  posted_by_avatar = CASE 
    WHEN destination = 'Paris' THEN 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    WHEN destination = 'Amsterdam' THEN 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
    WHEN destination = 'Rome' THEN 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    WHEN destination = 'Barcelona' THEN 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
    WHEN destination = 'London' THEN 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    WHEN destination = 'Tokyo' THEN 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    WHEN destination = 'New York' THEN 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
    ELSE 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&q=80'
  END,
  posted_by_description = CASE 
    WHEN destination = 'Paris' THEN 'Food and culture enthusiast, always hunting for the best croissants'
    WHEN destination = 'Amsterdam' THEN 'Bike lover and canal explorer'
    WHEN destination = 'Rome' THEN 'History buff and pasta connoisseur'
    WHEN destination = 'Barcelona' THEN 'Architecture lover and tapas expert'
    WHEN destination = 'London' THEN 'Tea aficionado and museum hopper'
    WHEN destination = 'Tokyo' THEN 'Street photography and ramen specialist'
    WHEN destination = 'New York' THEN 'Broadway fan and pizza critic'
    ELSE 'Adventure seeker and travel blogger'
  END;