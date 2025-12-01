"use client"
import { useState } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='bg-white py-4 px-4 sm:px-6 sticky top-0 z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        {/* Logo */}
        <div className='flex items-center'>
          <h1 className='font-bold text-2xl text-gray-900 tracking-tight'>
            ask<span className="text-[#3a00a5]">PDF</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          <a href='#features' className='text-gray-600 hover:text-[#3a00a5] text-base font-medium transition-colors'>
            Features
          </a>
          <a href='#how-it-works' className='text-gray-600 hover:text-[#3a00a5] text-base font-medium transition-colors'>
            How it Works
          </a>
          <a href='#pricing' className='text-gray-600 hover:text-[#3a00a5] text-base font-medium transition-colors'>
            Pricing
          </a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className='hidden md:flex items-center space-x-4'>
          <a href="/signin" className="font-semibold text-[#3a00a5] hover:underline">
            Sign in
          </a>

          <a href="/chat" className='bg-[#3a00a5] hover:bg-[#2d0080] transition-colors text-white cursor-pointer px-6 py-2.5 rounded-lg text-base font-medium'>
            Start for Free
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-2 text-gray-600 hover:text-[#3a00a5] transition-colors'
            aria-label='Toggle menu'
            aria-expanded={isMenuOpen}
          >
            <div className="space-y-1.5">
              <span 
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span 
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span 
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white border-t border-gray-100 py-6 absolute left-0 right-0 z-40
                    transition-all duration-300 ease-in-out transform shadow-lg
                    ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <div className='flex flex-col space-y-4 max-w-6xl mx-auto px-4'>
          <a 
            href='#features' 
            className='text-gray-600 hover:text-[#3a00a5] text-lg font-medium py-2 rounded-lg transition-colors'
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href='#how-it-works' 
            className='text-gray-600 hover:text-[#3a00a5] text-lg font-medium py-2 rounded-lg transition-colors'
            onClick={() => setIsMenuOpen(false)}
          >
            How it Works
          </a>
          <a 
            href='#pricing' 
            className='text-gray-600 hover:text-[#3a00a5] text-lg font-medium py-2 rounded-lg transition-colors'
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </a>
          <div className='pt-6 mt-2 flex flex-col space-y-4 border-t border-gray-200'>
            <button className='text-gray-600 hover:text-[#3a00a5] text-lg font-medium py-2 rounded-lg text-left transition-colors'>
              Sign in
            </button>
            <button className='bg-[#3a00a5] hover:bg-[#2d0080] transition-colors text-white px-4 py-3 rounded-lg text-base font-medium w-full'>
              Start Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar