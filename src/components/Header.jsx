import { Link } from 'react-router-dom';

function Header() {
    return (
      <header className="new-header">
        <div className="logo-center">
          <img src="/logo.png" alt="Medifare Logo" className="logo-icon" />
        </div>
        <nav>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/privacy">Privacy Policy</Link>
          <Link className="nav-link" to="/terms">Terms of Service</Link>
        </nav>
        <div className="auth-buttons">
          <button className="login">Log In</button>
          <button className="signup">Sign Up</button>
        </div>
      </header>
    );
  }
  
  export default Header;