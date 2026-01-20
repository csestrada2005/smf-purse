import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you within 24-48 hours."
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content with proper top padding for nav */}
      <main className="pt-24 pb-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }} className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">Get in Touch</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-cream/80 text-lg max-w-xl mx-auto">
              We'd love to hear from you. Whether you have a question about our products, 
              need assistance, or just want to say hello.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                      Name
                    </label>
                    <Input name="name" value={formData.name} onChange={handleChange} required className="bg-section-2 border-gold/20 focus:border-gold text-foreground placeholder:text-cream/40" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                      Email
                    </label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-section-2 border-gold/20 focus:border-gold text-foreground placeholder:text-cream/40" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                    Subject
                  </label>
                  <Input name="subject" value={formData.subject} onChange={handleChange} required className="bg-section-2 border-gold/20 focus:border-gold text-foreground placeholder:text-cream/40" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-cream/60 mb-2 block">
                    Message
                  </label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} required className="bg-section-2 border-gold/20 focus:border-gold min-h-[150px] text-foreground placeholder:text-cream/40" placeholder="Tell us more..." />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-gold text-noir hover:bg-gold-light font-medium">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="space-y-8">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-3">Visit Our Atelier</h3>
                <p className="text-cream/70 leading-relaxed">​Elan Mercado, Sector 80, Gurugram, Haryana 122012, India
                <br />
                  ​<br />
                  ​
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl text-foreground mb-3">Hours</h3>
                <p className="text-cream/70 leading-relaxed">
                  Monday – Friday: 10:00 AM – 7:00 PM<br />
                  Saturday: 11:00 AM – 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl text-foreground mb-3">Email</h3>
                <a href="mailto:hello@clasp.com" className="text-gold hover:text-gold-light transition-colors">Claspsmf@gmail.com</a>
              </div>

              <div>
                <h3 className="font-serif text-xl text-foreground mb-3">Phone</h3>
                <a href="tel:+919876543210" className="text-gold hover:text-gold-light transition-colors">+91 92178 28877</a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Contact;