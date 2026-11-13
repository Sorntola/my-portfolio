"use client";

import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  FaGithub,
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");
  const [isSending, setIsSending] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  }

  function validateForm() {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contactNameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contactEmailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t("contactEmailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contactMessageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSending(true);
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Message could not be saved");

      setSuccess(t("contactSuccess"));
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setSuccess(t("contactError"));
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="contact" className="contact-section section-space">
      <div className="site-container contact-grid">
        <div className="contact-copy reveal">
          <p className="eyebrow">{t("contactTitle")}</p>
          <h2>{t("contactHeadline")}</h2>
          <p className="body-copy">{t("contactSubtitle")}</p>
          <a href="mailto:sorntola2017@gmail.com" className="contact-email"><FaEnvelope aria-hidden="true" /><span>sorntola2017@gmail.com</span><ArrowUpRight size={18} /></a>
          <p className="contact-location"><FaMapMarkerAlt aria-hidden="true" />{t("heroLocation")}, {t("contactCountry")}</p>
          <div className="contact-socials"><p className="eyebrow">{t("contactFollowMe")}</p><div>
            {[{ name: "GitHub", url: "https://github.com/Sorntola", icon: FaGithub }, { name: "LinkedIn", url: "https://www.linkedin.com/in/sorntola/", icon: FaLinkedin }, { name: "Facebook", url: "https://www.facebook.com/tola.noex", icon: FaFacebook }, { name: "Telegram", url: "https://t.me/sorntola", icon: FaTelegram }].map(({ name, url, icon: Icon }) => <a key={name} href={url} aria-label={name} target="_blank" rel="noopener noreferrer"><Icon /></a>)}
          </div></div>
        </div>
        <form onSubmit={handleSubmit} className="contact-form reveal">
          <div className="form-heading"><span><Send size={20} /></span><div><h3>{t("contactGetInTouch")}</h3><p>{t("contactNote")}</p></div></div>
          <div className="form-two-columns">
            <div><label htmlFor="contact-name">{t("contactNameLabel")}</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} value={formData.name} onChange={handleChange} placeholder={t("contactNamePlaceholder")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <p id="name-error" className="form-error">{errors.name}</p>}</div>
            <div><label htmlFor="contact-email">{t("contactEmailLabel")}</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={formData.email} onChange={handleChange} placeholder={t("contactEmailPlaceholder")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <p id="email-error" className="form-error">{errors.email}</p>}</div>
          </div>
          <div><label htmlFor="contact-message">{t("contactMessageLabel")}</label><textarea id="contact-message" name="message" required maxLength={5000} value={formData.message} onChange={handleChange} placeholder={t("contactMessagePlaceholder")} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <p id="message-error" className="form-error">{errors.message}</p>}</div>
          <button type="submit" disabled={isSending} className="button-primary">{isSending ? t("contactSending") : t("contactSendMessage")}<ArrowUpRight size={17} /></button>
          {success && <p role="status" className="form-status">{success}</p>}
        </form>
      </div>
    </section>
  );
}
