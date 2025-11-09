import { Button } from "@/components/ui/button";
import { CheckCircle, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional drywall installation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="flex items-center mb-4">
            <div className="flex items-center text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-primary-foreground font-medium">
              Trusted by 200+ Iowa families
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Rock It Out: Professional{" "}
            <span className="text-accent">Drywall</span> Done Right in Iowa
          </h1>

          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Family-owned drywall contractor with 20+ years of experience. 
            From installation to repairs, we deliver quality work at competitive prices. 
            Bilingual service available.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3"
              asChild
            >
              <a href="#contact">Get Free Quote Today</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
              asChild
            >
              <a href="#gallery">View Our Work</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 text-primary-foreground/90">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
              <span className="font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
              <span className="font-medium">Same-Week Service</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-success mr-2" />
              <span className="font-medium">20+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;