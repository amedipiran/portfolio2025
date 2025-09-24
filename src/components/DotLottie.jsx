import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../css/components/DotLottie.css';

const DotLottie = () => {
  return (
    <div className="lottie-container">
        <DotLottieReact
            src="https://lottie.host/5831daa9-03f0-4371-9956-5f47d59c7a9a/ineA8uW2Bg.lottie"
            loop
            autoplay
        />
    </div>
  );
};

export default DotLottie;