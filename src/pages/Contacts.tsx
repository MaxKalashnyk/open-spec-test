import { ContactForm } from '@/components/contacts/ContactForm';

export function Contacts() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">
          Have a question or want to get in touch? Send us a message.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}

