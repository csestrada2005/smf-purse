import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const registrationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
});

const Event = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestNumber, setGuestNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = registrationSchema.safeParse({ name, email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: rpcError } = await supabase.rpc('register_event_guest', {
        p_name: result.data.name,
        p_email: result.data.email,
      });

      if (rpcError) throw rpcError;
      setGuestNumber(data as number);
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />

      {/* Mysterious ambient elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6 sm:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Date pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mb-8"
          >
            <span className="text-accent/70 uppercase tracking-[0.4em] text-xs border border-accent/20 px-6 py-2 rounded-full">
              March 7th
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl text-foreground mb-4 leading-[0.9]"
          >
            Clasp
            <br />
            <span className="italic text-accent">Conspiracy</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl tracking-[0.15em] uppercase mb-2"
          >
            Something is coming…
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.9 }}
            className="text-muted-foreground/60 text-sm tracking-[0.2em] uppercase mb-16"
          >
            The details remain a mystery.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="w-24 h-px bg-accent/30 mx-auto mb-16"
          />

          {/* Registration Form or Confirmation */}
          <AnimatePresence mode="wait">
            {guestNumber ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="border border-accent/20 rounded-sm p-10 bg-card/30 backdrop-blur-sm">
                  <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">You're in</p>
                  <p className="font-serif text-4xl sm:text-5xl text-foreground mb-3">
                    Guest #{guestNumber}
                  </p>
                  <p className="text-muted-foreground text-sm tracking-wide">
                    You are the <span className="text-accent font-medium">{getOrdinal(guestNumber)}</span> guest to register.
                  </p>
                  <p className="text-muted-foreground/50 text-xs mt-6 tracking-[0.15em] uppercase">
                    More details coming soon…
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <p className="text-accent/70 uppercase tracking-[0.3em] text-xs mb-8">
                  Register to attend
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-card/30 border-accent/15 text-foreground placeholder:text-muted-foreground/50 h-12 text-center tracking-wider"
                    required
                    maxLength={100}
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-card/30 border-accent/15 text-foreground placeholder:text-muted-foreground/50 h-12 text-center tracking-wider"
                    required
                    maxLength={255}
                  />

                  {error && (
                    <p className="text-destructive text-sm">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold tracking-[0.2em] uppercase text-sm h-12 shadow-gold transition-all duration-300"
                  >
                    {isSubmitting ? 'Registering…' : 'Enter the Conspiracy'}
                  </Button>
                </form>

                <p className="text-muted-foreground/40 text-xs mt-8 tracking-wider">
                  coming soon…
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default Event;
