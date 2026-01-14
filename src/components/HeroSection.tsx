import CountdownTimer from './CountdownTimer';
import EmailSignup from './EmailSignup';
import Logo from './Logo';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col px-4 py-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      
      {/* Logo + Brand Name - top left */}
      <div className="relative z-10 flex items-center gap-3">
        <Logo size="sm" />
        <span className="font-brand text-2xl sm:text-3xl tracking-wide text-foreground lowercase">clasp</span>
      </div>
      
      {/* Content - centered */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center">
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          Launching Soon
        </p>
        
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground mb-6 leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Carry Your
          <span className="block animate-shimmer mt-2">Fearlessness</span>
        </h1>
        
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          A luxurious statement piece designed for the bold Indian woman. 
          <span className="text-foreground"> Because you don't need anyone to feel safe.</span>
        </p>
        
        <div className="mb-12 flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <CountdownTimer />
        </div>
        
        <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <p className="text-muted-foreground text-sm">
            Be the first to own this statement
          </p>
          <EmailSignup />
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
};

export default HeroSection;
