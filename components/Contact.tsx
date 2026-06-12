"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  FaGithub,
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
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
  const { t, language } = useLanguage();

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    <section
      id="contact"
      className="min-h-screen bg-slate-950 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {t("contactSmallTitle")}
          </p>

          <h2
            className={`text-4xl font-bold md:text-5xl ${
              language === "kh" ? "leading-[1.4]" : ""
            }`}
          >
            {t("contactTitle")}
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl text-slate-400 ${
              language === "kh" ? "leading-8" : ""
            }`}
          >
            {t("contactSubtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
            <h3 className="mb-6 text-2xl font-bold">
              {t("contactGetInTouch")}
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    {t("contactEmail")}
                  </p>
                  <p className="font-medium">sorntola2017@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    {t("contactPhone")}
                  </p>
                  <p className="font-medium">+855 XX XXX XXX</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    {t("contactLocation")}
                  </p>
                  <p className="font-medium">{t("contactCountry")}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
                {t("contactFollowMe")}
              </p>

              <div className="flex gap-4">
                <a
                  href="https://github.com/Sorntola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl text-white transition hover:bg-cyan-500 hover:text-slate-950"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.facebook.com/tola.noex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl text-white transition hover:bg-cyan-500 hover:text-slate-950"
                >
                  <FaFacebook />
                </a>

                <a
                  href="https://t.me/sorntola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl text-white transition hover:bg-cyan-500 hover:text-slate-950"
                >
                  <FaTelegram />
                </a>

                <a
                  href="https://www.linkedin.com/in/sorntola/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl text-white transition hover:bg-cyan-500 hover:text-slate-950"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur"
          >
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                {t("contactNameLabel")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contactNamePlaceholder")}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                {t("contactEmailLabel")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contactEmailPlaceholder")}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                {t("contactMessageLabel")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contactMessagePlaceholder")}
                rows={6}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? t("contactSending") : t("contactSendMessage")}
            </button>

            {success && (
              <p className="mt-4 text-center text-sm text-cyan-400">
                {success}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}