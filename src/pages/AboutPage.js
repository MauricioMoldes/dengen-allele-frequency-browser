import React from 'react';
import Layout from './Layout';
import config from '../config';

const Body = ({ children }) => (
  <p style={{ fontSize: '14px', color: 'var(--dg-text-muted)', lineHeight: 1.8, margin: '0 0 16px' }}>
    {children}
  </p>
);

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    style={{ color: 'var(--dg-blue)', textDecoration: 'none', fontWeight: 500 }}>
    {children}
  </a>
);

function AboutPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '680px' }}>

        <div style={{ fontSize: '12px', color: 'var(--dg-text-muted)', marginBottom: '10px' }}>
          About · DenGen Allele Frequency Browser
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 500, color: 'var(--dg-text)', marginBottom: '10px', lineHeight: 1.2 }}>
          About DenGen Allele Frequency Browser
        </h1>
        <hr style={{ border: 'none', borderTop: '0.5px solid var(--dg-border)', margin: '20px 0 28px' }} />

        <h2 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--dg-text)', marginBottom: '10px' }}>
          Introduction
        </h2>
        <Body>
          The DenGen project is an effort to whole-genome sequence a large cohort of Danish individuals to provide a comprehensive catalog of genetic variation specific to the Danish population. This resource is invaluable for both clinical diagnostics and research across Denmark and internationally.
        </Body>
        <Body>
          Find out more about <ExternalLink href={config.DENGEN_ABOUT}>DenGen</ExternalLink>.
        </Body>
        <Body>
          The DenGen cohort currently includes 2,211 unrelated individuals sequenced at high coverage (average &gt;52x) using Illumina NovaSeq6000 technology with DNA PCR-free library preparation. Structural variants (SVs) and single nucleotide variants (SNVs) have been identified using robust bioinformatics pipelines including GATK HaplotypeCaller and a consensus approach combining CNVnator, Delly, Lumpy, and Manta for CNV detection.
        </Body>
        <Body>
          Read more about <ExternalLink href={config.DENGEN_PIPELINES}>DenGen bioinformatics pipelines</ExternalLink>.
        </Body>
        <Body>
          Allele frequencies presented in this browser represent aggregated data from the Danish population and reflect the variant distribution within Denmark. Chromosomal positions are reported according to the human genome reference assembly GRCh38 (hg38). Variant IDs follow the format: Chromosome-Hg38Position-Reference-Alternative.
        </Body>
        <Body>
          DenGen provides this allele frequency browser as a free resource for the scientific community for research use only. It is not intended for diagnostic or clinical decision-making purposes.
        </Body>
        <Body>
          For questions or further information, please <ExternalLink href={config.DENGEN_CONTACT}>contact us</ExternalLink>.
        </Body>

      </div>
    </Layout>
  );
}

export default AboutPage;





