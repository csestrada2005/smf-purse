import { ArrowRight } from 'lucide-react';

const VisionSection = () => {
  const visionPoints = [
    {
      title: "Our Vision",
      content: "To redefine what it means to carry confidence. We envision a world where every Indian woman walks fearlessly, her bag a silent symbol of her unshakeable spirit."
    },
    {
      title: "Our Mission", 
      content: "To create luxurious accessories that empower women to feel safe, bold, and beautiful. Every stitch, every detail, every golden accent—crafted to remind you of your own strength."
    },
    {
      title: "The Secret",
      content: "Hidden within the elegance lies a statement of self-reliance. A subtle metal accent, beautifully designed, that whispers: 'I am my own protector.'"
    }
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Decorative element */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-72 h-72 border border-accent/20 rounded-full flex items-center justify-center">
                <div className="w-56 h-56 border border-accent/30 rounded-full flex items-center justify-center">
                  <div className="w-40 h-40 bg-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="font-serif text-4xl text-accent animate-pulse-gold">स्त्री</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
          
          {/* Right: Content */}
          <div className="space-y-8">
            {visionPoints.map((point, index) => (
              <div 
                key={point.title}
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {point.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
