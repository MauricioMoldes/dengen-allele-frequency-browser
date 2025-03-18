import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';

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

const SearchResults = () => {
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [error, setError] = useState(null);
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
      <Navbar />
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
      
        {/* Gene information */}
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

      {/* Second Table for Consequences (RefSeq) */}
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

     


       {/* Third  Table for Consequences (Ensembl) */}

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

      <h2 className="text-lg font-semibold mt-6">DenGen Allele Frequency </h2>
        {/* <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>*/}

        {loading ? (
          <div className="flex justify-center items-center">
            {/* Spinning Fidget Loader */}
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : data.length > 0 ? (          
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
            <h3 className="text-lg font-semibold">Allele Frequency External Resources</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: "gnomAD", url: `https://gnomad.broadinstitute.org/variant/${query}` },
                { name: "dbSNP", url: `https://www.ncbi.nlm.nih.gov/snp/${query}` },
                { name: "UCSC Genome Browser", url: "https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&highlight=hg38.chr13%3A32398489-32398489&position=chr13%3A32398464-32398514" },
                { name: "ClinGen Allele Registry", url: "https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_canonicalid?canonicalid=CA26350" },
                { name: "ClinVar", url: "https://www.ncbi.nlm.nih.gov/clinvar/variation/38266/" },
                { name: "All of Us", url: `https://databrowser.researchallofus.org/variants/${query}` },
                { name: "ukbiobank", url: `https://afb.ukbiobank.ac.uk/variant/${query}` },
                { name: "FinnGen", url: `https://r12.finngen.fi/variant/${query}` },
                { name: "SweGen", url: `https://swefreq.nbis.se/dataset/SweGen/browser/variant/13-32972626-A-T` },
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

      

      <Footer />
      <Logos />
    </div>
  );
};

export default SearchResults;






