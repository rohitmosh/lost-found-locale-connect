-- Lost & Found Community Web Application
-- Supabase PostgreSQL Database Schema (Adapted for Supabase Auth)

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ================================================================
-- PROFILES TABLE (Connected to Supabase Auth)
-- ================================================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    
    -- Profile Information
    profile_picture TEXT,
    phone_number VARCHAR(20),
    verified_phone BOOLEAN DEFAULT FALSE,
    
    -- Trust Score
    trust_score INTEGER DEFAULT 0,
    
    -- Notification Preferences
    notification_preferences JSONB DEFAULT '{"email": true, "push": true}'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- ================================================================
-- USER TRUST METRICS TABLE
-- ================================================================
CREATE TABLE public.user_trust_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Positive Metrics
    successful_matches INTEGER DEFAULT 0,
    accurate_reports INTEGER DEFAULT 0,
    quick_responses INTEGER DEFAULT 0,
    account_longevity_months INTEGER DEFAULT 0,
    
    -- Negative Metrics
    false_reports INTEGER DEFAULT 0,
    no_shows INTEGER DEFAULT 0,
    spam_posts INTEGER DEFAULT 0,
    unresponsive_incidents INTEGER DEFAULT 0,
    
    -- Calculated Score
    calculated_score INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- ================================================================
-- CATEGORIES TABLE
-- ================================================================
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7), -- hex color code
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- REPORTS TABLE (Base table for both lost and found items)
-- ================================================================
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id),
    
    -- Report Details
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    report_type VARCHAR(10) NOT NULL CHECK (report_type IN ('lost', 'found')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'claimed', 'expired')),
    
    -- Date Information
    incident_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    not_sure_when BOOLEAN DEFAULT FALSE,
    
    -- Media
    photo_url TEXT,
    
    -- Contact Information
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    allow_notifications BOOLEAN DEFAULT TRUE,
    hide_contact_info BOOLEAN DEFAULT FALSE,
    
    -- Location (using PostGIS)
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- ================================================================
-- MATCHES TABLE (Tracks successful connections between lost/found items)
-- ================================================================
CREATE TABLE public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lost_report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
    found_report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
    
    -- Match Details
    matched_by UUID NOT NULL REFERENCES public.profiles(id), -- User who made the match
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
    
    -- Communication
    message TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    
    -- Ensure we don't match lost with lost or found with found
    CONSTRAINT chk_different_report_types CHECK (lost_report_id != found_report_id)
);

-- ================================================================
-- NOTIFICATIONS TABLE
-- ================================================================
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Notification Details
    type VARCHAR(50) NOT NULL, -- 'new_report', 'match_found', 'message', 'status_update', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related Records
    related_report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
    related_match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
    related_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    is_sent BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE
);

-- ================================================================
-- SAVED SEARCHES TABLE (User's saved search filters)
-- ================================================================
CREATE TABLE public.saved_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    search_params JSONB NOT NULL, -- Store search filters as JSON
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- Create Indexes for Performance
-- ================================================================
CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_category_id ON public.reports(category_id);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_type ON public.reports(report_type);
CREATE INDEX idx_reports_created_at ON public.reports(created_at DESC);
CREATE INDEX idx_reports_location ON public.reports(latitude, longitude);

CREATE INDEX idx_matches_lost_report ON public.matches(lost_report_id);
CREATE INDEX idx_matches_found_report ON public.matches(found_report_id);
CREATE INDEX idx_matches_matched_by ON public.matches(matched_by);
CREATE INDEX idx_matches_status ON public.matches(status);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_type ON public.notifications(type);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

CREATE INDEX idx_saved_searches_user_id ON public.saved_searches(user_id);

-- ================================================================
-- FUNCTIONS AND TRIGGERS
-- ================================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_trust_metrics_updated_at BEFORE UPDATE ON public.user_trust_metrics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON public.saved_searches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate trust score
CREATE OR REPLACE FUNCTION public.calculate_trust_score(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    metrics RECORD;
    score INTEGER := 0;
BEGIN
    SELECT * INTO metrics FROM public.user_trust_metrics WHERE user_id = user_uuid;
    
    IF metrics IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Positive points
    score := score + (metrics.successful_matches * 10);
    score := score + (metrics.accurate_reports * 5);
    score := score + (metrics.quick_responses * 3);
    score := score + (metrics.account_longevity_months * 1);
    
    -- Negative points
    score := score - (metrics.false_reports * 15);
    score := score - (metrics.no_shows * 5);
    score := score - (metrics.spam_posts * 3);
    score := score - (metrics.unresponsive_incidents * 2);
    
    RETURN GREATEST(score, 0); -- Ensure score doesn't go below 0
END;
$$;

-- Function to update trust score when metrics change
CREATE OR REPLACE FUNCTION public.update_trust_score()
RETURNS TRIGGER AS $$
BEGIN
    NEW.calculated_score := public.calculate_trust_score(NEW.user_id);
    
    -- Update the user's trust score
    UPDATE public.profiles 
    SET trust_score = NEW.calculated_score 
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update trust score
CREATE TRIGGER trigger_update_trust_score 
    BEFORE INSERT OR UPDATE ON public.user_trust_metrics
    FOR EACH ROW EXECUTE FUNCTION public.update_trust_score();

-- Function to create initial trust metrics and profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
    );
    
    INSERT INTO public.user_trust_metrics (user_id) VALUES (NEW.id);
    
    RETURN NEW;
END;
$$;

-- Trigger to create profile and trust metrics for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================================
-- RLS (Row Level Security) POLICIES
-- ================================================================

-- Enable RLS on tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_trust_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are publicly viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Reports policies (public viewing for lost/found functionality)
CREATE POLICY "Reports are publicly viewable" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Users can create reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reports" ON public.reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reports" ON public.reports FOR DELETE USING (auth.uid() = user_id);

-- Matches policies
CREATE POLICY "Users can view matches for their reports" ON public.matches FOR SELECT 
USING (
    auth.uid() IN (
        SELECT user_id FROM public.reports WHERE id = lost_report_id
        UNION
        SELECT user_id FROM public.reports WHERE id = found_report_id
    )
    OR auth.uid() = matched_by
);
CREATE POLICY "Users can create matches" ON public.matches FOR INSERT WITH CHECK (auth.uid() = matched_by);
CREATE POLICY "Users can update matches they created" ON public.matches FOR UPDATE USING (auth.uid() = matched_by);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Trust metrics policies
CREATE POLICY "Trust metrics are publicly viewable" ON public.user_trust_metrics FOR SELECT USING (true);

-- Saved searches policies
CREATE POLICY "Users can manage own saved searches" ON public.saved_searches FOR ALL USING (auth.uid() = user_id);

-- ================================================================
-- INSERT DEFAULT CATEGORIES
-- ================================================================
INSERT INTO public.categories (name, description, icon, color) VALUES
('electronics', 'Electronic devices and gadgets', 'smartphone', '#3B82F6'),
('clothing', 'Clothing and accessories', 'shirt', '#EF4444'),
('jewelry', 'Jewelry and valuable items', 'gem', '#F59E0B'),
('documents', 'Documents and identification', 'file-text', '#10B981'),
('keys', 'Keys and keychains', 'key', '#8B5CF6'),
('pets', 'Lost or found pets', 'heart', '#EC4899'),
('other', 'Other miscellaneous items', 'help-circle', '#6B7280');