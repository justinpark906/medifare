function Search() {
    return (
      <main>
        <h1>
          Discover the cost of your care.
        </h1>
        <p>
        Ever wonder why were you charged $245 for a 30-second lab test? 
        We are launching a search service to help you learn the market-rate of healthcare! 
        Because health is wealth—it shouldn’t break the bank.
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