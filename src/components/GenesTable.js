import React, { useState, useEffect } from "react";

const GeneInformation = ({ query }) => {
  const [variantData, setVariantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeneData = async () => {
      try {
        const apiUrl = await fetch(`https://cors-anywhere.herokuapp.com/https://api.genebe.net/cloud/api-public/v1/variant?chr=6&pos=160585140&ref=T&alt=G&genome=hg38`);

        const response = await fetch(apiUrl, {
            mode: "cors", // Explicitly set CORS mode
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Failed to fetch data");
          const result = await response.json();

        const data = await response.json();
        setVariantData(data);  // Set the response data to the state
        setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching gene data:", error);
        setLoading(false);
      }
    };

    fetchGeneData();
  }, [query]);  // Refetch data if query changes

  if (loading) {
    return (
        <div className="flex justify-center items-center">
        {/* Spinning Fidget Loader */}
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );  // Show loader while loading
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mt-6">Gene Information</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Transcript</th>
              <th className="px-4 py-2 border">Gene Symbol</th>
              <th className="px-4 py-2 border">Gene HGNC ID</th>
              <th className="px-4 py-2 border">dbSNP</th>
            </tr>
          </thead>
          <tbody>
            {variantData.map((variant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{variant.transcript}</td>
                <td className="px-4 py-2 border">{variant.gene_symbol}</td>
                <td className="px-4 py-2 border">{variant.gene_hgnc_id}</td>
                <td className="px-4 py-2 border">{variant.dbsnp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Gene External Resources</h3>
        <div className="flex flex-wrap gap-4">
            {[
            { name: "OMIM", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            { name: "Decipher", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            { name: "PubMed", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            { name: "NCBI", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            { name: "JAX", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            { name: "SFARI", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            { name: "GnomAD", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            { name: "GenCC", url: `https://gnomad.broadinstitute.org/variant/${query}` },
            ].map((resource, index) => (
            <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                {resource.name}
            </a>
            ))}
        </div>
        </div>

    </div>

    

            

  );
};

export default GeneInformation;
