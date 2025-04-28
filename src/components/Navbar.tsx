
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-barbershop-black text-white py-4 fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-oswald text-2xl font-bold tracking-wider text-barbershop-gold">
          PRIME CUT
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#services" className="hover:text-barbershop-gold transition-colors">
            Serviços
          </a>
          <a href="#barbers" className="hover:text-barbershop-gold transition-colors">
            Barbeiros
          </a>
          <a href="#booking" className="hover:text-barbershop-gold transition-colors">
            Agendar
          </a>
          <a href="#about" className="hover:text-barbershop-gold transition-colors">
            Sobre
          </a>
          <a href="#contact" className="hover:text-barbershop-gold transition-colors">
            Contato
          </a>
          <Link 
            to="/barber-panel" 
            className="bg-barbershop-gold text-barbershop-black px-4 py-2 font-medium hover:bg-opacity-90 transition-all"
          >
            Área do Barbeiro
          </Link>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-barbershop-black text-white absolute w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#services" className="hover:text-barbershop-gold transition-colors" onClick={toggleMenu}>
              Serviços
            </a>
            <a href="#barbers" className="hover:text-barbershop-gold transition-colors" onClick={toggleMenu}>
              Barbeiros
            </a>
            <a href="#booking" className="hover:text-barbershop-gold transition-colors" onClick={toggleMenu}>
              Agendar
            </a>
            <a href="#about" className="hover:text-barbershop-gold transition-colors" onClick={toggleMenu}>
              Sobre
            </a>
            <a href="#contact" className="hover:text-barbershop-gold transition-colors" onClick={toggleMenu}>
              Contato
            </a>
            <Link 
              to="/barber-panel" 
              className="bg-barbershop-gold text-barbershop-black px-4 py-2 font-medium hover:bg-opacity-90 transition-all text-center"
              onClick={toggleMenu}
            >
              Área do Barbeiro
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
