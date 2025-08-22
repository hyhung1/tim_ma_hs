import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchCode, setSearchCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allData, setAllData] = useState(null);
  const [loadingAll, setLoadingAll] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchCode.trim()) {
      setError('Please enter an HS code');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`/api/lookup/${encodeURIComponent(searchCode.trim())}`);
      
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchCode(e.target.value);
    if (error) setError('');
  };

  const handleViewAll = async () => {
    setLoadingAll(true);
    setError('');
    
    try {
      const response = await axios.get('/api/all');
      
      if (response.data.success) {
        setAllData(response.data.data);
        setShowAll(true);
        // Hide individual search result when showing all data
        setResult(null);
      } else {
        setError('Failed to load all data');
      }
    } catch (err) {
      console.error('Error fetching all data:', err);
      setError('An error occurred while loading all data. Please try again.');
    } finally {
      setLoadingAll(false);
    }
  };

  const handleHideAll = () => {
    setShowAll(false);
    setAllData(null);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>HS Code Lookup</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              value={searchCode}
              onChange={handleInputChange}
              placeholder="Enter HS code (e.g., 8471.30.90 or 84713090)"
              className="search-input"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="search-button"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        <div className="view-all-container">
          {!showAll ? (
            <button 
              onClick={handleViewAll}
              disabled={loadingAll}
              className="view-all-button"
            >
              {loadingAll ? 'Loading...' : 'View All HS Codes'}
            </button>
          ) : (
            <button 
              onClick={handleHideAll}
              className="hide-all-button"
            >
              Hide All Data
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result && (
          <div className="result-container">
            <h2>Search Result</h2>
            <table className="result-table">
              <thead>
                <tr>
                  <th>HS Code</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="hs-code-cell">{result.hsCode}</td>
                  <td className="content-cell">{result.content}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {showAll && allData && (
          <div className="all-data-container">
            <h2>All HS Codes ({allData.length} entries)</h2>
            <div className="table-wrapper">
              <table className="all-data-table">
                <thead>
                  <tr>
                    <th>HS Code</th>
                    <th>Content</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((item, index) => (
                    <tr key={index}>
                      <td className="hs-code-cell">{item.hsCode}</td>
                      <td className="content-cell">{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
