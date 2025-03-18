import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';

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
        The <strong>DenGen Allele Frequency Browser</strong> is a web-based tool providing access to allele frequency data 
          from the Danish population. This resource enables researchers and clinicians to explore genetic variant 
          frequencies, aiding in population-based studies and clinical variant interpretation.
        </p>


        {/* Introduction Section */}
       
           <h2 className="text-2xl font-semibold text-[#003865] mb-4">Key Features</h2>
           <p className="text-gray-600 mb-6">
        <ul>   
          <li>Comprehensive allele frequency data from a Danish whole-genome sequencing cohort.</li>
          <li>Intuitive user interface for variant search and exploration.</li>
          <li>Supports single-nucleotide variants (SNVs) and structural variants (SVs).</li>
          <li>Data presented in a format compatible with clinical and research applications.</li>
        </ul>
        </p>


         
           <h2 className="text-2xl font-semibold text-[#003865] mb-4">Data Source and Methodology</h2>
           <p className="text-gray-600 mb-6">
          The data originates from whole-genome sequencing (WGS) performed on a cohort of 2,211 unrelated individuals. 
          Variants are called using a robust bioinformatics pipeline leveraging tools like GATK’s HaplotypeCaller for SNVs 
          and a consensus approach for structural variants. The dataset is hosted on the Danish National Genome Center 
          (NGC) infrastructure.
        </p>

        
           <h2 className="text-2xl font-semibold text-[#003865] mb-4">Porpuse and Accessibility</h2>
           <p className="text-gray-600 mb-6">
          The DenGen Allele Frequency Browser serves as a reference for researchers and clinicians, helping to filter 
          common variant calls and refine genetic analyses. The aggregated variant frequencies are publicly accessible 
          in anonymized form, ensuring broad usability while maintaining data privacy.
        </p>
      </div>  
      </div>
      <Footer />
      <Logos />
    </div> 
  );
}

export default AboutPage;




