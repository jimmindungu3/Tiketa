import Navbar from "../components/Navbar";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Slider from "../components/Slider";

const Home = ({ events, handlePage }) => {
  return (
    <>
      <Navbar />
      <Slider />
      <Events events={events} handlePage={handlePage} />
      <Footer />
    </>
  );
};

export default Home;
