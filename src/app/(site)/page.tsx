import { Identity } from "@/components/sections/identity";
import { Projects } from "@/components/sections/projects";
import { Philosophy } from "@/components/sections/philosophy";
import { Thinking } from "@/components/sections/thinking";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Projects />
      <Identity />
      <Philosophy />
      <Thinking />
      <Contact />
    </main>
  );
}
