import Logo from './../assets/favicon.svg';

export default function Header() {
  return (
    <header className="h-20 bg-white border-b-2 border-green-500">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="flex -m-1.5 p-2 gap-2">
            <img className="h-8 w-auto" src={Logo} alt="logo" />
            <span className="sr-only sm:not-sr-only roboto-logo text-green-500">Ticks&Weeks</span>
          </a>
        </div>
        <div style={{ justifyContent: 'end' }}>
          <button className="btn-primary">Login</button>
        </div>
      </nav>
    </header>
  );
}
