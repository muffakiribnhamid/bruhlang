import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Navbar = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <nav className={`bg-black p-4 md:p-8 ${theme}`}>
      <div className='flex flex-wrap items-center justify-between max-w-7xl mx-auto'>
        <div className="logo nav-logo">
          <p className='text-3xl md:text-4xl bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text font-bold logo-text'>BruhLang</p>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-red-500 focus:outline-none mobile-menu-button"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`w-full md:w-auto md:flex ${isMenuOpen ? 'block show' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-4 md:mt-0 space-y-2 md:space-y-0 nav-links">
            <a className='text-white hover:text-red-500 transition-colors duration-200 text-lg nav-link' >Home</a>
            <a className='text-white hover:text-red-500 transition-colors duration-200 text-lg nav-link' >Docs</a>
            <a className='text-white hover:text-red-500 transition-colors duration-200 text-lg nav-link' onClick={navigate('/about')}>Playground</a>
            <a className='text-white hover:text-red-500 transition-colors duration-200 text-lg nav-button' 
               href="https://github.com/muffakiribnhamid" 
               target="_blank" 
               rel="noopener noreferrer">
              GitHub <FaGithub className="icon" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
