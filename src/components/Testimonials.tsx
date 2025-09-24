import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Cedar Rapids, IA",
      rating: 5,
      text: "Rock It Out Drywall transformed our basement into a beautiful living space. The attention to detail and quality of work exceeded our expectations. Highly recommend!"
    },
    {
      name: "Mike Rodriguez",
      location: "Iowa City, IA",
      rating: 5,
      text: "Professional, reliable, and reasonably priced. They repaired water damage in our kitchen and you can't even tell there was ever a problem. Excellent work!"
    },
    {
      name: "Jennifer Thompson",
      location: "Marion, IA",
      rating: 5,
      text: "The bilingual service was so helpful during our renovation. The crew was courteous, clean, and delivered exactly what they promised. Will definitely use them again."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. See what Iowa families and businesses 
            say about working with Rock It Out Drywall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-accent mr-3" />
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-background rounded-lg p-8 shadow-sm border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Join Our Happy Customers?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get your free quote today and experience the Rock It Out difference.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Get Your Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;