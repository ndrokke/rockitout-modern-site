import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, MapPin, Clock, Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(10, "Valid phone number is required").max(20, "Phone number must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters").optional().or(z.literal("")),
  service: z.string().max(50).optional(),
  location: z.string().trim().min(1, "Location is required").max(200, "Location must be less than 200 characters"),
  message: z.string().trim().min(10, "Please provide at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data using Zod
      const validatedData = quoteSchema.parse(formData);

      // Validate images
      if (images.length > 5) {
        throw new Error("Maximum 5 images allowed");
      }
      
      const totalSize = images.reduce((sum, img) => sum + img.size, 0);
      if (totalSize > 25 * 1024 * 1024) { // 25MB total
        throw new Error("Total image size must be under 25MB");
      }

      console.log("Sending quote request...", validatedData);

      // Convert images to base64 for sending to edge function
      const imageDataPromises = images.map(async (file) => {
        try {
          const base64 = await new Promise<string | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = reader.result as string;
              // Validate that we got a proper data URL
              if (result && result.startsWith('data:')) {
                console.log(`Successfully converted ${file.name} to base64`);
                resolve(result);
              } else {
                console.error(`Invalid data URL for ${file.name}`);
                reject(new Error(`Failed to convert ${file.name}`));
              }
            };
            reader.onerror = () => {
              console.error(`FileReader error for ${file.name}:`, reader.error);
              reject(reader.error || new Error(`Failed to read ${file.name}`));
            };
            reader.readAsDataURL(file);
          });
          
          return base64 ? {
            name: file.name,
            type: file.type,
            data: base64
          } : null;
        } catch (error) {
          console.error(`Error converting ${file.name}:`, error);
          toast({
            title: "Image Upload Warning",
            description: `${file.name} could not be processed and will be skipped.`,
            variant: "destructive"
          });
          return null;
        }
      });
      
      const imageDataResults = await Promise.all(imageDataPromises);
      const imageData = imageDataResults.filter((img): img is NonNullable<typeof img> => img !== null);
      
      if (images.length > 0 && imageData.length === 0) {
        throw new Error("Failed to process any images. Please try different files.");
      }
      
      console.log(`Successfully processed ${imageData.length} of ${images.length} images`);

      // Call the edge function to send email with images
      const { data, error } = await supabase.functions.invoke("send-quote-email", {
        body: {
          ...validatedData,
          images: imageData
        },
      });

      if (error) {
        console.error("Error sending quote:", error);
        throw error;
      }

      console.log("Quote sent successfully:", data);

      toast({
        title: "Quote Request Sent!",
        description: "We'll contact you within 24 hours to discuss your project.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        location: "",
        message: ""
      });
      setImages([]);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive"
        });
      } else {
        // Handle submission errors
        toast({
          title: "Error Sending Request",
          description: "There was a problem sending your quote request. Please try again or call us directly at (319) 610-2050.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB per file
      
      if (!isValidType) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported image format. Please use JPG, PNG, or WebP.`,
          variant: "destructive"
        });
      }
      if (!isValidSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds 5MB limit.`,
          variant: "destructive"
        });
      }
      
      return isValidType && isValidSize;
    });

    setImages(prev => [...prev, ...validFiles].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Get Your Free Quote Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your drywall project? Contact us for a free, no-obligation quote. 
            We respond to all inquiries within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Ready to discuss your project?</p>
                <a 
                  href="tel:3196102050" 
                  className="text-lg font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  (319) 610-2050
                </a>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <MapPin className="h-5 w-5 mr-2" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Our headquarters:</p>
                <address className="not-italic text-foreground">
                  6215 Lafayette Rd<br />
                  Raymond, IA 50667
                </address>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Clock className="h-5 w-5 mr-2" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-foreground">
                  <p>Monday - Saturday: 7:00 AM - 4:00 PM</p>
                  <p>Sunday: Emergency calls only</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-accent/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-2">Emergency Repairs</h3>
                <p className="text-sm text-muted-foreground">
                  Need immediate drywall repair? We offer emergency services for water damage, 
                  structural issues, and urgent repairs.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-primary">Request Your Free Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Service Needed</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a service</option>
                      <option value="installation">Drywall Installation</option>
                      <option value="repair">Drywall Repair</option>
                      <option value="texture">Texture & Finishing</option>
                      <option value="commercial">Commercial Project</option>
                      <option value="emergency">Emergency Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="location">Project Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City or address in Iowa"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your project, including room size, timeline, and any specific requirements..."
                      required
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="images">Project Images (Optional)</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload up to 5 images (JPG, PNG, WebP, max 5MB each)
                    </p>
                    <div className="mt-1">
                      <input
                        id="images"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleImageChange}
                        disabled={images.length >= 5}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('images')?.click()}
                        disabled={images.length >= 5}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {images.length >= 5 ? 'Maximum 5 Images' : 'Upload Images'}
                      </Button>
                    </div>
                    
                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-md border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {image.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Quote Request"
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll respond within 24 hours with a detailed quote for your project.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;