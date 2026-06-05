import { AppProvider } from '@/AppContext';
import SmoothScroll from '@/components/SmoothScroll';
import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Stack from '@/components/Stack';
import Projects from '@/components/Projects';
import DevOps from '@/components/DevOps';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CursorBlob from '@/components/CursorBlob';

export default function Home() {
  return (
    <AppProvider>
      <SmoothScroll />
      <CursorBlob />
      <TopBar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Stack />
        <Projects />
        <DevOps />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  );
}
