import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

export function Navbar() {
    const { auth } = usePage<PageProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <>
        <nav className="max-w-full mx-auto px-4 py-3 flex justify-between items-center border-b border-gray-200">
          {/* Left section with Menu and Rooms buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Menu</span>
            </button>
            
            <Link 
              href={route('rooms.index')}
              className="px-4 py-2 border border-blue-200 rounded-full text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Kamar</span>
            </Link>
          </div>

          {/* Center logo */}
          <Link 
            href={route('home')}
            className="text-3xl font-bold hover:scale-105 transition-transform duration-200 absolute left-1/2 transform -translate-x-1/2"
          >
            <span className="bg-blue-100 px-3 py-1 rounded-lg text-blue-600">Res</span><span className="text-gray-800">Tel</span>
          </Link>

          {/* Right section with auth buttons */}
          <div className="auth flex gap-3">
            {auth.user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center mr-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm flex items-center gap-3 transition-all duration-300 hover:shadow-md hover:border-blue-200 animate-fadeIn">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-inner">
                      <span className="font-bold text-sm">{auth.user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-blue-600 font-medium">Selamat datang,</span>
                      <span className="text-gray-800 font-semibold">{auth.user.name}</span>
                    </div>
                  </div>
                </div>
              
                <Link 
                  href={route('dashboard')}
                  className="px-4 py-2 border border-blue-100 rounded-full text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                
                <Link 
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="px-4 py-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-8 6a1 1 0 100-2H4a1 1 0 000 2h2z" clipRule="evenodd" />
                  </svg>
                  <span>Logout</span>
                </Link>
              </div>
            ) : (
              <>
                <a 
                  href={ route('login') }
                  target="_self"
                  className="px-4 py-2 border border-blue-100 rounded-full text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Login</span>
                </a>
                
                <a 
                  href={ route('register') }
                  target="_self"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  <span>Register</span>
                </a>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mx-4 mt-2 p-4 absolute z-50 left-0 right-0">
            <div className="flex flex-col space-y-3">
              <Link 
                href={route('home')}
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
              >
                Home
              </Link>
              <Link 
                href={route('rooms.index')}
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
              >
                Rooms
              </Link>
              <Link 
                href="#"
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
              >
                About Us
              </Link>
              <Link 
                href="#"
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all"
              >
                Contact
              </Link>
              
              <hr className="my-2" />
              
              {auth.user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                      <span className="font-bold text-sm">{auth.user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 font-medium">Selamat datang,</span>
                      <span className="text-gray-800 font-semibold">{auth.user.name}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-all text-left"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <a 
                    href="http://localhost:8000/login"
                    target="_self"
                    className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all text-left w-full"
                  >
                    Login
                  </a>
                  <a 
                    href="http://localhost:8000/register"
                    target="_self"
                    className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all text-left w-full"
                  >
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
} 