import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Wrench, Palette, Building2 } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Drywall Installation",
      description: "Professional installation of new drywall for residential and commercial projects. Quality materials and expert craftsmanship.",
      features: ["New construction", "Room additions", "Basement finishing", "Garage conversions"]
    },
    {
      icon: Wrench,
      title: "Drywall Repair",
      description: "Expert repair services for holes, cracks, water damage, and wear. Seamless integration with existing walls.",
      features: ["Hole patching", "Crack repair", "Water damage restoration", "Maintenance fixes"]
    },
    {
      icon: Palette,
      title: "Texture & Finishing",
      description: "Specialized texturing services including knock-down patterns and custom finishes that match your existing decor.",
      features: ["Knock-down texture", "Orange peel finish", "Smooth finish", "Custom patterns"]
    },
    {
      icon: Building2,
      title: "Commercial Projects",
      description: "Tenant finishes and commercial drywall services for offices, retail spaces, and business renovations.",
      features: ["Tenant improvements", "Office buildouts", "Retail spaces", "Industrial facilities"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Drywall Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive drywall solutions for every project size. From installation to repair, 
            we handle it all with professional results guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-border">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-foreground">
                      <div className="h-1.5 w-1.5 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Need a custom solution? We work with homeowners, contractors, and businesses across Iowa.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;