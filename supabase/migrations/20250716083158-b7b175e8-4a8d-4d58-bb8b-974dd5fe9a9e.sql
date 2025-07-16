-- Insert mock data with Indian names and Bangalore locations

-- First, let's insert mock users with Indian names
-- Note: These will be created when users actually sign up through the auth system
-- For now, let's create some sample reports and notifications that can be used once users exist

-- Mock data for when users are authenticated
-- Sample report data with Bangalore locations
INSERT INTO public.reports (
    user_id, category_id, title, description, report_type, status,
    incident_date, contact_email, contact_phone, latitude, longitude, address,
    created_at
) VALUES
-- Lost items
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479', -- This will be replaced with actual user IDs
    (SELECT id FROM public.categories WHERE name = 'electronics'),
    'Lost iPhone 14 Pro',
    'Lost my black iPhone 14 Pro near Koramangala metro station. Has a purple case with my name "Priya" written on it. Please contact if found.',
    'lost',
    'active',
    NOW() - INTERVAL '2 days',
    'priya.sharma@email.com',
    '+91-9876543210',
    12.9352,
    77.6245,
    'Koramangala Metro Station, Bangalore',
    NOW() - INTERVAL '2 days'
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    (SELECT id FROM public.categories WHERE name = 'documents'),
    'Lost Driving License',
    'Lost my driving license somewhere in Indiranagar. Name: Rajesh Kumar. DL number starts with KA05. Reward offered.',
    'lost',
    'active',
    NOW() - INTERVAL '1 day',
    'rajesh.kumar@email.com',
    '+91-9876543211',
    12.9716,
    77.6412,
    'Indiranagar, 100 Feet Road, Bangalore',
    NOW() - INTERVAL '1 day'
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    (SELECT id FROM public.categories WHERE name = 'keys'),
    'Lost House Keys',
    'Lost a bunch of keys with a Honda keychain near Whitefield. Has 4 keys including a black gate key.',
    'lost',
    'active',
    NOW() - INTERVAL '3 hours',
    'ananya.reddy@email.com',
    '+91-9876543212',
    12.9698,
    77.7500,
    'Whitefield Main Road, Bangalore',
    NOW() - INTERVAL '3 hours'
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d482',
    (SELECT id FROM public.categories WHERE name = 'jewelry'),
    'Lost Gold Chain',
    'Lost a thin gold chain near Electronic City bus stop. Very sentimental value. Please help!',
    'lost',
    'active',
    NOW() - INTERVAL '5 hours',
    'lakshmi.nair@email.com',
    '+91-9876543213',
    12.8456,
    77.6603,
    'Electronic City Phase 1, Bangalore',
    NOW() - INTERVAL '5 hours'
);

-- Sample notifications
INSERT INTO public.notifications (
    user_id, type, title, message, is_read, created_at
) VALUES
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'welcome',
    'Welcome to FindIt!',
    'Welcome to the FindIt community! Start by reporting lost or found items to help others.',
    false,
    NOW() - INTERVAL '1 day'
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    'new_report',
    'New item reported in your area',
    'A new lost item has been reported in Indiranagar. Check if it matches something you found!',
    false,
    NOW() - INTERVAL '6 hours'
),
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    'match_found',
    'Possible match for your keys',
    'Someone reported finding keys near Whitefield. This might be yours!',
    false,
    NOW() - INTERVAL '2 hours'
);