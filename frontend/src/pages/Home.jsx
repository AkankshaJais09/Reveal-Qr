import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Workflow from "../components/Workflow";
import CTA from "../components/CTA";
function Home() {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <Problem/>
      <Workflow/>
      <CTA/>
    </div>
  );
}

export default Home;