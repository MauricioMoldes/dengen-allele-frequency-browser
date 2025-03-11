import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';

const SearchResults = () => {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query"); // Get the query from the URL

  const handleRowClick = (ancestryGroup) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [ancestryGroup]: !prevState[ancestryGroup], // Toggle the visibility for the clicked ancestry group
    }));
  };

  useEffect(() => {
    // Fetch or generate the data based on the query
    if (query) {
      const fetchData = () => {
        const exampleData = [
          { AncestryGroup: "European", GeneticAncestry: "XX", Category: "Overall", AlleleCount: 637, AlleleNumber: 64034, Homozygotes: 5, AlleleFrequency: 0.009948 },
          { AncestryGroup: "African", GeneticAncestry: "XY", Category: "Overall", AlleleCount: 637, AlleleNumber: 64034, Homozygotes: 5, AlleleFrequency: 0.009948 },
          { AncestryGroup: "East Asian", GeneticAncestry: "XY", Category: "Overall", AlleleCount: 329, AlleleNumber: 33700, Homozygotes: 6, AlleleFrequency: 0.00993 },
          { AncestryGroup: "European", GeneticAncestry: "XX", Category: "XX", AlleleCount: 290, AlleleNumber: 29500, Homozygotes: 2, AlleleFrequency: 0.00981 },
          { AncestryGroup: "African", GeneticAncestry: "XY", Category: "XX", AlleleCount: 305, AlleleNumber: 30214, Homozygotes: 3, AlleleFrequency: 0.01009 },
          { AncestryGroup: "East Asian", GeneticAncestry: "XX", Category: "XX", AlleleCount: 305, AlleleNumber: 30214, Homozygotes: 3, AlleleFrequency: 0.01009 },
          { AncestryGroup: "European", GeneticAncestry: "XY", Category: "XY", AlleleCount: 332, AlleleNumber: 33820, Homozygotes: 4, AlleleFrequency: 0.01015 },
          { AncestryGroup: "African", GeneticAncestry: "XX", Category: "XY", AlleleCount: 312, AlleleNumber: 32000, Homozygotes: 4, AlleleFrequency: 0.01002 },
          { AncestryGroup: "East Asian", GeneticAncestry: "XY", Category: "XY", AlleleCount: 332, AlleleNumber: 33820, Homozygotes: 2, AlleleFrequency: 0.009817 },
        ];
        setData(exampleData);
      };

      fetchData();
    }
  }, [query]);

  // Group data by AncestryGroup
  const groupedData = data.reduce((acc, curr) => {
    if (!acc[curr.AncestryGroup]) {
      acc[curr.AncestryGroup] = [];
    }
    acc[curr.AncestryGroup].push(curr);
    return acc;
  }, {});

  return (
    <div className="px-32">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>

        {data.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300 mt-6">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-300 px-4 py-2">Genetic Ancestry</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Allele Count</th>
                <th className="border border-gray-300 px-4 py-2">Allele Number</th>
                <th className="border border-gray-300 px-4 py-2">Homozygotes</th>
                <th className="border border-gray-300 px-4 py-2">Allele Frequency</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).map((ancestryGroup, index) => (
                <React.Fragment key={index}>
                  {/* Overall Frequency Row with indicator */}
                  <tr
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200"
                    onClick={() => handleRowClick(ancestryGroup)}
                  >
                    <td
                      className="border border-gray-300 px-4 py-2 font-bold text-blue-600"
                      colSpan="6"
                    >
                      <span className="inline-flex items-center">
                        <span className="mr-2">Click to expand {ancestryGroup} - Overall Frequencies</span>
                        <span className="text-xl">
                          {expandedRows[ancestryGroup] ? (
                            <i className="fa fa-arrow-down"></i>
                          ) : (
                            <i className="fa fa-arrow-right"></i>
                          )}
                        </span>
                      </span>
                    </td>
                  </tr>
                  {groupedData[ancestryGroup]
                    .filter((item) => item.Category === "Overall")
                    .map((item, subIndex) => (
                      <tr key={subIndex} className="bg-white">
                        <td className="border border-gray-300 px-4 py-2"></td> {/* Empty Genetic Ancestry for all rows */}
                        <td className="border border-gray-300 px-4 py-2">{item.Category}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.AlleleCount}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.AlleleNumber}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.Homozygotes}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.AlleleFrequency}</td>
                      </tr>
                    ))}
                  {/* Expanded Rows for Other Categories */}
                  {expandedRows[ancestryGroup] &&
                    groupedData[ancestryGroup]
                      .filter((item) => item.Category !== "Overall")
                      .map((item, subIndex) => (
                        <tr key={subIndex} className="bg-white">
                          <td className="border border-gray-300 px-4 py-2"></td> {/* Empty Genetic Ancestry for all rows */}
                          <td className="border border-gray-300 px-4 py-2">{item.Category}</td>
                          <td className="border border-gray-300 px-4 py-2">{item.AlleleCount}</td>
                          <td className="border border-gray-300 px-4 py-2">{item.AlleleNumber}</td>
                          <td className="border border-gray-300 px-4 py-2">{item.Homozygotes}</td>
                          <td className="border border-gray-300 px-4 py-2">{item.AlleleFrequency}</td>
                        </tr>
                      ))}
                </React.Fragment>
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
                href="https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&highlight=hg38.chr13%3A32398489-32398489&position=chr13%3A32398464-32398514"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                UCSC Genome Browser
              </a>
            </li>
            <li>
              <a
                href="https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_canonicalid?canonicalid=CA26350"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                ClinGen Allele Registry
              </a>
            </li>
            <li>
              <a
                href="https://www.ncbi.nlm.nih.gov/clinvar/variation/38266/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                ClinVar
              </a>
            </li>
            <li>
              <a
                href={`https://databrowser.researchallofus.org/variants/${query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                All of Us
              </a>
            </li>
            <li>
              <a
                href={`https://afb.ukbiobank.ac.uk/variant/${query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                ukbiobank
              </a>
            </li>

            <li>
              <a
                href={`https://r12.finngen.fi/variant/${query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                FinnGen
              </a>
            </li>
            <li>
              <a
                href={`https://swefreq.nbis.se/dataset/SweGen/browser/variant/13-32972626-A-T`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                SweGen
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




