import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { ContactForm } from './components/contact-form';

export const generateMetadata = async (): Promise<Metadata> => {
  return createMetadata({
    title: "Let's Talk About Your Business",
    description:
      'Schedule a consultation with our team to discuss how we can help streamline your operations and drive growth for your business.',
  });
};

const Contact = async () => {
  return <ContactForm />;
};

export default Contact;
