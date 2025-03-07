import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';



const SearchResults = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query"); // Get the query from the URL

  useEffect(() => {
    // Fetch or generate the data based on the query
    // For demonstration, we are just using a static array
    // You would replace this with an actual API request or data fetch
    if (query) {
      const fetchData = () => {
        const exampleData = [
          { VariantID: "21-19653341-AT-A", rsID: "rs2072689087", AlleleCount: 50, AlleleNumber: 2, AlleleFrequency: 0.05, Homozygotes: 2 },
          { VariantID: "21-19653342-AT-G", rsID: "rs2072689088", AlleleCount: 40, AlleleNumber: 1, AlleleFrequency: 0.04, Homozygotes: 1 },
          // Add more sample data or fetch from an API
        ];
        setData(exampleData);
      };

      fetchData();
    }
  }, [query]);

  return (
    
      <div className="px-32">
      
       <Navbar />
          

    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>
      
      {data.length > 0 ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">VariantID</th>
              <th className="border p-2">rsID</th>
              <th className="border p-2">Allele Count</th>
              <th className="border p-2">Allele Number</th>
              <th className="border p-2">Allele Frequency</th>
              <th className="border p-2">Number of Homozygotes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.VariantID}</td>
                <td className="border p-2">{item.rsID}</td>
                <td className="border p-2">{item.AlleleCount}</td>
                <td className="border p-2">{item.AlleleNumber}</td>
                <td className="border p-2">{item.AlleleFrequency}</td>
                <td className="border p-2">{item.Homozygotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found for the search query.</p>
      )}
        <div className="mt-6">
  <h3 className="text-lg font-semibold">External Resources</h3>
  <ul>
    <li>
      <a 
        href={`https://gnomad.broadinstitute.org/variant/${query}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        gnomAD
      </a>
    </li>
    <li>
      <a 
        href={`https://www.ncbi.nlm.nih.gov/snp/${query}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        dbSNP
      </a>
    </li>
    <li>
      <a 
        href="https://genome.ucsc.edu/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        UCSC Genome Browser
      </a>
    </li>
    <li>
      <a 
        href="https://clinicalgenome.org/variant/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        ClinGen Allele Registry
      </a>
    </li>
    <li>
      <a 
        href="https://allofus.nih.gov/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        All of Us
      </a>
    </li>
  </ul>
</div>

    </div>

      <Footer />

      <Logos />

    </div>
  );
};

export default SearchResults;
