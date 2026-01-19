import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FullPageContainer, FullPageSection } from '@/components/FullPageScroll';

const Privacy = () => {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navigation />
      <FullPageContainer>
        {/* Header Section */}
        <FullPageSection className="bg-background">
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-12"
              >
                <p className="text-gold uppercase tracking-[0.3em] text-xs mb-6">Legal</p>
                <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
                  Privacy Policy
                </h1>
                <p className="text-cream/60">
                  Last updated: January 2026
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 text-cream/80 leading-relaxed"
              >
                <section>
                  <h2 className="font-serif text-xl text-foreground mb-4">1. Introduction</h2>
                  <p>
                    Clasp ("we," "our," or "us") respects your privacy and is committed to protecting 
                    your personal data. This privacy policy explains how we collect, use, disclose, 
                    and safeguard your information when you visit our website or make a purchase.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-xl text-foreground mb-4">2. Information We Collect</h2>
                  <p className="mb-4">We may collect the following types of information:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, shipping address</li>
                    <li><strong className="text-foreground">Payment Information:</strong> Credit card details (processed securely through our payment providers)</li>
                    <li><strong className="text-foreground">Order Information:</strong> Purchase history, product preferences, wishlist items</li>
                    <li><strong className="text-foreground">Technical Information:</strong> IP address, browser type, device information, cookies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-xl text-foreground mb-4">3. How We Use Your Information</h2>
                  <p className="mb-4">We use your information for:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Processing and fulfilling your orders</li>
                    <li>Sending order confirmations and shipping updates</li>
                    <li>Responding to customer service inquiries</li>
                    <li>Sending promotional emails (with your consent)</li>
                    <li>Improving our website and products</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-xl text-foreground mb-4">4. Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information. 
                    All payment transactions are encrypted using SSL technology.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-xl text-foreground mb-4">5. Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-xl text-foreground mb-4">6. Contact Us</h2>
                  <p>
                    If you have questions about this privacy policy, please contact us at:
                  </p>
                  <div className="mt-4 p-6 bg-section-2 border border-gold/20 rounded">
                    <p><strong className="text-foreground">Clasp</strong></p>
                    <p className="text-gold">Email: privacy@clasp.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Address: 123 Fashion District, Mumbai, Maharashtra 400001, India</p>
                  </div>
                </section>
              </motion.div>
            </div>
          </div>
        </FullPageSection>

        <Footer />
      </FullPageContainer>
    </div>
  );
};

export default Privacy;
