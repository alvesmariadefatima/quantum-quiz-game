import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [animando, setAnimando] = useState(false);

  const toggleMenu = () => {
    if (!menuAberto) {
      setMenuAberto(true);
    } else {
      setAnimando(true);
      setTimeout(() => {
        setMenuAberto(false);
        setAnimando(false);
      }, 300);
    }
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full shadow z-50">
      <div className="flex items-center justify-between px-6 py-6 md:py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <img
            src="./atomo.png"
            alt="Logotipo Quantum Quiz"
            className="h-10 w-10"
          />
          <span className="font-semibold text-lg text-black">
            Quantum Quiz
          </span>
        </div>

        <div className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            Início
          </a>

          <Link to="/gameinstructions" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Regras do Jogo
          </Link>
          <a
            href="#simuladores"
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            Simuladores
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            Jogo versão 3D
          </a>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-purple-700 hover:text-purple-800 transition-colors"
        >
          {menuAberto && !animando ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuAberto && (
        <div
          className={`md:hidden bg-white text-purple-700 flex flex-col items-center space-y-2 py-4 shadow-md transform transition-all duration-300 ${
            animando ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
          }`}
        >
          {["Início", "Regras do Jogo", "Simuladores", "Jogo versão 3D"].map(
            (item, index) => (
              <a
                key={index}
                href="#"
                className="w-full text-center py-2 rounded font-medium hover:bg-purple-700 hover:text-white transition-colors duration-300"
                onClick={toggleMenu}
              >
                {item}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;