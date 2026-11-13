"use client";
import { Award, Check } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
export default function Certificates() {
  const { t } = useLanguage();
  return <section id="certificates" className="credential-section reveal"><p className="eyebrow"><Award size={17} />{t("certificatesTitle")}</p><h2>{t("certificatesSubtitle")}</h2><div className="certificate-list">{[t("certificate1"), t("certificate2"), t("certificate3")].map((item) => <div key={item}><span><Check size={15} /></span><h3>{item}</h3></div>)}</div></section>;
}
