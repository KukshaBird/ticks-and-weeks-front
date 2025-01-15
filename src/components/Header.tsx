export default function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <p>Logo + Name</p>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      <div style={{ justifyContent: 'end' }}>
        <button>Login</button>
      </div>
    </header>
  );
}
