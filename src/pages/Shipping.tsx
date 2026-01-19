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
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">Policies</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
              Returns & Shipping
            </h1>
            <p className="text-muted-foreground text-lg">
              We want you to love your Clasp purchase. Here's everything you need to know.
            </p>
          </motion.div>

          {/* Shipping Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
              <span className="text-accent">✦</span> Shipping Policy
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Processing Time:</strong> All orders are processed within 
                2-3 business days. Orders placed on weekends or holidays will be processed the next business day.
              </p>
              <p>
                <strong className="text-foreground">Delivery Time:</strong> Standard shipping takes 5-7 business 
                days within India. Express shipping (2-3 business days) is available at checkout.
              </p>
              <p>
                <strong className="text-foreground">Shipping Window:</strong> Please allow up to 15 days from 
                the date of purchase for your order to arrive. If your order hasn't arrived within this window, 
                please contact us.
              </p>
              <p>
                <strong className="text-foreground">Tracking:</strong> Once your order ships, you'll receive 
                an email with tracking information to monitor your delivery.
              </p>
              <p>
                <strong className="text-foreground">International Shipping:</strong> Currently, we only ship 
                within India. International shipping coming soon.
              </p>
            </div>
          </motion.div>

          {/* Returns Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
              <span className="text-accent">✦</span> Returns Policy
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Return Window:</strong> Returns and exchanges must be 
                requested within <strong className="text-accent">15 days</strong> of receiving your order.
              </p>
              <p>
                <strong className="text-foreground">How to Request a Return:</strong> All return requests 
                must be submitted through our website using the form below. We do not accept returns via 
                email or phone.
              </p>
              <p>
                <strong className="text-foreground">Return Process:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>Submit a return request using the form below</li>
                <li>Our team will review your request within 2-3 business days</li>
                <li>If approved, you'll receive return instructions via email</li>
                <li>Ship the item back using the provided prepaid label</li>
                <li>Refund will be processed within 5-7 business days of receiving the item</li>
              </ol>
              <p>
                <strong className="text-foreground">Conditions:</strong> Items must be unused, unworn, and 
                in original packaging with all tags attached. Items showing signs of wear, damage, or 
                alterations will not be accepted.
              </p>
              <p>
                <strong className="text-foreground">Non-Returnable:</strong> Personalized or custom-made 
                items cannot be returned unless defective.
              </p>
            </div>
          </motion.div>

          {/* Return Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-muted/5 p-8 sm:p-12 border border-accent/10"
          >
            <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
              Request a Return
            </h2>
            
            {!showReturnForm ? (
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Need to return or exchange an item? Click below to start your return request.
                </p>
                <Button 
                  onClick={() => setShowReturnForm(true)}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Start Return Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Order Number *
                    </label>
                    <Input
                      name="orderNumber"
                      value={returnForm.orderNumber}
                      onChange={handleChange}
                      required
                      className="bg-background border-accent/20 focus:border-accent"
                      placeholder="e.g., CLQ-12345"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={returnForm.email}
                      onChange={handleChange}
                      required
                      className="bg-background border-accent/20 focus:border-accent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Reason for Return *
                  </label>
                  <select
                    name="reason"
                    value={returnForm.reason}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-accent/20 focus:border-accent px-3 py-2 text-foreground rounded-md"
                  >
                    <option value="">Select a reason</option>
                    <option value="wrong-size">Wrong size</option>
                    <option value="not-as-expected">Not as expected</option>
                    <option value="defective">Defective/Damaged</option>
                    <option value="changed-mind">Changed my mind</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    Additional Details
                  </label>
                  <Textarea
                    name="description"
                    value={returnForm.description}
                    onChange={handleChange}
                    className="bg-background border-accent/20 focus:border-accent min-h-[120px]"
                    placeholder="Please provide any additional information that will help us process your return..."
                  />
                </div>
                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowReturnForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 bg-foreground text-background hover:bg-foreground/90"
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
            className="text-center mt-16"
          >
            <p className="text-muted-foreground">
              Have questions? <Link to="/contact" className="text-accent hover:text-foreground transition-colors">Contact us</Link> and 
              we'll be happy to help.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shipping;
