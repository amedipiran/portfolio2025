import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../css/DotLottie.css';

const DotLottie = () => {
  return (
    <div className="lottie-container">
      <DotLottieReact
          src="https://lottie.host/ad3c33f6-b62f-476c-8be7-c32f11538aaf/hXstRcQU88.lottie"    
          loop
          autoplay
      />
    </div>
  );
};

export default DotLottie;