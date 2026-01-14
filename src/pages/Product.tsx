import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import purseSketchesImage from '@/assets/purse-sketches.jpeg';
import Logo from '@/components/Logo';

const Product = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-6">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo size="sm" />
          <span className="font-brand text-2xl sm:text-3xl tracking-wide text-foreground lowercase">clasp</span>
        </Link>
        <Link 
          to="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-8 py-12 text-center">
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4 animate-fade-in-up">
          Product Preview
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          The Design
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          A glimpse into the craftsmanship behind your statement piece. 
          <span className="text-foreground"> Luxury meets purpose.</span>
        </p>
      </section>

      {/* Product Showcase */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden shadow-elegant animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <img 
              src={purseSketchesImage} 
              alt="Clasp purse design sketches showing multiple views" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-xl">✦</span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">Premium Leather</h3>
              <p className="text-muted-foreground text-sm">Crafted from the finest Indian leather with meticulous attention to detail</p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-xl">✦</span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">Gold Hardware</h3>
              <p className="text-muted-foreground text-sm">Signature brass accents that elevate the design to statement status</p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-xl">✦</span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">Hidden Strength</h3>
              <p className="text-muted-foreground text-sm">The metal accent that whispers confidence and shouts independence</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 py-16 text-center border-t border-accent/10">
        <p className="text-muted-foreground mb-6">Be the first to own this statement</p>
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-accent text-background font-medium rounded-sm hover:bg-accent/90 transition-colors"
        >
          Join the Waitlist
        </Link>
      </section>
    </div>
  );
};

export default Product;
