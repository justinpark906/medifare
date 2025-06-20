import React, { useState } from 'react';
const API_URL = 'https://medifare.onrender.com';

function Search() {
  const [hospitalInput, setHospitalInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [matchedLabel, setMatchedLabel] = useState('');


  const RESULTS_PER_PAGE = 10;

  const handleSearch = async () => {
    if (!hospitalInput.trim() && !locationInput.trim() && !serviceInput.trim()) {
      setError('Please enter at least one search field.');
      setResults([]);
      return;
    }

    try {
      const query = new URLSearchParams();
      if (hospitalInput) query.append('hospital', hospitalInput);
      if (locationInput) query.append('location', locationInput);
      if (serviceInput) query.append('service', serviceInput);

      const response = await fetch(`${API_URL}/api/search?${query}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data);
        setError('');
        setCurrentPage(1);

        if (hospitalInput && data.length > 0 && data[0].hospitalName) {
          setMatchedLabel(data[0].hospitalName);
        } else if (serviceInput) {
          setMatchedLabel(serviceInput);
        } else if (hospitalInput || locationInput) {
          setMatchedLabel(hospitalInput || locationInput);
        } else {
          setMatchedLabel('');
        }
      } else {
        setResults([]);
        setError(data.error || 'Error fetching data.');
        setMatchedLabel('');
      }
    } catch (err) {
      console.error(err);
      setError('Server error.');
      setResults([]);
      setMatchedLabel('');
    }
  };

  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);

  return (
    <main>
      <h1>Discover the cost of your care.</h1>
      <p>
        Ever wonder why you were charged $245 for a 30-second lab test?
        We are launching a search service to help you learn the market-rate of healthcare!
        Because health is wealth—it shouldn’t break the bank.
      </p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Hospital"
          value={hospitalInput}
          onChange={(e) => setHospitalInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Location (City or Zip)"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Service (e.g., Aldosterone)"
          value={serviceInput}
          onChange={(e) => setServiceInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && matchedLabel && (
        <h2 className="results-heading">
          Search results for "{matchedLabel}"
        </h2>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {paginatedResults.map((item, index) => (
          <li key={index} className="result-card">
            <details>
              <summary><strong>Service:</strong> {item.Description}</summary>
              <p><strong>Cash Pay:</strong> ${item["Cash Pay"]}</p>
              <p><strong>Plan:</strong> {item["Insurance Plan"]}</p>
              <p><strong>Hospital:</strong> {item.hospitalName}</p>
            </details>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </main>
  );
}

export default Search;
