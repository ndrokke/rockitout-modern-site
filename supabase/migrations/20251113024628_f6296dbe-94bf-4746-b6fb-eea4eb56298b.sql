-- Update the quote-images bucket to be public so images can be viewed in emails
UPDATE storage.buckets 
SET public = true 
WHERE id = 'quote-images';