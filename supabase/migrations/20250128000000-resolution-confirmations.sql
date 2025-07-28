-- ================================================================
-- RESOLUTION CONFIRMATIONS TABLE
-- Tracks the dual confirmation process for item returns
-- ================================================================
CREATE TABLE public.resolution_confirmations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
    
    -- Confirmation Details
    owner_confirmed BOOLEAN DEFAULT FALSE,
    finder_confirmed BOOLEAN DEFAULT FALSE,
    owner_confirmed_by UUID REFERENCES public.profiles(id),
    finder_confirmed_by UUID REFERENCES public.profiles(id),
    
    -- Timestamps
    owner_confirmed_at TIMESTAMP WITH TIME ZONE,
    finder_confirmed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'pending_owner' CHECK (status IN ('pending_owner', 'pending_finder', 'completed', 'cancelled')),
    
    -- Optional notes
    owner_notes TEXT,
    finder_notes TEXT,
    
    -- Ensure only one confirmation process per report
    UNIQUE(report_id)
);

-- Create indexes for better performance
CREATE INDEX idx_resolution_confirmations_report_id ON public.resolution_confirmations(report_id);
CREATE INDEX idx_resolution_confirmations_status ON public.resolution_confirmations(status);
CREATE INDEX idx_resolution_confirmations_owner_confirmed_by ON public.resolution_confirmations(owner_confirmed_by);
CREATE INDEX idx_resolution_confirmations_finder_confirmed_by ON public.resolution_confirmations(finder_confirmed_by);

-- ================================================================
-- FUNCTIONS FOR RESOLUTION CONFIRMATION PROCESS
-- ================================================================

-- Function to initiate resolution confirmation (called when owner clicks "Mark as Resolved")
CREATE OR REPLACE FUNCTION public.initiate_resolution_confirmation(
    p_report_id UUID,
    p_owner_id UUID,
    p_owner_notes TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_report public.reports%ROWTYPE;
    v_confirmation_id UUID;
    v_finder_id UUID;
BEGIN
    -- Get report details
    SELECT * INTO v_report FROM public.reports WHERE id = p_report_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Report not found');
    END IF;
    
    -- Check if user is the owner of the report
    IF v_report.user_id != p_owner_id THEN
        RETURN json_build_object('success', false, 'error', 'Unauthorized');
    END IF;
    
    -- Check if report is active
    IF v_report.status != 'active' THEN
        RETURN json_build_object('success', false, 'error', 'Report is not active');
    END IF;
    
    -- Find the finder (for now, we'll need to determine this based on context)
    -- In a real scenario, this would come from a match or contact interaction
    -- For now, we'll use a placeholder approach
    
    -- Create or update resolution confirmation
    INSERT INTO public.resolution_confirmations (
        report_id,
        owner_confirmed,
        owner_confirmed_by,
        owner_confirmed_at,
        status,
        owner_notes
    ) VALUES (
        p_report_id,
        true,
        p_owner_id,
        NOW(),
        'pending_finder',
        p_owner_notes
    )
    ON CONFLICT (report_id) 
    DO UPDATE SET
        owner_confirmed = true,
        owner_confirmed_by = p_owner_id,
        owner_confirmed_at = NOW(),
        status = 'pending_finder',
        owner_notes = p_owner_notes,
        updated_at = NOW()
    RETURNING id INTO v_confirmation_id;
    
    -- Create notification for the finder
    -- Note: In a real implementation, we'd need to identify the finder
    -- For now, we'll create a general notification system
    
    RETURN json_build_object(
        'success', true, 
        'confirmation_id', v_confirmation_id,
        'status', 'pending_finder'
    );
END;
$$;

-- Function to confirm return by finder
CREATE OR REPLACE FUNCTION public.confirm_return_by_finder(
    p_report_id UUID,
    p_finder_id UUID,
    p_finder_notes TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_confirmation public.resolution_confirmations%ROWTYPE;
    v_report public.reports%ROWTYPE;
BEGIN
    -- Get confirmation details
    SELECT * INTO v_confirmation FROM public.resolution_confirmations WHERE report_id = p_report_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'No resolution process found for this report');
    END IF;
    
    -- Check if owner has already confirmed
    IF NOT v_confirmation.owner_confirmed THEN
        RETURN json_build_object('success', false, 'error', 'Owner has not initiated resolution yet');
    END IF;
    
    -- Update confirmation with finder details
    UPDATE public.resolution_confirmations 
    SET 
        finder_confirmed = true,
        finder_confirmed_by = p_finder_id,
        finder_confirmed_at = NOW(),
        status = 'completed',
        finder_notes = p_finder_notes,
        updated_at = NOW()
    WHERE report_id = p_report_id;
    
    -- Update report status to resolved
    UPDATE public.reports 
    SET 
        status = 'resolved',
        updated_at = NOW()
    WHERE id = p_report_id;
    
    -- Update trust metrics for both users
    -- Owner gets credit for successful resolution
    UPDATE public.user_trust_metrics 
    SET 
        successful_matches = successful_matches + 1,
        calculated_score = calculated_score + 10,
        updated_at = NOW()
    WHERE user_id = v_confirmation.owner_confirmed_by;
    
    -- Finder gets credit for helping
    UPDATE public.user_trust_metrics 
    SET 
        successful_matches = successful_matches + 1,
        calculated_score = calculated_score + 10,
        updated_at = NOW()
    WHERE user_id = p_finder_id;
    
    -- Create success notifications for both users
    INSERT INTO public.notifications (user_id, type, title, message, related_report_id)
    VALUES 
        (v_confirmation.owner_confirmed_by, 'resolution_completed', 'Item Successfully Returned!', 'Your item has been successfully returned. Thank you for using our platform!', p_report_id),
        (p_finder_id, 'resolution_completed', 'Thank You for Helping!', 'You have successfully helped return a lost item. Your trust score has been updated.', p_report_id);
    
    RETURN json_build_object(
        'success', true, 
        'status', 'completed',
        'message', 'Item successfully marked as returned'
    );
END;
$$;

-- Function to get resolution confirmation status
CREATE OR REPLACE FUNCTION public.get_resolution_status(p_report_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_confirmation public.resolution_confirmations%ROWTYPE;
BEGIN
    SELECT * INTO v_confirmation FROM public.resolution_confirmations WHERE report_id = p_report_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object('status', 'none', 'exists', false);
    END IF;
    
    RETURN json_build_object(
        'status', v_confirmation.status,
        'exists', true,
        'owner_confirmed', v_confirmation.owner_confirmed,
        'finder_confirmed', v_confirmation.finder_confirmed,
        'owner_confirmed_at', v_confirmation.owner_confirmed_at,
        'finder_confirmed_at', v_confirmation.finder_confirmed_at,
        'created_at', v_confirmation.created_at
    );
END;
$$;

-- Enable RLS
ALTER TABLE public.resolution_confirmations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view resolution confirmations for their reports" ON public.resolution_confirmations
    FOR SELECT USING (
        report_id IN (
            SELECT id FROM public.reports WHERE user_id = auth.uid()
        )
        OR owner_confirmed_by = auth.uid()
        OR finder_confirmed_by = auth.uid()
    );

CREATE POLICY "Users can create resolution confirmations for their reports" ON public.resolution_confirmations
    FOR INSERT WITH CHECK (
        report_id IN (
            SELECT id FROM public.reports WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own confirmations" ON public.resolution_confirmations
    FOR UPDATE USING (
        owner_confirmed_by = auth.uid() OR finder_confirmed_by = auth.uid()
    );
