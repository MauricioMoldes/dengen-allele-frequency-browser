import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';
import config from '../config';

function AboutPage() {
  return (
       

        <div className="px-32">
        <Navbar />
        <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-6">About DenGen Allele Frequency Browser</h1>
       
       {/* Introduction Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
           <h2 className="text-2xl font-semibold text-[#003865] mb-4">Introduction</h2>
           <p className="text-gray-600 mb-6">
       The DenGen project is a national effort to whole-genome sequence a large cohort of Danish individuals to provide a comprehensive catalog of genetic variation specific to the Danish population. This resource is invaluable for both clinical diagnostics and research across Denmark and internationally.
        </p>


         <p className="text-gray-600 mb-6">
        Find out more about <a href={config.DENGEN_ABOUT} className="text-blue-500 underline">DenGen</a>.
        </p>

        <p className="text-gray-600 mb-6">
          The DenGen cohort currently includes 2,211 unrelated individuals sequenced at high coverage (average >52x) using Illumina NovaSeq6000 technology with DNA PCR-free library preparation. Structural variants (SVs) and single nucleotide variants (SNVs) have been identified using robust bioinformatics pipelines including GATK HaplotypeCaller and a consensus approach combining CNVnator, Delly, Lumpy, and Manta for CNV detection.
           </p>

        <p className="text-gray-600 mb-6">
         Read more about <a href={config.DENGEN_PIPELINES} className="text-blue-500 underline">DenGen bioinformatics pipelines</a>.
           </p>
        
           <p className="text-gray-600 mb-6">
          Allele frequencies presented in this browser represent aggregated data from the Danish population and reflect the variant distribution within Denmark. Chromosomal positions are reported according to the human genome reference assembly GRCh38 (hg38). Variant IDs follow the format: Chromosome-Hg38Position-Reference-Alternative.

           </p>

 <p className="text-gray-600 mb-6">
         DenGen provides this allele frequency browser as a free resource for the scientific community for research use only. It is not intended for diagnostic or clinical decision-making purposes.

           </p>

<p className="text-gray-600 mb-6">
         For questions or further information, please <a href={config.DENGEN_CONTACT} className="text-blue-500 underline">contact us</a>.
           </p>
       
      </div>  
      </div>
      <Footer />
      <Logos />
    </div> 
  );
}

export default AboutPage;




