import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="https://cdn.prod.website-files.com/675c4bb1a6111f64bc92535b/675c4ff2a1636ad4ee500785_Untitled%20design%20(1).svg"
              alt="Tripwingz"
              className="h-8 sm:h-10 w-auto"
            />
          </a>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = 'https://www.tripwingz.com/login'}
            >
              Log in
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#1B1B1B]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1B1B1B]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden fixed inset-0 top-16 bg-white transition-transform duration-300
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <nav className="p-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = 'https://www.tripwingz.com/login'}
              className="w-full"
            >
              Log in
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}