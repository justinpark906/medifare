function Search() {
    return (
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
    );
  }
  
  export default Search;