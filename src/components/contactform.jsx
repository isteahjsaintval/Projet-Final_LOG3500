import React, { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ContactForm = () => {
  const { language } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const isFr = language === 'fr';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus({ loading: false, success: true, message: isFr ? 'Message envoyé avec succès !' : 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, message: isFr ? 'Erreur lors de l’envoi.' : 'Error sending message.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, message: isFr ? 'Erreur serveur.' : 'Server error.' });
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>{isFr ? "Contactez-nous" : "Contact Us"}</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group-row">
            <input type="text" name="name" required placeholder={isFr ? "Nom" : "Name"} value={formData.name} onChange={handleChange} />
            <input type="email" name="email" required placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>
          <input type="text" name="subject" required placeholder={isFr ? "Sujet" : "Subject"} value={formData.subject} onChange={handleChange} />
          <textarea name="message" rows="5" required placeholder="Message..." value={formData.message} onChange={handleChange}></textarea>
          <button type="submit" disabled={status.loading}>{status.loading ? "..." : (isFr ? "Envoyer" : "Send")}</button>
          {status.message && <div className={`form-feedback ${status.success ? 'success' : 'error'}`}>{status.message}</div>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;