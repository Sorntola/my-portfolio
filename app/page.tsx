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

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Certificates />
      <Projects />
      <Skills />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}