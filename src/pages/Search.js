import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';
import { useNavigate } from "react-router-dom";
const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Mock search function (Replace with real API call)
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`); // Redirect to search results page
    }
  };
  

  return (
    <div className="px-32">
      <Navbar />

      <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-6"> Dengen Allele Frequency Browser</h1>     
      </div>

      <div className="flex flex-col items-center p-6">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by gene, variant or region"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border rounded-lg w-96 shadow-sm focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {/* Example Searches */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Example Searches:</h3>
          <ul className="mt-2 text-blue-500">
            <li>
              <Link to="#" onClick={() => setQuery("PCSK9")}>PCSK9</Link>
            </li>
            <li> 
              <Link to="#" onClick={() => setQuery("chr11-102904-C-G")}>chr11-102904-C-G</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setQuery("chr13-32398489-A-T")}>chr13-32398489-A-T</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setQuery("chr1-55039479-55039500")}>chr1-55039479-55039500</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Centered Statement */}
      <div className="text-center px-6 py-8">
        <p className="text-md">
          The DenGen Allele Frequency Browser is a resource of variant allele frequencies and is being made publicly available.
          The dataset encompasses SNP and indel variant calls in 2,211 individuals from whole genome sequencing of all Danish DenGen participants.  <a href="http://10.62.55.108:3000/" className="text-blue-500 underline">Learn more about DenGen</a>. 
        </p>
      </div>

      <Footer />
      
      <Logos />
    </div>
  );
};

export default SearchComponent;
