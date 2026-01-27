import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Philosophy } from "@/components/sections/philosophy";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Philosophy />
      <Contact />
    </main>
  );
}
