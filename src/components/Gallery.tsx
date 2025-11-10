import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import IMG1 from "@/assets/IMG_1.jpg";
import IMG2 from "@/assets/IMG_2.jpg";
import IMG3 from "@/assets/IMG_3.jpg";
import IMG4 from "@/assets/IMG_4.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    {
      image: IMG1,
      title: "Drywall for bathroom fans and light fixtures",
      description: "Custom drywall renovation showing professional finish quality."
    },
    {
      image: IMG2,
      title: "Commercial Drywall Ceiling with Angled Finish",
      description: "Professional, clean application for commercial ceiling project."
    },
    {
      image: IMG3,
      title: "Raised Ceiling with Light Fixtures",
      description: "Smooth drywall installation in modern residential space with perfect finish."
    },
    {
      image: IMG4,
      title: "Drywall With Multiple Outlets",
      description: "Expert drywall cuts for outlets that blends perfectly with existing wall surface."
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Work Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See the quality and craftsmanship that sets Rock It Out Drywall apart. 
            Every project is completed with attention to detail and professional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(project.image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-90">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Your Project
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Gallery image"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
