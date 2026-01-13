import { Shield, Heart, Sparkles } from 'lucide-react';
import ValueCard from './ValueCard';

const MissionSection = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Empowerment",
      description: "We believe every woman deserves to walk through life with unwavering confidence. Our bags are more than accessories—they're declarations of independence."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Made in India",
      description: "Crafted with love by Indians, for Indians. We understand the rhythm of our streets, the pulse of our cities, and the spirit of our women."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Luxury with Purpose",
      description: "Where elegance meets intention. Each piece is meticulously designed to be both breathtakingly beautiful and purposefully bold."
    }
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">
            Our Purpose
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
            More Than a Bag
          </h2>
          <div className="w-24 h-px bg-accent/50 mx-auto" />
        </div>

        {/* Values grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={`${index * 200}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
