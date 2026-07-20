import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
function Home() {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <Problem/>
    </div>
  );
}

export default Home;