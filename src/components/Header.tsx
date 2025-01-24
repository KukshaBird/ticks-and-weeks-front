import Logo from './../assets/favicon.svg';

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-gray-600 to-gray-800">
      {/*<header className="bg-gradient-to-b from-gray-200 to-gray-300">*/}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="flex -m-1.5 p-2 gap-2">
            <img className="h-8 w-auto" src={Logo} alt="logo" />
            <span className="sr-only sm:not-sr-only roboto-logo text-teal-500">Ticks&Weeks</span>
          </a>
        </div>
        <div style={{ justifyContent: 'end' }}>
          <button className="py-2 px-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all ease-in-out duration-300">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
