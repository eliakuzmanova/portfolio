import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
// import Hobbies from '@/components/Hobbies';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
// import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden w-full">
      <Navigation />
      <Hero />
      <About />
      {/* <Hobbies /> */}
      <Projects />
      <Skills />
      {/* <Contact /> */}
      <Footer />
    </main>
  );
}

