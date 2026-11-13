"use client";
import { ArrowUp, CodeXml } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
export default function Footer() {
  const { t } = useLanguage();
  return <footer className="site-footer"><div className="site-container footer-inner"><a href="#home" className="brand"><CodeXml size={22} /><span>Tola<span className="brand-dot">.</span></span></a><p>{t("footerCopyright")}</p><a href="#home" className="footer-top">{t("backToTop")}<ArrowUp size={15} /></a></div></footer>;
}
