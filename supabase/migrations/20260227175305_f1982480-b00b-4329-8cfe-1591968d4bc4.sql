
CREATE TABLE public.interested_in_drops_information (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.interested_in_drops_information ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
ON public.interested_in_drops_information
FOR INSERT
WITH CHECK (true);
