import { CheckCircle, Users, Award, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, number: "200+", label: "Happy Customers" },
    { icon: Award, number: "20+", label: "Years Experience" },
    { icon: Clock, number: "48hr", label: "Response Time" },
    { icon: CheckCircle, number: "100%", label: "Satisfaction Rate" }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Family-Owned, Iowa-Trusted
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Rock It Out Drywall has been serving Iowa families and businesses for over 20 years. 
              As a family-owned business, we understand the importance of quality work, fair pricing, 
              and treating every customer like family.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our bilingual team is committed to clear communication and exceptional craftsmanship. 
              From small repairs to large installations, we approach every project with the same 
              dedication to excellence that has built our reputation across Iowa.
            </p>

            {/* Key Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                <span className="text-foreground">Licensed and fully insured for your protection</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                <span className="text-foreground">Bilingual service in English and Spanish</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                <span className="text-foreground">Competitive pricing with transparent quotes</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                <span className="text-foreground">Same-week installation available</span>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Our Service Area</h3>
              <p className="text-muted-foreground">
                <strong>Headquartered in Raymond, IA</strong><br />
                6215 Lafayette Rd, Raymond, IA 50667<br />
                Serving Cedar Rapids, Iowa City, Marion, and surrounding communities
              </p>
            </div>
          </div>

          {/* Stats */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-muted rounded-lg">
                  <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                    <stat.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary rounded-lg text-primary-foreground">
              <h3 className="text-xl font-semibold mb-3">Why Choose Rock It Out?</h3>
              <ul className="space-y-2 text-primary-foreground/90">
                <li>• Family values with professional results</li>
                <li>• Transparent, upfront pricing</li>
                <li>• Quality materials and expert techniques</li>
                <li>• Clean, respectful work environment</li>
                <li>• Satisfaction guaranteed on every project</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;