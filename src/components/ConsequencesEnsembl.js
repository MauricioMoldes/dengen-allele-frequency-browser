import React, { useState, useEffect } from "react";


 {/* Third  Table for Consequences (Ensembl) */}

const ConsequencesEnsembl  = ({ query }) => {
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

 <h2 className="text-lg font-semibold mt-6">Ensembl Consequences</h2>
 <div className="overflow-x-auto">
   <table className="min-w-full table-auto border-collapse border border-gray-200">
     <thead>
       <tr className="bg-gray-100">
         <th className="px-4 py-2 border">AA Ref</th>
         <th className="px-4 py-2 border">AA Alt</th>
         <th className="px-4 py-2 border">Canonical</th>
         <th className="px-4 py-2 border">Protein Coding</th>
         <th className="px-4 py-2 border">Consequences</th>
         <th className="px-4 py-2 border">Exon Rank</th>
         <th className="px-4 py-2 border">Exon Count</th>
         <th className="px-4 py-2 border">HGVS c</th>
         <th className="px-4 py-2 border">HGVS p</th>
         <th className="px-4 py-2 border">Transcript</th>
         <th className="px-4 py-2 border">Protein ID</th>
         <th className="px-4 py-2 border">Amino Acid Start</th>
         <th className="px-4 py-2 border">Amino Acid Length</th>
         <th className="px-4 py-2 border">CDS Start</th>
         <th className="px-4 py-2 border">CDS Length</th>
         <th className="px-4 py-2 border">cDNA Start</th>
         <th className="px-4 py-2 border">cDNA Length</th>
         <th className="px-4 py-2 border">MANE Select</th>
       </tr>
     </thead>
     <tbody>
       {variantData[0].consequences_ensembl.map((consequence, index) => (
         <tr key={index} className="hover:bg-gray-50">
           <td className="px-4 py-2 border">{consequence.aa_ref}</td>
           <td className="px-4 py-2 border">{consequence.aa_alt}</td>
           <td className="px-4 py-2 border">{consequence.canonical ? 'Yes' : 'No'}</td>
           <td className="px-4 py-2 border">{consequence.protein_coding ? 'Yes' : 'No'}</td>
           <td className="px-4 py-2 border">{consequence.consequences.join(', ')}</td>
           <td className="px-4 py-2 border">{consequence.exon_rank}</td>
           <td className="px-4 py-2 border">{consequence.exon_count}</td>
           <td className="px-4 py-2 border">{consequence.hgvs_c}</td>
           <td className="px-4 py-2 border">{consequence.hgvs_p}</td>
           <td className="px-4 py-2 border">{consequence.transcript}</td>
           <td className="px-4 py-2 border">{consequence.protein_id}</td>
           <td className="px-4 py-2 border">{consequence.aa_start}</td>
           <td className="px-4 py-2 border">{consequence.aa_length}</td>
           <td className="px-4 py-2 border">{consequence.cds_start}</td>
           <td className="px-4 py-2 border">{consequence.cds_length}</td>
           <td className="px-4 py-2 border">{consequence.cdna_start}</td>
           <td className="px-4 py-2 border">{consequence.cdna_length}</td>
           <td className="px-4 py-2 border">{consequence.mane_select}</td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
 </div>

);
};

export default ConsequencesEnsembl;