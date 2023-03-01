import Header from "./Header";
import Specials from "./Specials";
import Testimonials from "./Testimonials";
import About from "./About";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Specials />
        <Testimonials />
        <About />
      </main>
    </>
  );
}

export default Home;
