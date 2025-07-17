-- Insert mock data without profiles table since auth users need to be created first
-- This migration adds only the reports, matches, and notifications data

-- Insert lost item reports in Bangalore locations
-- Using a sample user ID that will exist when someone registers
INSERT INTO public.reports (id, user_id, title, description, report_type, category_id, latitude, longitude, address, contact_email, contact_phone, incident_date, status, created_at, updated_at) VALUES
  ('sample01-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'Lost iPhone 14 Pro', 'Black iPhone 14 Pro with cracked screen protector. Has a blue case with my initials AS. Lost while jogging in Indiranagar.', 'lost', '66d2a0d6-2fbe-4623-8988-9b01e09eb912', 12.9716, 77.5946, '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038', 'sample.user@gmail.com', '+91 9876543210', now() - interval '2 days', 'active', now() - interval '2 days', now() - interval '2 days'),
  
  ('sample02-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'Lost Gold Earrings', 'Pair of traditional gold earrings with small pearls. Very sentimental value. Lost at a wedding function in Koramangala.', 'lost', '1c740b5c-fbf6-4820-9c2a-5e5e52afb41f', 12.9352, 77.6245, 'Koramangala 5th Block, Bangalore, Karnataka 560095', 'sample.user@gmail.com', '+91 9876543211', now() - interval '1 day', 'active', now() - interval '1 day', now() - interval '1 day'),
  
  ('sample03-cccc-cccc-cccc-cccccccccccc', '00000000-0000-0000-0000-000000000000', 'Lost Car Keys', 'Honda City car keys with remote and a small Ganesha keychain attached. Lost in the office parking lot.', 'lost', '6488d4d0-4fbb-4d04-9da1-9230d437c58d', 12.9698, 77.7500, 'ITPL Main Road, Whitefield, Bangalore, Karnataka 560066', 'sample.user@gmail.com', '+91 9876543212', now() - interval '3 hours', 'active', now() - interval '3 hours', now() - interval '3 hours')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();

-- Insert found item reports in Bangalore locations  
INSERT INTO public.reports (id, user_id, title, description, report_type, category_id, latitude, longitude, address, contact_email, contact_phone, incident_date, status, created_at, updated_at) VALUES
  ('sample04-eeee-eeee-eeee-eeeeeeeeeeee', '00000000-0000-0000-0000-000000000000', 'Found Black Smartphone', 'Found a black smartphone near the metro station. Screen is cracked but phone works. Has a blue protective case.', 'found', '66d2a0d6-2fbe-4623-8988-9b01e09eb912', 12.9716, 77.5946, 'Indiranagar Metro Station, Bangalore, Karnataka 560038', 'sample.user@gmail.com', '+91 9876543214', now() - interval '1 day', 'active', now() - interval '1 day', now() - interval '1 day'),
  
  ('sample05-ffff-ffff-ffff-ffffffffffff', '00000000-0000-0000-0000-000000000000', 'Found Silver Ring', 'Found a silver ring with small stones near the park. Looks like an engagement ring. Very delicate work.', 'found', '1c740b5c-fbf6-4820-9c2a-5e5e52afb41f', 12.9352, 77.6245, 'Koramangala Park, Bangalore, Karnataka 560095', 'sample.user@gmail.com', '+91 9876543210', now() - interval '6 hours', 'active', now() - interval '6 hours', now() - interval '6 hours'),
  
  ('sample06-gggg-gggg-gggg-gggggggggggg', '00000000-0000-0000-0000-000000000000', 'Found House Keys', 'Found a bunch of house keys with a red keychain. Found near the bus stop. Looks like car keys are also attached.', 'found', '6488d4d0-4fbb-4d04-9da1-9230d437c58d', 12.9698, 77.7500, 'Whitefield Bus Stop, Bangalore, Karnataka 560066', 'sample.user@gmail.com', '+91 9876543211', now() - interval '4 hours', 'active', now() - interval '4 hours', now() - interval '4 hours')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();

-- Set expires_at for reports (30 days from creation)
UPDATE public.reports 
SET expires_at = created_at + interval '30 days'
WHERE expires_at IS NULL;