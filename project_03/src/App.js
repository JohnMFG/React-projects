import './App.css';
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Card from "./components/Card"

//photos
import KatieZafImage from './images/katie-zaferes.png';
import WeddingImage from './images/wedding.png';
import BikeImage from './images/bike.png';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <section className='cards'>
        <Card
          img={KatieZafImage}
          rating="5.0"
          numberOfRated="6"
          country="USA"
          about="Life with Katie Zaferes"
          price="$136"
        />
        <Card
          img={WeddingImage}
          rating="5.0"
          numberOfRated="30"
          country="USA"
          about="Learn wedding photography"
          price="$125"
        />
        <Card
          img={BikeImage}
          rating="4.8"
          numberOfRated="2"
          country="USA"
          about="Group Mountain Biking"
          price="$50"
        />
      </section>
    </div>
  );
}

export default App;
