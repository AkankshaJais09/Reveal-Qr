import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Workflow from "../components/Workflow";
function Home() {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <Problem/>
      <Workflow/>
    </div>
  );
}

export default Home;