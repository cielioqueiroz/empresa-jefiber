import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Sobre from "@/components/sections/Sobre";
import Solucoes from "@/components/sections/Solucoes";
import Servicos from "@/components/sections/Servicos";
import Infraestrutura from "@/components/sections/Infraestrutura";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Sobre />
      <Solucoes />
      <Servicos />
      <Infraestrutura />
      <Footer />
    </main>
  );
}
