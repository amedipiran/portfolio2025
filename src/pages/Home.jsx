import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Experience from "../components/Experience.jsx";
import Cursor from "../components/Cursor.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ArrowUp from "../components/ArrowUp.jsx";
import Education from "../components/Education.jsx";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Education />
            <Experience />
            <Cursor />
            <Footer />
            <ArrowUp />
        </>
    )
}

export default Home;