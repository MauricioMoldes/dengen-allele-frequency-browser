import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';
import config from '../config';

function DataUseTermsPage() {
  return (
    <div className="px-32">
      <Navbar />
     <div className="container mx-auto py-8">
  <h1 className="text-4xl font-bold text-center mb-6">Terms of Use</h1>

  {/* Introduction Section */}
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-[#003865] mb-4">Introduction</h2>
    <p className="text-gray-600 mb-6">
      Welcome to the DenGen Allele Frequency Browser. By accessing or using this platform, you agree to comply with the following terms and conditions. If you do not agree with any part of these terms, please refrain from using the platform.
    </p>


  {/* Purpose Section */}
 
    <h2 className="text-2xl font-semibold text-[#003865] mb-4">Purpose</h2>
    <p className="text-gray-600 mb-6">
    The DenGen Allele Frequency Browser (the “Browser”) is a site operated by the Department of Genomic Medicine, Rigshospitalet. Please refer to the <a href={config.DENGEN_TERMS} className="text-blue-500 underline">DenGen Terms of Use</a>  and terms below which covers the use of the DenGen Allele Frequency Browser (together the “AFB Terms”). By accessing and using the Browser you hereby agree to the AFB Terms.
The Browser is a free-to-access resource of variant allele frequencies derived from summary statistics generated from research that has been conducted by DenGen. Use of the Browser is for the biomedical research community and the purposes of conducting health-related research purposes only.
    </p>


  {/* Data Use and Restrictions */}

    <h2 className="text-2xl font-semibold text-[#003865] mb-4">Access to Browser</h2>
    <p className="text-gray-600 mb-6">
    Whilst DenGen has a reasonable belief that the use of the Browser and the summary statistics should not require any further licence or permission, the Browser and the summary statistics are provided by DenGen on an "As-Is" basis, and no warranties or representations, expressed or implied, are given about the performance, accuracy, completeness, currency or that results which may be obtained from the use of the Browser will be error free or reliable.
DenGen makes no assurance that access to the Browser will always be available or be uninterrupted. We reserve the right to withdraw or amend the service we provide on the Browser without notice. We will not be liable, if for any reason, the Browser is unavailable at any time or for any period.
DenGen hereby excludes any and all liability to any third party arising from the use of the Browser and the summary statistics.
</p>

  {/* Privacy and Data Protection */}
 
    <h2 className="text-2xl font-semibold text-[#003865] mb-4">Copyright notice and citations</h2>
    <p className="text-gray-600 mb-6">
    All trademarks, logos and brand names displayed on this website are the property of their respective owners and are subject to copyright and trademark laws. You must not copy or use these without the express permission of their respective owner.
    DenGen requests that any published use of material obtained from the Browser in publications <a href={config.DENGEN_CITE} className="text-blue-500 underline">cite</a> that the data has been generated under  DenGen .
    </p>
   

  {/* Contact Information */} 
    <h2 className="text-2xl font-semibold text-[#003865] mb-4">Contact Information</h2>
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
export default DataUseTermsPage;
