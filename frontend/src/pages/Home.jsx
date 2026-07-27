import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Workflow from "../components/Workflow";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
function Home() {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <Problem/>
      <Workflow/>
      <CTA/>
      <Features/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default Home;