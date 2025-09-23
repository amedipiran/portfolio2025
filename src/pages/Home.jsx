import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Experience from "../components/Experience.jsx";
import Cursor from "../components/Cursor.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Cursor />
            <Footer />
        </>
    )
}

export default Home;