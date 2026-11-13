import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Project";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Education from "../components/Education";
import Certificates from "../components/Certificates";
import Gallery from "../components/Gallery";
import Reveal from "../components/Reveal";
import SmoothScroll from "../components/SmoothScroll";
import { existsSync } from "node:fs";
import path from "node:path";

export default function Home() {
  const alternatePortrait = existsSync(path.join(process.cwd(), "public", "profile-spiderman.png"))
    ? "/profile-spiderman.png"
    : undefined;
  return (
    <Reveal>
      <SmoothScroll />
      <Navbar />
      <Hero alternatePortrait={alternatePortrait} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <div className="credentials-band">
        <div className="site-container credentials-grid">
          <Education />
          <Certificates />
        </div>
      </div>
      <Gallery />
      <Contact />
      <Footer />
    </Reveal>
  );
}
