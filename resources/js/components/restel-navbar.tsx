export function Navbar() {
    return (
      <>
        <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <button className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <span>Menu</span>
      </button>

      <div className="text-3xl font-bold text-blue-600 hover:scale-105 transition-transform duration-200">
        <span className="bg-blue-100 px-3 py-1 rounded-lg">Res</span><span className="text-gray-800">Tel</span>
      </div>

      <div className="auth flex gap-3">
        <button className="px-4 py-2 border border-blue-100 rounded-full text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <span>Login</span>
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
          </svg>
          <span>Register</span>
        </button>
      </div>
    </nav>
      </>
    );
}
