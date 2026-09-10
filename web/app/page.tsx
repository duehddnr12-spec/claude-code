import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Fabric from "@/components/Fabric";
import Story from "@/components/Story";
import Purchase from "@/components/Purchase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Fabric />
        <Story />
        <Purchase />
      </main>
      <Footer />
    </div>
  );
}
