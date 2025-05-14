import React, { useState, useEffect } from "react";

const VariantInformation = ({ query }) => {
  const [variantData, setVariantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVariantData = async () => {
      try {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = "https://api.genebe.net/cloud/api-public/v1/variant?chr=6&pos=160585140&ref=T&alt=G&genome=hg38";
  
        const response = await fetch(apiUrl, {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",           
          },
        });
  
        if (!response.ok) throw new Error("Failed to fetch data");
  
        const data = await response.json();
        setVariantData(data);
      } catch (error) {
        console.error("Error fetching variant data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVariantData();
  }, [query]);

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
      <h2 className="text-lg font-semibold mt-6">Variant Information</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Chromosome</th>
              <th className="px-4 py-2 border">Position</th>
              <th className="px-4 py-2 border">Reference</th>
              <th className="px-4 py-2 border">Alternative</th>
              <th className="px-4 py-2 border">Effect</th>
            </tr>
          </thead>
          <tbody>
            {variantData.map((variant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{variant.chr}</td>
                <td className="px-4 py-2 border">{variant.pos}</td>
                <td className="px-4 py-2 border">{variant.ref}</td>
                <td className="px-4 py-2 border">{variant.alt}</td>
                <td className="px-4 py-2 border">{variant.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
            <h3 className="text-lg font-semibold">Variant External Resources</h3>
            <div className="flex flex-wrap gap-4">
                {[
                { name: "Varsome variant", url: `https://varsome.com/variant/hg38/${query}` },
                { name: "Varsome position", url: `https://gnomad.broadinstitute.org/variant/${query}` },
                { name: "GnomAD 4", url: `https://gnomad.broadinstitute.org/variant/${query}?dataset=gnomad_r4/` },
                { name: "GnomAD 3", url: `https://gnomad.broadinstitute.org/variant/${query}?dataset=gnomad_r3/` },
                { name: "GnomAD 2 (hg19)", url: `https://gnomad.broadinstitute.org/variant/${query}?dataset=gnomad_r2_1` },
                { name: "Regeneron ME", url: `https://gnomad.broadinstitute.org/variant/${query}` },
                { name: "Bravo", url: `https://gnomad.broadinstitute.org/variant/${query}` },
                { name: "dbSNP", url: `https://gnomad.broadinstitute.org/variant/${query}` },
                { name: "LitVar", url: `https://gnomad.broadinstitute.org/variant/${query}` },
                { name: "All of us", url: `https://gnomad.broadinstitute.org/variant/${query}` },
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

export default VariantInformation;
