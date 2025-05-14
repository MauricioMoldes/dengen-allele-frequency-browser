import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AlleleFrequency = () => {
    const [loading, setLoading] = useState(true); // Set loading initially to true
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query"); // Get the query from the URL


    
const variantData = [
    {
      chr: "11",
      pos: 102904,
      ref: "C",
      alt: "G",
      effect: "missense_variant",
      transcript: "NM_005577.4",
      gene_symbol: "LPA",
      gene_hgnc_id: 6667,
      dbsnp: "rs41272110",
      frequency_reference_population: 0.12870474,
      hom_count_reference_population: 14785,
      allele_count_reference_population: 207670,
      gnomad_exomes_af: 0.131807997822762,
      gnomad_genomes_af: 0.0989105999469757,
      gnomad_exomes_ac: 192617,
      gnomad_genomes_ac: 15053,
      gnomad_exomes_homalt: 13836,
      gnomad_genomes_homalt: 949,
      gnomad_mito_homoplasmic: null,
      gnomad_mito_heteroplasmic: null,
      computational_score_selected: 0.00271016359329224,
      computational_prediction_selected: "Benign",
      computational_source_selected: "MetaRNN",
      splice_score_selected: 0,
      splice_prediction_selected: "Benign",
      splice_source_selected: "max_spliceai",
      revel_score: 0.256000012159348,
      revel_prediction: "Benign",
      alphamissense_score: null,
      alphamissense_prediction: null,
      bayesdelnoaf_score: -0.379999995231628,
      bayesdelnoaf_prediction: "Benign",
      phylop100way_score: 2.90499997138977,
      phylop100way_prediction: "Benign",
      spliceai_max_score: 0,
      spliceai_max_prediction: "Benign",
      dbscsnv_ada_score: null,
      dbscsnv_ada_prediction: null,
      apogee2_score: null,
      apogee2_prediction: null,
      mitotip_score: null,
      mitotip_prediction: null,
      acmg_score: -12,
      acmg_classification: "Benign",
      acmg_criteria: "BP4_Strong,BA1",
      acmg_by_gene: [],
      clinvar_disease: "",
      clinvar_classification: "",
      clinvar_review_status: "",
      phenotype_combined: null,
      pathogenicity_classification_combined: null,
      custom_annotations: null,
      consequences_refseq: [
        {
          aa_ref: "T",
          aa_alt: "P",
          canonical: false,
          protein_coding: true,
          consequences: ["missense_variant"],
          exon_rank: 26,
          exon_count: 39,
          gene_symbol: "LPA",
          gene_hgnc_id: 6667,
          hgvs_c: "c.4195A>C",
          hgvs_p: "p.Thr1399Pro",
          transcript: "NM_005577.4",
          protein_id: "NP_005568.2",
          aa_start: 1399,
          aa_length: 2040,
          cds_start: 4195,
          cds_length: 6123,
          cdna_start: 4256,
          cdna_length: 6431,
          mane_select: "ENST00000316300.10"
        }
      ],
      consequences_ensembl: [
        {
          aa_ref: "T",
          aa_alt: "P",
          canonical: true,
          protein_coding: true,
          consequences: ["missense_variant"],
          exon_rank: 26,
          exon_count: 39,
          gene_symbol: "LPA",
          gene_hgnc_id: 6667,
          hgvs_c: "c.4195A>C",
          hgvs_p: "p.Thr1399Pro",
          transcript: "ENST00000316300.10",
          protein_id: "ENSP00000321334.6",
          transcript_support_level: 1,
          aa_start: 1399,
          aa_length: 2040,
          cds_start: 4195,
          cds_length: 6123,
          cdna_start: 4256,
          cdna_length: 6431,
          mane_select: "NM_005577.4"
        }
      ]
    
    }
  ];

    useEffect(() => {
      if (query) {
        const fetchData = async () => {
          setLoading(true);
          setError(null);
  
          try {
            const [chrom, pos, ref, alt] = query.split("-");
            const apiUrl = `https://cors-anywhere.herokuapp.com/https://staging-beacon.gdi.nbis.se/api/g_variants?start=${pos}&alternateBases=${alt}&referenceBases=${ref}&referenceName=${chrom.replace("chr", "")}&assemblyId=GRCh37`;
  
            const response = await fetch(apiUrl, {
              mode: "cors", // Explicitly set CORS mode
              headers: {
                "Content-Type": "application/json",
              },
            });
  
            if (!response.ok) throw new Error("Failed to fetch data");
            const result = await response.json();
  
            if (result && result.response && result.response.resultSets.length > 0) {
              const variants = result.response.resultSets[0].results || [];
  
              const parsedData = result.response.resultSets[0].results.slice(0, 1).flatMap((variant) => {
                const frequencyData = variant.frequencyInPopulations?.[0]?.frequencies?.[0];
                if (frequencyData) {
                  return [
                    {
                      AncestryGroup: frequencyData.population || "Unknown",
                      GeneticAncestry: frequencyData.population || "Unknown", // Assuming genetic ancestry is the same as population here
                      Category: "Overall", // Assuming it's overall for now
                      AlleleCount: frequencyData.alleleCount,
                      AlleleNumber: frequencyData.alleleNumber,
                      Homozygotes: frequencyData.alleleCountHomozygous || 0,
                      AlleleFrequency: frequencyData.alleleFrequency?.toFixed(6) || "N/A",
                    },
                  ];
                }
                return [];
              });
              
              setData(parsedData);
            } else {
              setData([]);
            }
          } catch (error) {
            console.error("Error fetching variant data:", error);
            setError(error.message);
            setData([]);
          } finally {
            setLoading(false);
          }
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
        
        <div className="container mx-auto p-4">
             
  
        <h2 className="text-lg font-semibold mt-6">Variant Information</h2>
        {/* First Table for Variant Information */}
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
    </div>
);
};

export default AlleleFrequency;