import React from 'react';

const LottieAnimation = () => {
  const lottieHtml = `
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player 
      src="https://lottie.host/0e18592b-0e2e-4b9d-b85e-c1d94825da5f/H5QRroLgbH.json" 
      background="#fff" 
      speed="1" 
      style="width: 300px; height: 300px; object-fit: cover;" 
      loop 
      autoplay 
      direction="1" 
      mode="normal"
    ></lottie-player>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: lottieHtml }} />
  );
};

export default LottieAnimation;
