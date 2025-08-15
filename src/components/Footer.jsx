

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="Footer" className="footer">

            <p className="copyright">© {year} Roberto Piran Amedi</p>
        </footer>
    );
};

export default Footer;