import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  phone: string;
  email?: string;
  service: string;
  location: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteRequest = await req.json();
    console.log("Received quote request from:", quoteData.name);

    // Validate required fields
    if (!quoteData.name || !quoteData.phone || !quoteData.location || !quoteData.message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Format the service name for display
    const serviceDisplay = quoteData.service 
      ? quoteData.service.charAt(0).toUpperCase() + quoteData.service.slice(1).replace(/-/g, ' ')
      : "Not specified";

    // Send email to business
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;">
          New Quote Request from ${quoteData.name}
        </h1>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #555; margin-top: 0;">Contact Information</h2>
          <p><strong>Name:</strong> ${quoteData.name}</p>
          <p><strong>Phone:</strong> <a href="tel:${quoteData.phone}">${quoteData.phone}</a></p>
          ${quoteData.email ? `<p><strong>Email:</strong> <a href="mailto:${quoteData.email}">${quoteData.email}</a></p>` : ''}
          <p><strong>Service Needed:</strong> ${serviceDisplay}</p>
          <p><strong>Project Location:</strong> ${quoteData.location}</p>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #555; margin-top: 0;">Project Details</h2>
          <p style="white-space: pre-wrap;">${quoteData.message}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #fffbcc; border-left: 4px solid #ffeb3b; border-radius: 3px;">
          <p style="margin: 0; color: #666;">
            <strong>Action Required:</strong> Please respond to this quote request within 24 hours.
          </p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
          Submitted on ${new Date().toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'short' 
          })}
        </p>
      </div>
    `;

    const businessEmail = await resend.emails.send({
      from: "Rock It Out Drywall <onboarding@resend.dev>",
      to: ["quotes@rockitoutdrywall.com"],
      subject: `New Quote Request from ${quoteData.name} - ${serviceDisplay}`,
      html: businessEmailHtml,
      replyTo: quoteData.email || undefined,
    });

    console.log("Business email sent successfully:", businessEmail);

    // Send confirmation email to customer if they provided an email
    if (quoteData.email) {
      const customerEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;">
            Thank You for Your Quote Request!
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6;">Hi ${quoteData.name},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            We've received your quote request for <strong>${serviceDisplay}</strong> in ${quoteData.location}.
          </p>

          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #2e7d32; margin-top: 0;">What Happens Next?</h2>
            <ul style="line-height: 1.8;">
              <li>Our team will review your project details</li>
              <li>We'll contact you within 24 hours to discuss your needs</li>
              <li>We'll provide a free, detailed quote for your project</li>
            </ul>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Your Request Summary:</h3>
            <p><strong>Service:</strong> ${serviceDisplay}</p>
            <p><strong>Location:</strong> ${quoteData.location}</p>
            <p style="white-space: pre-wrap;"><strong>Details:</strong> ${quoteData.message}</p>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>Need immediate assistance?</strong> Call us at <a href="tel:3196102050" style="color: #856404;">(319) 610-2050</a>
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>The Rock It Out Drywall Team</strong>
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 14px;">
            <p><strong>Rock It Out Drywall</strong></p>
            <p>6215 Lafayette Rd, Raymond, IA 50667</p>
            <p>Phone: (319) 610-2050</p>
            <p>Monday - Saturday: 7:00 AM - 4:00 PM</p>
          </div>
        </div>
      `;

      const customerEmail = await resend.emails.send({
        from: "Rock It Out Drywall <onboarding@resend.dev>",
        to: [quoteData.email],
        subject: "We've Received Your Quote Request - Rock It Out Drywall",
        html: customerEmailHtml,
      });

      console.log("Customer confirmation email sent successfully:", customerEmail);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send quote request",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
