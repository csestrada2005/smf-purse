import { ReactNode } from 'react';

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: string;
}

const ValueCard = ({ icon, title, description, delay = '0ms' }: ValueCardProps) => {
  return (
    <div 
      className="group relative opacity-0 animate-fade-in-up"
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className="absolute inset-0 bg-accent/5 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative bg-card/40 backdrop-blur-sm border border-accent/10 rounded-xl p-8 h-full transition-all duration-500 hover:border-accent/30 hover:shadow-gold">
        <div className="text-accent mb-4 text-3xl">
          {icon}
        </div>
        <h3 className="font-serif text-xl text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ValueCard;
