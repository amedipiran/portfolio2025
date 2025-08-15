import '../css/components/Footer.css';
import Logo from './Logo';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="Footer" className="footer">
            <div className="footer-inner">

                <div className="footer-top">
                    <Logo text="Piran" href="#index" className="logo--md" />
                </div>

                <div className="footer-cta">
                    <p className="footer-title">Let’s build something great.</p>
                    <p className="footer-sub">Available for collabs, gigs & coffee chats ☕</p>
                </div>

                <div className="contact-links" role="navigation" aria-label="Contact links">
                    <a
                        href="mailto:piran@robertopiranamedi.dev"
                        className="contact-link"
                        data-cursor-hover
                        aria-label="Email Piran"
                        title="Email"
                    >
                        📧 Email
                    </a>
                    <a
                        href="https://www.linkedin.com/in/robertopiranamedi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        data-cursor-hover
                        aria-label="LinkedIn profile"
                        title="LinkedIn"
                    >
                        💼 LinkedIn
                    </a>
                </div>
            </div>

            <p className="copyright">© {year} Roberto Piran Amedi</p>
        </footer>
    );
};

export default Footer;