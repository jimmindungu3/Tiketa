import Navbar from "../components/Navbar";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Slider from "../components/Slider";

const Home = ({ events }) => {
  return (
    <>
      <Navbar />
      <Slider />
      <Events events={events} />
      <Footer />
    </>
  );
};

export default Home;
