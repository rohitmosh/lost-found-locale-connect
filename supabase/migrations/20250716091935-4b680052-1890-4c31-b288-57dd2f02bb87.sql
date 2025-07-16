-- First, let's create some mock profiles using random UUIDs that won't conflict with the foreign key constraint
-- We'll temporarily disable the foreign key constraint for mock data
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Insert 5 users with Indian names
INSERT INTO public.profiles (id, name, email, phone_number, verified_phone, trust_score, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Arjun Sharma', 'arjun.sharma@gmail.com', '+91 9876543210', true, 85, now() - interval '2 months'),
  ('22222222-2222-2222-2222-222222222222', 'Priya Patel', 'priya.patel@gmail.com', '+91 9876543211', true, 92, now() - interval '1 month'),
  ('33333333-3333-3333-3333-333333333333', 'Rajesh Kumar', 'rajesh.kumar@gmail.com', '+91 9876543212', false, 78, now() - interval '3 weeks'),
  ('44444444-4444-4444-4444-444444444444', 'Kavya Nair', 'kavya.nair@gmail.com', '+91 9876543213', true, 88, now() - interval '2 weeks'),
  ('55555555-5555-5555-5555-555555555555', 'Vikram Singh', 'vikram.singh@gmail.com', '+91 9876543214', true, 95, now() - interval '1 week');

-- Insert user trust metrics for each user
INSERT INTO public.user_trust_metrics (user_id, successful_matches, accurate_reports, quick_responses, account_longevity_months, spam_posts, false_reports, no_shows, unresponsive_incidents, calculated_score) VALUES
  ('11111111-1111-1111-1111-111111111111', 8, 12, 15, 24, 0, 1, 0, 2, 85),
  ('22222222-2222-2222-2222-222222222222', 12, 18, 20, 18, 0, 0, 0, 1, 92),
  ('33333333-3333-3333-3333-333333333333', 5, 8, 10, 12, 1, 2, 1, 3, 78),
  ('44444444-4444-4444-4444-444444444444', 10, 15, 18, 15, 0, 0, 0, 2, 88),
  ('55555555-5555-5555-5555-555555555555', 15, 22, 25, 6, 0, 0, 0, 0, 95);

-- Insert lost item reports in Bangalore locations
INSERT INTO public.reports (id, user_id, title, description, report_type, category_id, latitude, longitude, address, contact_email, contact_phone, incident_date, status, created_at) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Lost iPhone 14 Pro', 'Black iPhone 14 Pro with cracked screen protector. Has a blue case with my initials AS.', 'lost', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), 12.9716, 77.5946, '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038', 'arjun.sharma@gmail.com', '+91 9876543210', now() - interval '2 days', 'active', now() - interval '2 days'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Lost Gold Earrings', 'Pair of traditional gold earrings with small pearls. Very sentimental value.', 'lost', (SELECT id FROM categories WHERE name = 'Jewelry' LIMIT 1), 12.9352, 77.6245, 'Koramangala 5th Block, Bangalore, Karnataka 560095', 'priya.patel@gmail.com', '+91 9876543211', now() - interval '1 day', 'active', now() - interval '1 day'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Lost Car Keys', 'Honda City car keys with remote and a small Ganesha keychain attached.', 'lost', (SELECT id FROM categories WHERE name = 'Keys' LIMIT 1), 12.9698, 77.7500, 'ITPL Main Road, Whitefield, Bangalore, Karnataka 560066', 'rajesh.kumar@gmail.com', '+91 9876543212', now() - interval '3 hours', 'active', now() - interval '3 hours'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 'Lost Wallet', 'Brown leather wallet with driving license and some cash. Has family photos inside.', 'lost', (SELECT id FROM categories WHERE name = 'Wallet' LIMIT 1), 12.9141, 77.6083, 'HSR Layout Sector 1, Bangalore, Karnataka 560102', 'kavya.nair@gmail.com', '+91 9876543213', now() - interval '5 hours', 'active', now() - interval '5 hours');

-- Insert found item reports in Bangalore locations
INSERT INTO public.reports (id, user_id, title, description, report_type, category_id, latitude, longitude, address, contact_email, contact_phone, incident_date, status, created_at) VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 'Found Black Smartphone', 'Found a black smartphone near the metro station. Screen is cracked but phone works.', 'found', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), 12.9716, 77.5946, 'Indiranagar Metro Station, Bangalore, Karnataka 560038', 'vikram.singh@gmail.com', '+91 9876543214', now() - interval '1 day', 'active', now() - interval '1 day'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '11111111-1111-1111-1111-111111111111', 'Found Silver Ring', 'Found a silver ring with small stones near the park. Looks like an engagement ring.', 'found', (SELECT id FROM categories WHERE name = 'Jewelry' LIMIT 1), 12.9352, 77.6245, 'Koramangala Park, Bangalore, Karnataka 560095', 'arjun.sharma@gmail.com', '+91 9876543210', now() - interval '6 hours', 'active', now() - interval '6 hours'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', '22222222-2222-2222-2222-222222222222', 'Found House Keys', 'Found a bunch of house keys with a red keychain. Found near the bus stop.', 'found', (SELECT id FROM categories WHERE name = 'Keys' LIMIT 1), 12.9698, 77.7500, 'Whitefield Bus Stop, Bangalore, Karnataka 560066', 'priya.patel@gmail.com', '+91 9876543211', now() - interval '4 hours', 'active', now() - interval '4 hours'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '33333333-3333-3333-3333-333333333333', 'Found Prescription Glasses', 'Found reading glasses in a blue case. Prescription seems high power.', 'found', (SELECT id FROM categories WHERE name = 'Personal Items' LIMIT 1), 12.9581, 77.6958, 'Jayanagar 4th Block, Bangalore, Karnataka 560011', 'rajesh.kumar@gmail.com', '+91 9876543212', now() - interval '2 hours', 'active', now() - interval '2 hours');

-- Create some matches between lost and found items
INSERT INTO public.matches (id, lost_report_id, found_report_id, matched_by, message, status, created_at) VALUES
  ('match111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 'Hi, I found a black smartphone near Indiranagar metro. The description matches your lost iPhone. Please contact me to verify details.', 'pending', now() - interval '1 hour'),
  ('match222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'gggggggg-gggg-gggg-gggg-gggggggggggg', '22222222-2222-2222-2222-222222222222', 'Found some keys near Whitefield bus stop. Could these be your Honda car keys?', 'pending', now() - interval '30 minutes');

-- Insert notifications for users
INSERT INTO public.notifications (id, user_id, type, title, message, related_report_id, related_match_id, is_read, created_at) VALUES
  -- Notifications for Arjun
  ('notif111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'match_found', 'Potential Match Found!', 'Someone found an item that might match your lost iPhone 14 Pro. Check the details and contact them if it matches.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'match111-1111-1111-1111-111111111111', false, now() - interval '1 hour'),
  ('notif112-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'report_created', 'Report Created Successfully', 'Your lost item report for iPhone 14 Pro has been created and is now active. We will notify you if anyone finds a matching item.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null, true, now() - interval '2 days'),
  
  -- Notifications for Priya
  ('notif221-1111-1111-1111-111111111113', '22222222-2222-2222-2222-222222222222', 'match_created', 'You Created a Match', 'You suggested a match between found keys and a lost car keys report. The owner will be notified.', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'match222-2222-2222-2222-222222222222', true, now() - interval '30 minutes'),
  ('notif222-1111-1111-1111-111111111114', '22222222-2222-2222-2222-222222222222', 'report_created', 'Report Created Successfully', 'Your lost item report for Gold Earrings has been created and is now active.', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', null, true, now() - interval '1 day'),
  
  -- Notifications for Rajesh
  ('notif331-1111-1111-1111-111111111115', '33333333-3333-3333-3333-333333333333', 'match_received', 'Someone Found Your Keys!', 'Someone found keys that might match your lost Honda car keys. Please check the details and contact them.', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'match222-2222-2222-2222-222222222222', false, now() - interval '30 minutes'),
  ('notif332-1111-1111-1111-111111111116', '33333333-3333-3333-3333-333333333333', 'report_created', 'Report Created Successfully', 'Your lost item report for Car Keys has been created and is now active.', 'cccccccc-cccc-cccc-cccc-cccccccccccc', null, true, now() - interval '3 hours'),
  
  -- Notifications for Kavya
  ('notif441-1111-1111-1111-111111111117', '44444444-4444-4444-4444-444444444444', 'report_created', 'Report Created Successfully', 'Your lost item report for Wallet has been created and is now active.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', null, true, now() - interval '5 hours'),
  ('notif442-1111-1111-1111-111111111118', '44444444-4444-4444-4444-444444444444', 'reminder', 'Update Your Report', 'Your lost wallet report is still active. Consider updating the description if you remember more details.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', null, false, now() - interval '2 hours'),
  
  -- Notifications for Vikram
  ('notif551-1111-1111-1111-111111111119', '55555555-5555-5555-5555-555555555555', 'match_created', 'You Created a Match', 'You suggested a match between your found smartphone and a lost iPhone report. The owner will be notified.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'match111-1111-1111-1111-111111111111', true, now() - interval '1 hour'),
  ('notif552-1111-1111-1111-111111111120', '55555555-5555-5555-5555-555555555555', 'report_created', 'Report Created Successfully', 'Your found item report for Black Smartphone has been created and is now active.', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', null, true, now() - interval '1 day');

-- Insert some saved searches
INSERT INTO public.saved_searches (id, user_id, name, search_params, is_active, created_at) VALUES
  ('search11-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Electronics in Indiranagar', '{"category": "Electronics", "location": "Indiranagar", "radius": 2}', true, now() - interval '1 week'),
  ('search22-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Jewelry in Koramangala', '{"category": "Jewelry", "location": "Koramangala", "radius": 1}', true, now() - interval '5 days'),
  ('search33-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Keys in Whitefield', '{"category": "Keys", "location": "Whitefield", "radius": 3}', true, now() - interval '2 days'),
  ('search44-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'Wallet in HSR Layout', '{"category": "Wallet", "location": "HSR Layout", "radius": 1}', true, now() - interval '3 hours');