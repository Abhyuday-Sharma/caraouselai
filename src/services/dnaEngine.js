/**
 * AI Design DNA Generator
 * Generates recurring visual identity elements that persist across every slide.
 */

export function generateDesignDNA(brief, visualLanguage) {
  // Base DNA structure
  const dna = {
    showPageNumbers: true,
    pageNumberStyle: 'minimal', // minimal, badge, slash
    pageNumberPosition: 'bottom-right', 
    
    showBrandFooter: true,
    brandText: '@yorilabs',
    brandPosition: 'bottom-left',
    
    sectionIdentifierStyle: 'pill', // pill, line-left, none
    sectionIdentifierPosition: 'top-left',

    decorativeBorder: 'none', // none, thin-inner, solid-bottom
    
    // Inherit from Visual Language
    motifType: visualLanguage.MotifSystem, 
  };

  if (brief.ReadingExperience.includes('Magazine') || brief.VisualInspiration.includes('Vogue')) {
    dna.pageNumberStyle = 'slash'; // e.g. 01 / 05
    dna.pageNumberPosition = 'top-right';
    dna.brandPosition = 'bottom-center';
    dna.decorativeBorder = 'thin-inner';
    dna.sectionIdentifierStyle = 'line-left';
  } else if (brief.InformationDensity === 'High') {
    dna.pageNumberStyle = 'badge';
    dna.pageNumberPosition = 'bottom-right';
    dna.sectionIdentifierStyle = 'pill';
  }

  return dna;
}
