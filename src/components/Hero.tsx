
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center overflow-hidden bg-barbershop-black">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?q=80&w=2070&auto=format&fit=crop')",
          filter: "brightness(0.3)"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            EXPERIÊNCIA <span className="text-barbershop-gold">PREMIUM</span> EM BARBEARIA
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Cortes precisos, barbas perfeitas e ambiente exclusivo para homens que valorizam estilo e qualidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#booking" className="btn-primary">
              AGENDE SEU HORÁRIO
            </a>
            <a href="#services" className="btn-secondary">
              CONHEÇA NOSSOS SERVIÇOS
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-8 h-8 text-barbershop-gold" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
