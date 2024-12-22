/*
  # Add more travel deals

  1. New Data
    - Add 4 new destinations:
      - Barcelona, Spain
      - London, UK
      - Tokyo, Japan
      - New York, USA
    
  2. Changes
    - Insert new deals with appropriate pricing and details
    - Add relevant tags for each destination
*/

-- Insert new deals
INSERT INTO deals (destination, country, flag, image_url, price, original_price, discount, departure, stops, is_hot)
VALUES
  ('Barcelona', 'Spain', '🇪🇸', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80', 199, 362, '45% off', 'CDG, Paris', 'May-Jun • 1 stop', true),
  ('London', 'UK', '🇬🇧', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80', 159, 289, '45% off', 'CDG, Paris', 'May-Jun • Direct', false),
  ('Tokyo', 'Japan', '🇯🇵', 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80', 899, 1635, '45% off', 'CDG, Paris', 'May-Jun • 2 stops', true),
  ('New York', 'USA', '🇺🇸', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80', 499, 907, '45% off', 'CDG, Paris', 'May-Jun • 1 stop', false);

-- Insert tags for new deals
INSERT INTO deal_tags (deal_id, tag)
SELECT id, '#foodie' FROM deals WHERE destination = 'Barcelona'
UNION ALL
SELECT id, '#date' FROM deals WHERE destination = 'Barcelona'
UNION ALL
SELECT id, '#shopping' FROM deals WHERE destination = 'London'
UNION ALL
SELECT id, '#friends' FROM deals WHERE destination = 'London'
UNION ALL
SELECT id, '#culture' FROM deals WHERE destination = 'Tokyo'
UNION ALL
SELECT id, '#foodie' FROM deals WHERE destination = 'Tokyo'
UNION ALL
SELECT id, '#shopping' FROM deals WHERE destination = 'New York'
UNION ALL
SELECT id, '#friends' FROM deals WHERE destination = 'New York';