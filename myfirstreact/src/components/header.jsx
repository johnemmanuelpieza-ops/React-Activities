import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="text-white font-bold text-lg">
          CozyLiger
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;