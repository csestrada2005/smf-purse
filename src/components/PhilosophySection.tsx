const PhilosophySection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <blockquote className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-accent/20 text-8xl font-serif">"</div>
          
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed mb-8 italic">
            Western cities chase order, but Indians choreograph accidents. 
            And yet somehow, amidst this beautiful mess, 
            <span className="text-accent"> something divine happens.</span>
          </p>
          
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8">
            Stop searching for silence to hear it. India will never whisper—it will honk, it will sing, it will spill over. 
            And if you listen closely enough, you will realize that 
            <span className="text-foreground font-medium"> chaos was never noise. It was music all along.</span>
          </p>
          
          <div className="w-16 h-px bg-accent mx-auto mt-8" />
        </blockquote>
      </div>
    </section>
  );
};

export default PhilosophySection;
