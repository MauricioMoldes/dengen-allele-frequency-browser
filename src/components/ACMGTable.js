import React, { useState, useEffect } from "react";

const ACMGInformation = ({ query }) => {
  const [variantData, setVariantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchACMGData = async () => {
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
        console.error("Error fetching ACMG data:", error);
        setLoading(false);
      }
    };

    fetchACMGData();
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
      <h2 className="text-lg font-semibold mt-6">ACMG Information</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ACMG Score</th>
              <th className="px-4 py-2 border">ACMG Classification</th>
              <th className="px-4 py-2 border">ACMG Criteria</th>
            </tr>
          </thead>
          <tbody>
            {variantData.map((variant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{variant.acmg_score}</td>
                <td className="px-4 py-2 border">{variant.acmg_classification}</td>
                <td className="px-4 py-2 border">{variant.acmg_criteria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>






      
    </div>
  );
};

export default ACMGInformation;
