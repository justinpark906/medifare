import './App.css';

function App() {
  return (
    <div className="app">
      <header className="new-header">
        <div className="logo-center">
          <img src="/logo.png" alt="Logo" className="logo-icon" />
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </nav>
        <div className="auth-buttons">
          <button className="login">Log In</button>
          <button className="signup">Sign Up</button>
        </div>
      </header>

      <main>
        <h1>
          Find the right <span className="highlight">healthcare</span> for you
        </h1>
        <p>
          Search through thousands of healthcare providers, specialists, and
          services to find the perfect match for your needs.
        </p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for healthcare services, specialists"
          />
          <input
            type="text"
            placeholder="Location (City, State, or Zip)"
          />
          <button onClick={() => alert('Search clicked!')}>Search</button>
        </div>
      </main>
    </div>
  );
}

export default App;