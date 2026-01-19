import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Privacy = () => {
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
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">Legal</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12 text-muted-foreground leading-relaxed"
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
                <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, shipping address, billing address</li>
                <li><strong className="text-foreground">Payment Information:</strong> Credit card details (processed securely through our payment providers)</li>
                <li><strong className="text-foreground">Order Information:</strong> Purchase history, product preferences, wishlist items</li>
                <li><strong className="text-foreground">Technical Information:</strong> IP address, browser type, device information, cookies</li>
                <li><strong className="text-foreground">Communication Data:</strong> Emails, messages, and feedback you send us</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Processing and fulfilling your orders</li>
                <li>Sending order confirmations and shipping updates</li>
                <li>Responding to customer service inquiries</li>
                <li>Sending promotional emails (with your consent)</li>
                <li>Improving our website and products</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">4. Information Sharing</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong className="text-foreground">Service Providers:</strong> Shipping companies, payment processors, email services</li>
                <li><strong className="text-foreground">Business Partners:</strong> Third parties who help us operate our business</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4">
                We do not sell, trade, or rent your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from 
                unauthorized access, alteration, disclosure, or destruction. All payment transactions 
                are encrypted using SSL technology. However, no method of transmission over the 
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">6. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, 
                analyze site traffic, and personalize content. You can control cookie settings through 
                your browser preferences. Disabling cookies may limit some website functionality.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes 
                outlined in this policy, unless a longer retention period is required by law. Order 
                information is retained for record-keeping and legal compliance purposes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for 
                the privacy practices or content of these external sites. We encourage you to read 
                their privacy policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">10. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 16 years of age. We do not knowingly 
                collect personal information from children. If you believe we have collected 
                information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">11. Updates to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Changes will be posted on this 
                page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">12. Contact Us</h2>
              <p>
                If you have questions about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-muted/5 border border-accent/10">
                <p><strong className="text-foreground">Clasp</strong></p>
                <p>Email: privacy@clasp.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: 123 Fashion District, Mumbai, Maharashtra 400001, India</p>
              </div>
            </section>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
