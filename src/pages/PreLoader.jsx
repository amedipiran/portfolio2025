import "../css/pages/PreLoader.css";

const PreLoader = ({ isHidden }) => {
    return (
        <div id="preloader" className={isHidden ? 'hidden' : ''}>
            <div className="loader-container">
                <svg viewBox="0 0 300 200"  xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradient-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#caf8ef" />
                            <stop offset="33%" stopColor="#ffb6c1" />
                            <stop offset="66%" stopColor="#8c9fba" />
                            <stop offset="100%" stopColor="#768aa8" />
                        </linearGradient>
                    </defs>
                    <text x="50%" y="50%" dy="1em" textAnchor="middle" className="text-body" fill="url(#gradient-fill)">
                        Piran
                    </text>
                    <text x="50%" y="50%" dy="1em" dx="1.72em" textAnchor="middle" className="text-body" fill="url(#gradient-fill)">
                        .
                    </text>

                </svg>
            </div>
        </div>
    );
};

export default PreLoader;