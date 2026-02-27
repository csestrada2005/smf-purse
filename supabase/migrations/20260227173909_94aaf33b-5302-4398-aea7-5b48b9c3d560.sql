
-- Create event_registration table
CREATE TABLE public.event_registration (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  guest_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_registration ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration)
CREATE POLICY "Anyone can register for events"
ON public.event_registration
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read the count (for guest number display)
CREATE POLICY "Anyone can read registrations"
ON public.event_registration
FOR SELECT
USING (true);

-- Create a function to get the next guest number atomically
CREATE OR REPLACE FUNCTION public.register_event_guest(p_name TEXT, p_email TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_number INTEGER;
BEGIN
  -- Lock the table to prevent race conditions
  LOCK TABLE public.event_registration IN EXCLUSIVE MODE;
  
  SELECT COALESCE(MAX(guest_number), 0) + 1 INTO next_number FROM public.event_registration;
  
  INSERT INTO public.event_registration (name, email, guest_number)
  VALUES (p_name, p_email, next_number);
  
  RETURN next_number;
END;
$$;
