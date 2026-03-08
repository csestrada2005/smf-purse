import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Shipping = () => {
  const { toast } = useToast();
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    email: '',
    reason: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Return Request Submitted",
      description: "We will review your request and respond within 2-3 business days.",
    });
    setReturnForm({ orderNumber: '', email: '', reason: '', description: '' });
    setShowReturnForm(false);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReturnForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">Policies</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
              Returns & Shipping
            </h1>
            <p className="text-muted-foreground text-lg">
              We want you to love your Clasp purchase. Here's everything you need to know.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl text-foreground mb-4 flex items-center gap-3">
              <span className="text-accent">✦</span> Shipping Policy
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground">Processing Time:</strong> All orders are processed within 2-3 business days.</p>
              <p><strong className="text-foreground">Delivery Time:</strong> Standard shipping takes 5-7 business days within India. Express shipping (2-3 business days) is available at checkout.</p>
              <p><strong className="text-foreground">Tracking:</strong> Once your order ships, you'll receive an email with tracking information.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl text-foreground mb-4 flex items-center gap-3">
              <span className="text-accent">✦</span> Returns Policy
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground">Return Window:</strong> Returns and exchanges must be requested within <strong className="text-accent">15 days</strong> of receiving your order.</p>
              <p><strong className="text-foreground">Conditions:</strong> Items must be unused, unworn, and in original packaging with all tags attached.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-section-2 p-6 sm:p-8 border border-accent/20 rounded"
          >
            <h2 className="font-serif text-xl text-foreground mb-4 text-center">Request a Return</h2>
            
            {!showReturnForm ? (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Need to return or exchange an item? Click below to start your return request.</p>
                <Button onClick={() => setShowReturnForm(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Return Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Order Number *</label>
                    <Input name="orderNumber" value={returnForm.orderNumber} onChange={handleChange} required className="bg-background border-accent/20 focus:border-accent text-foreground placeholder:text-muted-foreground" placeholder="e.g., CLQ-12345" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email Address *</label>
                    <Input name="email" type="email" value={returnForm.email} onChange={handleChange} required className="bg-background border-accent/20 focus:border-accent text-foreground placeholder:text-muted-foreground" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Reason for Return *</label>
                  <select name="reason" value={returnForm.reason} onChange={handleChange} required className="w-full bg-background border border-accent/20 focus:border-accent px-3 py-2 text-foreground rounded-md">
                    <option value="">Select a reason</option>
                    <option value="wrong-size">Wrong size</option>
                    <option value="not-as-expected">Not as expected</option>
                    <option value="defective">Defective/Damaged</option>
                    <option value="changed-mind">Changed my mind</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Additional Details</label>
                  <Textarea name="description" value={returnForm.description} onChange={handleChange} className="bg-background border-accent/20 focus:border-accent min-h-[80px] text-foreground placeholder:text-muted-foreground" placeholder="Please provide any additional information..." />
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setShowReturnForm(false)} className="flex-1 border-accent/20 text-foreground hover:bg-accent/10">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">{isSubmitting ? 'Submitting...' : 'Submit Request'}</Button>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-muted-foreground">
              Have questions? <Link to="/contact" className="text-accent hover:text-accent/80 transition-colors">Contact us</Link> and we'll be happy to help.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
