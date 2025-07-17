-- Add mock users with auth and profile data
-- First, let's create a function to handle user profile creation
CREATE OR REPLACE FUNCTION create_mock_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, phone_number, trust_score, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'name', null, 0, now(), now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add specific mock users to auth.users (manually via Supabase admin)
-- Note: These users need to be created in the Auth system first

-- Insert user profiles with mock data
INSERT INTO public.profiles (id, email, name, phone_number, trust_score, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'arjun.sharma@gmail.com', 'Arjun Sharma', '+91 9876543210', 103, now() - interval '6 months', now()),
  ('22222222-2222-2222-2222-222222222222', 'priya.patel@gmail.com', 'Priya Patel', '+91 9876543211', 35, now() - interval '4 months', now()),
  ('33333333-3333-3333-3333-333333333333', 'rajesh.kumar@gmail.com', 'Rajesh Kumar', '+91 9876543212', 25, now() - interval '3 months', now()),
  ('44444444-4444-4444-4444-444444444444', 'kavya.nair@gmail.com', 'Kavya Nair', '+91 9876543213', 20, now() - interval '2 months', now()),
  ('55555555-5555-5555-5555-555555555555', 'vikram.singh@gmail.com', 'Vikram Singh', '+91 9876543214', 65, now() - interval '5 months', now()),
  ('66666666-6666-6666-6666-666666666666', 'anita.reddy@gmail.com', 'Anita Reddy', '+91 9876543215', 45, now() - interval '3 months', now()),
  ('77777777-7777-7777-7777-777777777777', 'rohit.mehta@gmail.com', 'Rohit Mehta', '+91 9876543216', 78, now() - interval '8 months', now())
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  phone_number = EXCLUDED.phone_number,
  trust_score = EXCLUDED.trust_score,
  updated_at = now();

-- Insert user trust metrics for each user
INSERT INTO public.user_trust_metrics (user_id, successful_matches, accurate_reports, quick_responses, account_longevity_months, false_reports, no_shows, spam_posts, unresponsive_incidents, calculated_score, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 3, 8, 12, 6, 0, 1, 0, 2, 103, now() - interval '6 months', now()),
  ('22222222-2222-2222-2222-222222222222', 1, 2, 3, 4, 0, 0, 0, 1, 35, now() - interval '4 months', now()),
  ('33333333-3333-3333-3333-333333333333', 0, 1, 2, 3, 0, 0, 1, 0, 25, now() - interval '3 months', now()),
  ('44444444-4444-4444-4444-444444444444', 1, 1, 1, 2, 0, 0, 0, 0, 20, now() - interval '2 months', now()),
  ('55555555-5555-5555-5555-555555555555', 3, 4, 6, 5, 0, 0, 0, 1, 65, now() - interval '5 months', now()),
  ('66666666-6666-6666-6666-666666666666', 2, 3, 4, 3, 0, 0, 0, 1, 45, now() - interval '3 months', now()),
  ('77777777-7777-7777-7777-777777777777', 4, 5, 8, 8, 0, 0, 0, 0, 78, now() - interval '8 months', now())
ON CONFLICT (user_id) DO UPDATE SET
  successful_matches = EXCLUDED.successful_matches,
  accurate_reports = EXCLUDED.accurate_reports,
  quick_responses = EXCLUDED.quick_responses,
  account_longevity_months = EXCLUDED.account_longevity_months,
  false_reports = EXCLUDED.false_reports,
  no_shows = EXCLUDED.no_shows,
  spam_posts = EXCLUDED.spam_posts,
  unresponsive_incidents = EXCLUDED.unresponsive_incidents,
  calculated_score = EXCLUDED.calculated_score,
  updated_at = now();

-- Insert lost item reports in Bangalore locations
INSERT INTO public.reports (id, user_id, title, description, report_type, category_id, latitude, longitude, address, contact_email, contact_phone, incident_date, status, created_at, updated_at) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Lost iPhone 14 Pro', 'Black iPhone 14 Pro with cracked screen protector. Has a blue case with my initials AS. Lost while jogging in Indiranagar.', 'lost', '66d2a0d6-2fbe-4623-8988-9b01e09eb912', 12.9716, 77.5946, '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038', 'arjun.sharma@gmail.com', '+91 9876543210', now() - interval '2 days', 'active', now() - interval '2 days', now() - interval '2 days'),
  
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Lost Gold Earrings', 'Pair of traditional gold earrings with small pearls. Very sentimental value. Lost at a wedding function in Koramangala.', 'lost', '1c740b5c-fbf6-4820-9c2a-5e5e52afb41f', 12.9352, 77.6245, 'Koramangala 5th Block, Bangalore, Karnataka 560095', 'priya.patel@gmail.com', '+91 9876543211', now() - interval '1 day', 'active', now() - interval '1 day', now() - interval '1 day'),
  
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Lost Car Keys', 'Honda City car keys with remote and a small Ganesha keychain attached. Lost in the office parking lot.', 'lost', '6488d4d0-4fbb-4d04-9da1-9230d437c58d', 12.9698, 77.7500, 'ITPL Main Road, Whitefield, Bangalore, Karnataka 560066', 'rajesh.kumar@gmail.com', '+91 9876543212', now() - interval '3 hours', 'active', now() - interval '3 hours', now() - interval '3 hours'),
  
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 'Lost Brown Wallet', 'Brown leather wallet with driving license and some cash. Has family photos inside. Lost at HSR Layout market.', 'lost', 'caeb0ad3-65d9-4a3d-b0be-d096c1eb5fb8', 12.9141, 77.6083, 'HSR Layout Sector 1, Bangalore, Karnataka 560102', 'kavya.nair@gmail.com', '+91 9876543213', now() - interval '5 hours', 'active', now() - interval '5 hours', now() - interval '5 hours'),
  
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', '55555555-5555-5555-5555-555555555555', 'Lost Driving License', 'Karnataka driving license with DL number ending in 9876. Has photo of Vikram Singh. Lost at Jayanagar metro station.', 'lost', '46e7e9b2-7745-49fc-9a78-3a7a2505c842', 12.9581, 77.6958, 'Jayanagar 4th Block, Bangalore, Karnataka 560011', 'vikram.singh@gmail.com', '+91 9876543214', now() - interval '8 hours', 'active', now() - interval '8 hours', now() - interval '8 hours'),
  
  ('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', '66666666-6666-6666-6666-666666666666', 'Lost Silver Watch', 'Silver Titan watch with black leather strap. Gift from my father. Lost at Bangalore City Railway Station.', 'lost', '1c740b5c-fbf6-4820-9c2a-5e5e52afb41f', 12.9762, 77.6033, 'Bangalore City Railway Station, Bangalore, Karnataka 560001', 'anita.reddy@gmail.com', '+91 9876543215', now() - interval '1 day', 'active', now() - interval '1 day', now() - interval '1 day'),
  
  ('llllllll-llll-llll-llll-llllllllllll', '77777777-7777-7777-7777-777777777777', 'Lost Red Backpack', 'Red Wildcraft backpack with laptop and important documents. Lost at Cubbon Park during morning walk.', 'lost', '52bf5b9d-d01f-4b57-9217-a87d1199e7ca', 12.9698, 77.6035, 'Cubbon Park, Bangalore, Karnataka 560001', 'rohit.mehta@gmail.com', '+91 9876543216', now() - interval '6 hours', 'active', now() - interval '6 hours', now() - interval '6 hours')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();

-- Insert found item reports in Bangalore locations
INSERT INTO public.reports (id, user_id, title, description, report_type, category_id, latitude, longitude, address, contact_email, contact_phone, incident_date, status, created_at, updated_at) VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 'Found Black Smartphone', 'Found a black smartphone near the metro station. Screen is cracked but phone works. Has a blue protective case.', 'found', '66d2a0d6-2fbe-4623-8988-9b01e09eb912', 12.9716, 77.5946, 'Indiranagar Metro Station, Bangalore, Karnataka 560038', 'vikram.singh@gmail.com', '+91 9876543214', now() - interval '1 day', 'active', now() - interval '1 day', now() - interval '1 day'),
  
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '11111111-1111-1111-1111-111111111111', 'Found Silver Ring', 'Found a silver ring with small stones near the park. Looks like an engagement ring. Very delicate work.', 'found', '1c740b5c-fbf6-4820-9c2a-5e5e52afb41f', 12.9352, 77.6245, 'Koramangala Park, Bangalore, Karnataka 560095', 'arjun.sharma@gmail.com', '+91 9876543210', now() - interval '6 hours', 'active', now() - interval '6 hours', now() - interval '6 hours'),
  
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', '22222222-2222-2222-2222-222222222222', 'Found House Keys', 'Found a bunch of house keys with a red keychain. Found near the bus stop. Looks like car keys are also attached.', 'found', '6488d4d0-4fbb-4d04-9da1-9230d437c58d', 12.9698, 77.7500, 'Whitefield Bus Stop, Bangalore, Karnataka 560066', 'priya.patel@gmail.com', '+91 9876543211', now() - interval '4 hours', 'active', now() - interval '4 hours', now() - interval '4 hours'),
  
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '33333333-3333-3333-3333-333333333333', 'Found Blue Denim Jacket', 'Found a blue denim jacket with "Royal Challengers Bangalore" badge. Size L. Left at HSR Layout BDA Complex.', 'found', '52bf5b9d-d01f-4b57-9217-a87d1199e7ca', 12.9141, 77.6083, 'HSR Layout BDA Complex, Bangalore, Karnataka 560102', 'rajesh.kumar@gmail.com', '+91 9876543212', now() - interval '2 hours', 'active', now() - interval '2 hours', now() - interval '2 hours'),
  
  ('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', '44444444-4444-4444-4444-444444444444', 'Found Company ID Card', 'Found a company ID card for Tech Solutions Pvt Ltd. Employee name: Ravi Kumar. Found at Jayanagar metro station.', 'found', '46e7e9b2-7745-49fc-9a78-3a7a2505c842', 12.9581, 77.6958, 'Jayanagar Metro Station, Bangalore, Karnataka 560011', 'kavya.nair@gmail.com', '+91 9876543213', now() - interval '3 hours', 'active', now() - interval '3 hours', now() - interval '3 hours'),
  
  ('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', '77777777-7777-7777-7777-777777777777', 'Found Black Wallet', 'Found a black leather wallet with some cash and cards. Found at Brigade Road shopping area.', 'found', 'caeb0ad3-65d9-4a3d-b0be-d096c1eb5fb8', 12.9716, 77.6198, 'Brigade Road, Bangalore, Karnataka 560001', 'rohit.mehta@gmail.com', '+91 9876543216', now() - interval '4 hours', 'active', now() - interval '4 hours', now() - interval '4 hours'),
  
  ('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', '66666666-6666-6666-6666-666666666666', 'Found Golden Earrings', 'Found a pair of golden earrings with pearl work. Very beautiful traditional design. Found at wedding hall.', 'found', '1c740b5c-fbf6-4820-9c2a-5e5e52afb41f', 12.9352, 77.6245, 'Forum Mall, Koramangala, Bangalore, Karnataka 560095', 'anita.reddy@gmail.com', '+91 9876543215', now() - interval '2 hours', 'active', now() - interval '2 hours', now() - interval '2 hours')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();

-- Create some matches between lost and found items
INSERT INTO public.matches (id, lost_report_id, found_report_id, matched_by, message, status, created_at, updated_at) VALUES
  ('match111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 'Hi Arjun! I found a black smartphone near Indiranagar metro station. The description matches your lost iPhone - it has a blue case and the screen protector is cracked. Please contact me to verify more details and we can arrange to meet.', 'pending', now() - interval '1 hour', now() - interval '1 hour'),
  
  ('match222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'gggggggg-gggg-gggg-gggg-gggggggggggg', '22222222-2222-2222-2222-222222222222', 'Hi Rajesh! I found some keys near Whitefield bus stop that include both house keys and what looks like car keys. Could these be your Honda car keys with the Ganesha keychain?', 'pending', now() - interval '30 minutes', now() - interval '30 minutes'),
  
  ('match333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', '66666666-6666-6666-6666-666666666666', 'Hi Priya! I found a pair of golden earrings with pearl work at Forum Mall, Koramangala. The description matches your lost traditional gold earrings. They look very valuable and have beautiful craftsmanship.', 'confirmed', now() - interval '2 hours', now() - interval '30 minutes'),
  
  ('match444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', '77777777-7777-7777-7777-777777777777', 'Hi Kavya! I found a wallet at Brigade Road. It is brown leather, not black, but it has some cash and cards inside. Could you check if this might be yours?', 'rejected', now() - interval '3 hours', now() - interval '1 hour')
ON CONFLICT (id) DO UPDATE SET
  message = EXCLUDED.message,
  status = EXCLUDED.status,
  updated_at = now();

-- Insert notifications for users
INSERT INTO public.notifications (id, user_id, type, title, message, related_report_id, related_match_id, is_read, created_at, read_at) VALUES
  -- Notifications for Arjun
  ('notif111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'match_found', 'Potential Match Found!', 'Someone found an item that might match your lost iPhone 14 Pro. Check the details and contact them if it matches.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'match111-1111-1111-1111-111111111111', false, now() - interval '1 hour', null),
  ('notif112-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'report_created', 'Report Created Successfully', 'Your lost item report for iPhone 14 Pro has been created and is now active. We will notify you if anyone finds a matching item.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null, true, now() - interval '2 days', now() - interval '1 day'),
  
  -- Notifications for Priya
  ('notif221-1111-1111-1111-111111111113', '22222222-2222-2222-2222-222222222222', 'match_created', 'You Created a Match', 'You suggested a match between found keys and a lost car keys report. The owner will be notified about your finding.', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'match222-2222-2222-2222-222222222222', true, now() - interval '30 minutes', now() - interval '25 minutes'),
  ('notif222-1111-1111-1111-111111111114', '22222222-2222-2222-2222-222222222222', 'report_created', 'Report Created Successfully', 'Your lost item report for Gold Earrings has been created and is now active. We will keep looking for matches.', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', null, true, now() - interval '1 day', now() - interval '20 hours'),
  ('notif223-1111-1111-1111-111111111115', '22222222-2222-2222-2222-222222222222', 'match_confirmed', 'Match Confirmed!', 'Great news! Your lost gold earrings have been confirmed as found. The finder will contact you soon for handover.', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'match333-3333-3333-3333-333333333333', false, now() - interval '30 minutes', null),
  
  -- Notifications for Rajesh
  ('notif331-1111-1111-1111-111111111116', '33333333-3333-3333-3333-333333333333', 'match_received', 'Someone Found Your Keys!', 'Someone found keys that might match your lost Honda car keys. Please check the details and contact them to verify.', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'match222-2222-2222-2222-222222222222', false, now() - interval '30 minutes', null),
  ('notif332-1111-1111-1111-111111111117', '33333333-3333-3333-3333-333333333333', 'report_created', 'Report Created Successfully', 'Your lost item report for Car Keys has been created and is now active. We will notify you of any matches.', 'cccccccc-cccc-cccc-cccc-cccccccccccc', null, true, now() - interval '3 hours', now() - interval '2 hours'),
  
  -- Notifications for Kavya
  ('notif441-1111-1111-1111-111111111118', '44444444-4444-4444-4444-444444444444', 'report_created', 'Report Created Successfully', 'Your lost item report for Brown Wallet has been created and is now active. We will keep searching for matches.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', null, true, now() - interval '5 hours', now() - interval '4 hours'),
  ('notif442-1111-1111-1111-111111111119', '44444444-4444-4444-4444-444444444444', 'reminder', 'Update Your Report', 'Your lost wallet report is still active. Consider updating the description if you remember more details that might help.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', null, false, now() - interval '2 hours', null),
  ('notif443-1111-1111-1111-111111111120', '44444444-4444-4444-4444-444444444444', 'match_rejected', 'Match Not Confirmed', 'Unfortunately, the wallet found at Brigade Road was not your lost item. We will continue searching for matches.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'match444-4444-4444-4444-444444444444', true, now() - interval '1 hour', now() - interval '45 minutes'),
  
  -- Notifications for Vikram
  ('notif551-1111-1111-1111-111111111121', '55555555-5555-5555-5555-555555555555', 'match_created', 'You Created a Match', 'You suggested a match between your found smartphone and a lost iPhone report. The owner will be notified about your finding.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'match111-1111-1111-1111-111111111111', true, now() - interval '1 hour', now() - interval '55 minutes'),
  ('notif552-1111-1111-1111-111111111122', '55555555-5555-5555-5555-555555555555', 'report_created', 'Report Created Successfully', 'Your found item report for Black Smartphone has been created and is now active. We will help find the owner.', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', null, true, now() - interval '1 day', now() - interval '20 hours'),
  ('notif553-1111-1111-1111-111111111123', '55555555-5555-5555-5555-555555555555', 'report_created', 'Report Created Successfully', 'Your lost item report for Driving License has been created and is now active. We will search for matches.', 'iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', null, true, now() - interval '8 hours', now() - interval '7 hours'),
  
  -- Notifications for Anita
  ('notif661-1111-1111-1111-111111111124', '66666666-6666-6666-6666-666666666666', 'match_created', 'You Created a Match', 'You suggested a match between found earrings and a lost jewelry report. This match has been confirmed by the owner!', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'match333-3333-3333-3333-333333333333', false, now() - interval '2 hours', null),
  ('notif662-1111-1111-1111-111111111125', '66666666-6666-6666-6666-666666666666', 'report_created', 'Report Created Successfully', 'Your lost item report for Silver Watch has been created and is now active.', 'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', null, true, now() - interval '1 day', now() - interval '18 hours'),
  
  -- Notifications for Rohit
  ('notif771-1111-1111-1111-111111111126', '77777777-7777-7777-7777-777777777777', 'match_created', 'You Created a Match', 'You suggested a match between found wallet and a lost wallet report. The owner will be notified to verify the match.', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'match444-4444-4444-4444-444444444444', true, now() - interval '3 hours', now() - interval '2 hours'),
  ('notif772-1111-1111-1111-111111111127', '77777777-7777-7777-7777-777777777777', 'report_created', 'Report Created Successfully', 'Your lost item report for Red Backpack has been created and is now active.', 'llllllll-llll-llll-llll-llllllllllll', null, true, now() - interval '6 hours', now() - interval '5 hours')
ON CONFLICT (id) DO UPDATE SET
  message = EXCLUDED.message,
  is_read = EXCLUDED.is_read,
  read_at = EXCLUDED.read_at;

-- Update some matches to have confirmed_at timestamp for confirmed matches
UPDATE public.matches 
SET confirmed_at = now() - interval '30 minutes'
WHERE status = 'confirmed';

-- Set expires_at for reports (30 days from creation)
UPDATE public.reports 
SET expires_at = created_at + interval '30 days'
WHERE expires_at IS NULL;

-- Mark some notifications as sent
UPDATE public.notifications 
SET is_sent = true, sent_at = created_at + interval '1 minute'
WHERE is_sent = false;