-- Create storage bucket for quote images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-images',
  'quote-images',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Allow authenticated users to upload their own images
CREATE POLICY "Users can upload quote images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'quote-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to view their own images
CREATE POLICY "Users can view their own quote images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'quote-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public access for sending emails (service role will handle this)
CREATE POLICY "Service role can access quote images"
ON storage.objects
FOR SELECT
TO service_role
USING (bucket_id = 'quote-images');