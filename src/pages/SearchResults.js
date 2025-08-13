import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';

import { Link } from "react-router-dom";
import config from '../config';

//const endpoint=`http://10.62.55.108:5050/api`
const endpoint=config.BEACON_API


const SearchResults = () => {
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query"); // Get the query from the URL
  const type = queryParams.get("type"); // Get the type from the URL
  const variantFromState = location.state?.variant;
  const [rsID, setRsID] = useState(null);
  
  
  
const [sortColumn, setSortColumn] = useState(null);
const [sortDirection, setSortDirection] = useState("asc");

const handleSort = (column) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    setSortColumn(column);
    setSortDirection("asc");
  }
};

const sortedData = [...data].sort((a, b) => {
  if (!sortColumn) return 0;

  const valA = a[sortColumn] ?? 0;
  const valB = b[sortColumn] ?? 0;

  return sortDirection === "asc" ? valA - valB : valB - valA;
});

  useEffect(() => {

    if (variantFromState) {
    setData([variantFromState]);
    setLoading(false);
    return;
  }
    
    if (!query || !type) return;
  
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        if (type === "variant") {

          setError(null);
          setLoading(true);

          const [chrom, pos, ref, alt] = query.split("-");
          if (!chrom || !pos || !ref || !alt) {
            throw new Error("Invalid variant format. Expected chr-pos-ref-alt.");
          }
          // To update
          const apiUrl = `${endpoint}/g_variants?start=${pos}&alternateBases=${alt}&referenceBases=${ref}&referenceName=${chrom.replace("chr", "")}&assemblyId=GRCh38&limit=1000000`;
  
          const response = await fetch(apiUrl, {
            headers: { "Content-Type": "application/json" },
          });
  
          if (!response.ok) throw new Error("Failed to fetch variant data");
          const result = await response.json();
  
          const parsedData = result.response?.resultSets?.[0]?.results.slice(0, 1).flatMap((variant) => {
            const frequencyData = variant.frequencyInPopulations?.[0]?.frequencies?.[0];
            if (frequencyData) {
              return [{
                VariantID: query,
                Category: "DenGen",
                AlleleCount: frequencyData.alleleCount,
                AlleleNumber: frequencyData.alleleNumber,
                Homozygotes: frequencyData.alleleCountHomozygous || 0,
                AlleleFrequency: frequencyData.alleleFrequency?.toFixed(6) || "N/A",
              }];
            }
            return [];
          }) || [];
  
          setData(parsedData);
  
        } else if (type === "gene") {

          setError(null);
          setLoading(true);

          // Step 1: Fetch gene coordinates
          const geneRes = await fetch(
            `https://rest.ensembl.org/lookup/symbol/homo_sapiens/${query}?content-type=application/json`
          );
          if (!geneRes.ok) throw new Error(`Gene ${query} not found`);
  
          const geneData = await geneRes.json();
          const { seq_region_name: chrom, start, end } = geneData;
  
          console.log(`Gene ${query} => chr${chrom}:${start}-${end}`);
  
          // Step 2: Fetch all variants in the region
          const regionUrl = `${endpoint}/g_variants?start=${start}&end=${end}&referenceName=${chrom}&assemblyId=GRCh38&limit=1000000`;
  
          const response = await fetch(regionUrl, {
            headers: { "Content-Type": "application/json" },
          });
  
          if (!response.ok) throw new Error("Failed to fetch regional variants");
  
          const result = await response.json();
          const variants = result.response?.resultSets?.[0]?.results || [];
  
          const parsedData = variants.flatMap((variant) => {
            const frequencyData = variant.frequencyInPopulations?.[0]?.frequencies?.[0];
            if (frequencyData) {
              const start = variant.variation?.location?.interval?.start?.value;
              const referenceBases = variant.variation?.referenceBases;
              const alternateBases = variant.variation?.alternateBases;
              const varID = `chr${chrom}-${start}-${referenceBases}-${alternateBases}`;
              return [{
                VariantID: varID,
                Category: "DenGen",
                AlleleCount: frequencyData.alleleCount,
                AlleleNumber: frequencyData.alleleNumber,
                Homozygotes: frequencyData.alleleCountHomozygous || 0,
                AlleleFrequency: frequencyData.alleleFrequency?.toFixed(6) || "N/A",
              }];
            }
            return [];
          });
  
          setData(parsedData);
        
        } else if (type === "region") {

          setError(null);
          setLoading(true);

          const regionMatch = query.match(/^chr(\w+)-(\d+)-(\d+)$/);
          if (!regionMatch) throw new Error("Invalid region format. Use chr1-start-end");

          const [, chrom, start, end] = regionMatch;

          console.log(`Region query => chr${chrom}:${start}-${end}`);

        
          const regionUrl = `${endpoint}/g_variants?start=${start}&end=${end}&referenceName=${chrom}&assemblyId=GRCh38&limit=1000000`;

          const response = await fetch(regionUrl, {
            headers: { "Content-Type": "application/json" },
          });
        
          if (!response.ok) throw new Error("Failed to fetch region variants");
        
          const result = await response.json();
          const variants = result.response?.resultSets?.[0]?.results || [];
        
          const parsedData = variants.flatMap((variant) => {
            const frequencyData = variant.frequencyInPopulations?.[0]?.frequencies?.[0];
            const start = variant.variation?.location?.interval?.start?.value;
            const referenceBases = variant.variation?.referenceBases;
            const alternateBases = variant.variation?.alternateBases;
        
            if (frequencyData && start !== undefined && referenceBases && alternateBases) {
              const varID = `chr${chrom}-${start}-${referenceBases}-${alternateBases}`;
              return [{
                VariantID: varID,
                Category: "DenGen",
                AlleleCount: frequencyData.alleleCount,
                AlleleNumber: frequencyData.alleleNumber,
                Homozygotes: frequencyData.alleleCountHomozygous || 0,
                AlleleFrequency: frequencyData.alleleFrequency?.toFixed(6) || "N/A",
              }];
            }
            return [];
          });
        
          setData(parsedData);
        
        
        }
        else {
          throw new Error(`Unsupported query type: ${type}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message); // Only shown after true failure
        setData([]);             // Optional: clear previous data
      } finally {
        setLoading(false);        // Always reset loading state
      }
      }    
  
    fetchData();
  }, [query, type]);


  let ucscUrl = "";
if (sortedData.length > 0 && sortedData[0].VariantID) {
  const variant = sortedData[0].VariantID; // e.g. "chr1-55043548-C-T"
  const [chrom, posStr] = variant.split("-");
  const pos = parseInt(posStr);
  const start = pos - 75;
  const end = pos + 75;
  ucscUrl = `https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&highlight=hg38.${chrom}%3A${pos}-${pos}&position=${chrom}%3A${start}-${end}`;
}

  const VariantLinks = ({ sortedData, type }) => { 

  React.useEffect(() => {
    console.log("useEffect triggered with sortedData:", sortedData);
    console.log("🔍 useEffect triggered with type:", type);
    if (type !== "variant") {
      console.log("⏭ Skipping rsID fetch — not a variant page");
      return;
    }

    if (!sortedData?.[0]?.VariantID) {
      console.log("⚠️ No VariantID found in sortedData");
      return;
    }

    const snv = sortedData[0].VariantID; // e.g. "chr1-55039506-C-A"
    console.log("🧬 SNV:", snv);

    const [chromosomeRaw, pos, ref, alt] = snv.split("-");
    const chr = chromosomeRaw || null;

    console.log("📌 Parsed:", { chr, pos, ref, alt });

    if (!chr || !pos || !ref || !alt) {
      console.log("❌ Missing parsed values — cannot fetch rsID");
      return;
    }

    const variantHGVS = `${chr}:${pos}:${ref}:${alt}`;
    const url = `https://rest.ensembl.org/variant_recoder/human/${variantHGVS}`;
    console.log("🌐 Fetching rsID with URL:", url);

    (async () => {
      try {
        const response = await fetch(url, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        console.log("📄 Raw data:", data);
        if (!Array.isArray(data) || data.length === 0) {
          console.warn("⚠️ Response data is not an array or empty:", data);
          setRsID(null);
          return;
        }

        // Try to find rsID in nested objects
        const firstObj = data[0];
        console.log("First object keys:", Object.keys(firstObj));

        let foundRsID = null;
        for (const key of Object.keys(firstObj)) {
          const subObj = firstObj[key];
          if (subObj && Array.isArray(subObj.id)) {
            foundRsID = subObj.id.find(id => typeof id === "string" && id.startsWith("rs"));
            if (foundRsID) {
              console.log(`✅ Found rsID "${foundRsID}" under key "${key}"`);
              break;
            }
          }
        }

        if (!foundRsID) {
          console.log("⚠️ No rsID found in nested keys");
          setRsID(null);
        } else {
          setRsID(foundRsID);
        }
      } catch (error) {
        console.error("❌ Failed to fetch rsID:", error);
        setRsID(null);
      }
    })();
  }, [type, sortedData]);
}


  return (
    <div className="px-32">
      <Navbar />
      <div className="container mx-auto p-4">

      {loading ? (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
) : data.length > 0 ? (
  <>
    <table className="min-w-full border-collapse border border-gray-300 mt-6">
  <thead>
    <tr className="bg-black text-white">
      <th className="border border-gray-300 px-4 py-2">Variant ID</th>
      <th
        className="border border-gray-300 px-4 py-2 cursor-pointer"
        onClick={() => handleSort("AlleleCount")}
      >
        Allele Count {sortColumn === "AlleleCount" && (sortDirection === "asc" ? "↑" : "↓")}
      </th>
      <th
        className="border border-gray-300 px-4 py-2 cursor-pointer"
        onClick={() => handleSort("AlleleNumber")}
      >
        Allele Number {sortColumn === "AlleleNumber" && (sortDirection === "asc" ? "↑" : "↓")}
      </th>
      <th
        className="border border-gray-300 px-4 py-2 cursor-pointer"
        onClick={() => handleSort("Homozygotes")}
      >
        Homozygotes {sortColumn === "Homozygotes" && (sortDirection === "asc" ? "↑" : "↓")}
      </th>
      <th
        className="border border-gray-300 px-4 py-2 cursor-pointer"
        onClick={() => handleSort("AlleleFrequency")}
      >
        Allele Frequency {sortColumn === "AlleleFrequency" && (sortDirection === "asc" ? "↑" : "↓")}
      </th>
    </tr>
  </thead>
  <tbody>
  {sortedData.map((item, index) => (
    <tr key={index} className="bg-white">
      <td className="border border-gray-300 px-4 py-2">
        {(type === "gene" || type === "region") && item.VariantID ? (

        <Link
          to={{
            pathname: "/search",
            search: `?query=${item.VariantID}&type=variant`,
          }}
          state={{ variant: item }}
          className="text-blue-600 hover:underline"          
        >
          {item.VariantID}
        </Link>

          // previous 

         // <a
         //   href={`/search?query=${item.VariantID}&type=variant`}
         //   target="_blank"
         //   rel="noopener noreferrer"
         //   className="text-blue-600 hover:underline"
         // >
         //</td>   {item.VariantID}
         // </a>
        ) : (
          item.VariantID || query
        )}
      </td>
      <td className="border border-gray-300 px-4 py-2">{item.AlleleCount}</td>
      <td className="border border-gray-300 px-4 py-2">{item.AlleleNumber}</td>
      <td className="border border-gray-300 px-4 py-2">{item.Homozygotes}</td>
      <td className="border border-gray-300 px-4 py-2">{item.AlleleFrequency}</td>
    </tr>
  ))}
</tbody>
</table>



{type === "variant" && (
  <>
    <VariantLinks sortedData={sortedData} type={type} />
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Allele Frequency External Resources</h3>
      <div className="flex flex-wrap gap-4">
        {[
          { name: "gnomAD", url: `https://gnomad.broadinstitute.org/variant/${sortedData[0].VariantID}` },
          { name: "dbSNP", url: rsID ? `https://www.ncbi.nlm.nih.gov/snp/${rsID}` : "#" },
          { name: "UCSC Genome Browser", url: ucscUrl },
          { name: "ClinGen Allele Registry", url: "https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_canonicalid?canonicalid=CA26350" },
          { name: "ClinVar", url: "https://www.ncbi.nlm.nih.gov/clinvar/variation/38266/" },
          { name: "All of Us", url: `https://databrowser.researchallofus.org/snvsindels/${sortedData[0].VariantID}` },
          { name: "ukbiobank", url: `https://afb.ukbiobank.ac.uk/variant/${sortedData[0].VariantID}` },
          { name: "FinnGen", url: `https://r12.finngen.fi/variant/${sortedData[0].VariantID}` },
          { name: "SweGen", url: `https://swefreq.nbis.se/dataset/SweGen/browser/variant/${sortedData[0].VariantID}` },
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
  </>
)}
  </>
) : (
  <p>No data found for the search query.</p>
)}
           
  {/* First Table for Variant Information 

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

*/}
      
        {/* Gene information
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

      <h2 className="text-lg font-semibold mt-6">ACMG Information</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">acmg score</th>
              <th className="px-4 py-2 border">acmg classification</th>
              <th className="px-4 py-2 border">acmg criteria</th>

             
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

       */}

      {/* Second Table for Consequences (RefSeq) 
      <h2 className="text-lg font-semibold mt-6">RefSeq Consequences</h2>
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
            {variantData[0].consequences_refseq.map((consequence, index) => (
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

      */}


       {/* Third  Table for Consequences (Ensembl) 

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

      */}


                 
      
       {/* Allele Frequency Information Table 
       <AlleleFrequency data={variantData} />
      */}

       {/* Variant Information Table 
      <VariantInformation data={variantData} />
       */}

      {/* Gene Information Table 
      <GeneInformation data={variantData} />
      */}

      {/* ACMG Information Table 
      <ACMGInformation data={variantData} />
      */}
      
      {/* Consequence Ensembl Information Table */}
      {/*<ConsequencesEnsembl data={variantData} /> */}

      {/* Consequence RefSeq Information Table */}
     {/* <ConsequencesRefSeq data={variantData} />*/}
    
      </div>

      

      <Footer />
      <Logos />
    </div>
  );
};

export default SearchResults;






