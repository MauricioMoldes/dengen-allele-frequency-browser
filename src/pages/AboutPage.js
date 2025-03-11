import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';

function AboutPage() {
  return (
    <div className="px-32">
      <Navbar />
  
 <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-6">About DenGen</h1>

      {/* Introduction Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-[#003865] mb-4">What is DenGen?</h2>
        <p className="text-gray-600 mb-6">
          DenGen is a national genomics initiative designed to provide a comprehensive resource for understanding the genetic diversity of the Danish population. By leveraging cutting-edge technologies and robust bioinformatics tools, DenGen aims to advance clinical research, genetic diagnostics, and personalized medicine in Denmark. Our goal is to generate a valuable dataset of genomic variants, including single-nucleotide variants (SNVs) and structural variants (SVs), which will be freely accessible to researchers, clinicians, and the scientific community.
        </p>

        <h3 className="text-xl font-semibold text-[#003865] mb-4">Our Mission</h3>
        <p className="text-gray-600 mb-6">
          DenGen's mission is to map the genetic landscape of Denmark through large-scale whole-genome sequencing. By doing so, we aim to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>Identify and catalog genetic variants that are specific to the Danish population.</li>
          <li>Provide a resource for improving the accuracy of genetic diagnostics and precision medicine in Denmark.</li>
          <li>Facilitate research on the genetic basis of diseases prevalent in the Danish population.</li>
          <li>Contribute to global genomics databases for comparative research and variant discovery.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#003865] mb-4">The DenGen Dataset</h3>
        <p className="text-gray-600 mb-6">
          The DenGen dataset consists of high-quality whole-genome sequencing data from over 2,000 unrelated individuals, covering a broad spectrum of the Danish population. The dataset includes both SNVs and SVs, offering valuable insights for a wide range of research applications. All data is anonymized to ensure privacy while still providing researchers with the necessary information to conduct meaningful analyses.
        </p>

        <h3 className="text-xl font-semibold text-[#003865] mb-4">Why DenGen Matters</h3>
        <p className="text-gray-600 mb-6">
          With an increasing focus on personalized medicine and genomics-based healthcare, having a comprehensive understanding of the genetic variations in a given population is critical. DenGen fills this gap by providing data that can be used to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>Enhance disease gene discovery by linking genetic variants with phenotypic traits.</li>
          <li>Improve the clinical relevance of genetic tests, enabling better diagnostic accuracy.</li>
          <li>Support epidemiological research into genetic risk factors for complex diseases.</li>
          <li>Facilitate drug development and clinical trials tailored to the genetic makeup of the Danish population.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#003865] mb-4">Our Methodology</h3>
        <p className="text-gray-600 mb-6">
          DenGen uses state-of-the-art sequencing platforms and bioinformatics pipelines to process and analyze genomic data. Our process includes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>Whole-genome sequencing on the Illumina NovaSeq 6000 platform with PCR-free library preparation.</li>
          <li>Bioinformatics pipelines for variant calling, including SNVs and structural variants, using tools like GATK, Delly, Manta, and CNVnator.</li>
          <li>Comprehensive quality control and annotation to ensure data accuracy and usability.</li>
          <li>Aggregation of variant frequencies specific to the Danish population to improve genetic analysis and filtering.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#003865] mb-4">Collaborations and Partners</h3>
        <p className="text-gray-600 mb-6">
          DenGen is the result of collaborative efforts between leading research institutions, healthcare providers, and funding bodies. Our partners include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li><strong>Novo Nordisk Foundation</strong>: Funding and support for the development of genomic technologies and infrastructure.</li>
          <li><strong>Rigshospitalet</strong>: Clinical and research collaboration to ensure the dataset is aligned with clinical needs.</li>
          <li><strong>University of Copenhagen</strong>: Academic collaboration on the analysis and interpretation of genomic data.</li>
          <li><strong>Danish National Genome Center (NGC)</strong>: Hosting the DenGen database and providing infrastructure for large-scale data storage and analysis.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#003865] mb-4">Contact Us</h3>
        <p className="text-gray-600 mb-6">
          If you have questions, want to collaborate, or would like more information about DenGen, please visit our <a href="/contact" className="text-[#003865] hover:underline">Contact Page</a>.
        </p>
      </div>
    </div>  
    <Footer />
      
      <Logos />
    </div> 

  );
}
export default AboutPage;



