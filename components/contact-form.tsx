import { ArrowUpRight } from "lucide-react";

export function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/anyphbett9@gmail.com"
      className="contact-form"
      method="POST"
    >
      <div className="form-heading">
        <h2>Send a note</h2>
        <p>Share a little about what you are building or looking for.</p>
      </div>
      <input name="_subject" type="hidden" value="New Portfolio Message" />
      <input name="_captcha" type="hidden" value="false" />
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input
          autoComplete="name"
          id="contact-name"
          name="name"
          placeholder="Your name"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          autoComplete="email"
          id="contact-email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>
      <div className="form-field full-width">
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          name="subject"
          placeholder="What would you like to discuss?"
          required
        />
      </div>
      <div className="form-field full-width">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="A few details are plenty..."
          required
          rows={6}
        />
      </div>
      <button className="button button-primary form-submit" type="submit">
        Send message
        <ArrowUpRight aria-hidden="true" size={15} />
      </button>
    </form>
  );
}
