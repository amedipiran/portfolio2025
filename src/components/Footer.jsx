import '../css/components/Footer.css';
import Logo from './Logo';
import { Mail, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="footer" className="footer">
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
                        <Mail size={18} style={{ marginRight: '8px' }} />
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
                        <Linkedin size={18} style={{ marginRight: '8px' }} />
                    </a>
                    <a
                        href="https://github.com/amedipiran"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        data-cursor-hover
                        aria-label="GitHub profile"
                        title="GitHub"
                    >
                        <Github size={18} style={{ marginRight: '8px' }} />
                    </a>
                </div>
            </div>

            <p className="copyright">© {year} Roberto Piran Amedi</p>
        </footer>
    );
};

export default Footer;