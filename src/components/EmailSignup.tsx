import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("You're on the list!", {
      description: "We'll notify you the moment we launch.",
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-card/50 border-accent/30 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/30 h-12"
        required
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold tracking-wide uppercase text-sm px-8 h-12 shadow-gold transition-all duration-300 hover:shadow-[0_4px_40px_-5px_hsl(42_75%_50%_/_0.5)]"
      >
        {isSubmitting ? 'Joining...' : 'Notify Me'}
      </Button>
    </form>
  );
};

export default EmailSignup;
