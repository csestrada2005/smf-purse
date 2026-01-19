import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FullPageContainer, FullPageSection } from '@/components/FullPageScroll';
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
    <div className="h-screen overflow-hidden bg-background">
      <Navigation />
      <FullPageContainer>
        {/* Main Content Section */}
        <FullPageSection className="bg-background">
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-12"
              >
                <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">Policies</p>
                <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
                  Returns & Shipping
                </h1>
                <p className="text-cream/80 text-lg">
                  We want you to love your Clasp purchase. Here's everything you need to know.
                </p>
              </motion.div>

              {/* Shipping Policy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-serif text-2xl text-foreground mb-4 flex items-center gap-3">
                  <span className="text-gold">✦</span> Shipping Policy
                </h2>
                <div className="space-y-3 text-cream/80 leading-relaxed">
                  <p>
                    <strong className="text-foreground">Processing Time:</strong> All orders are processed within 
                    2-3 business days.
                  </p>
                  <p>
                    <strong className="text-foreground">Delivery Time:</strong> Standard shipping takes 5-7 business 
                    days within India. Express shipping (2-3 business days) is available at checkout.
                  </p>
                  <p>
                    <strong className="text-foreground">Tracking:</strong> Once your order ships, you'll receive 
                    an email with tracking information.
                  </p>
                </div>
              </motion.div>

              {/* Returns Policy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-serif text-2xl text-foreground mb-4 flex items-center gap-3">
                  <span className="text-gold">✦</span> Returns Policy
                </h2>
                <div className="space-y-3 text-cream/80 leading-relaxed">
                  <p>
                    <strong className="text-foreground">Return Window:</strong> Returns and exchanges must be 
                    requested within <strong className="text-gold">15 days</strong> of receiving your order.
                  </p>
                  <p>
                    <strong className="text-foreground">Conditions:</strong> Items must be unused, unworn, and 
                    in original packaging with all tags attached.
                  </p>
                </div>
              </motion.div>

              {/* Return Request Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-section-2 p-6 sm:p-8 border border-gold/20 rounded"
              >
                <h2 className="font-serif text-xl text-foreground mb-4 text-center">
                  Request a Return
                </h2>
                
                {!showReturnForm ? (
                  <div className="text-center">
                    <p className="text-cream/70 mb-4">
                      Need to return or exchange an item? Click below to start your return request.
                    </p>
                    <Button 
                      onClick={() => setShowReturnForm(true)}
                      className="bg-gold text-noir hover:bg-gold-light"
                    >
                      Start Return Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleReturnSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                          Order Number *
                        </label>
                        <Input
                          name="orderNumber"
                          value={returnForm.orderNumber}
                          onChange={handleChange}
                          required
                          className="bg-background border-gold/20 focus:border-gold text-foreground placeholder:text-cream/40"
                          placeholder="e.g., CLQ-12345"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={returnForm.email}
                          onChange={handleChange}
                          required
                          className="bg-background border-gold/20 focus:border-gold text-foreground placeholder:text-cream/40"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                        Reason for Return *
                      </label>
                      <select
                        name="reason"
                        value={returnForm.reason}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-gold/20 focus:border-gold px-3 py-2 text-foreground rounded-md"
                      >
                        <option value="" className="bg-background text-foreground">Select a reason</option>
                        <option value="wrong-size" className="bg-background text-foreground">Wrong size</option>
                        <option value="not-as-expected" className="bg-background text-foreground">Not as expected</option>
                        <option value="defective" className="bg-background text-foreground">Defective/Damaged</option>
                        <option value="changed-mind" className="bg-background text-foreground">Changed my mind</option>
                        <option value="other" className="bg-background text-foreground">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                        Additional Details
                      </label>
                      <Textarea
                        name="description"
                        value={returnForm.description}
                        onChange={handleChange}
                        className="bg-background border-gold/20 focus:border-gold min-h-[80px] text-foreground placeholder:text-cream/40"
                        placeholder="Please provide any additional information..."
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setShowReturnForm(false)}
                        className="flex-1 border-gold/20 text-foreground hover:bg-gold/10"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-1 bg-gold text-noir hover:bg-gold-light"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Help */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <p className="text-cream/70">
                  Have questions? <Link to="/contact" className="text-gold hover:text-gold-light transition-colors">Contact us</Link> and 
                  we'll be happy to help.
                </p>
              </motion.div>
            </div>
          </div>
        </FullPageSection>

        <Footer />
      </FullPageContainer>
    </div>
  );
};

export default Shipping;
