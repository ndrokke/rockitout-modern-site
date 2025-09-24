import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Rock It Out Drywall</h3>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Family-owned drywall contractor serving Iowa for over 10 years. 
              Professional installation, repair, and finishing services with 
              competitive pricing and guaranteed satisfaction.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:3196102050" className="hover:text-accent transition-colors">
                  (319) 610-2050
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>6215 Lafayette Rd, Raymond, IA 50667</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#services" className="hover:text-accent transition-colors">Drywall Installation</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Drywall Repair</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Texture & Finishing</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Commercial Projects</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Get Quote</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Rock It Out Drywall. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-primary-foreground/80 text-sm">Licensed & Insured</span>
              <span className="text-primary-foreground/80 text-sm">Bilingual Service</span>
              <span className="text-primary-foreground/80 text-sm">Same-Week Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;