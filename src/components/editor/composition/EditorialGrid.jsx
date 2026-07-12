import React from 'react';
import BlockRegistry from '../blocks/BlockRegistry';
import './EditorialGrid.css';

export default function EditorialGrid({ slide, designSystem, slideIndex = 0, totalSlides = 1, topic = '' }) {
  if (!slide || !slide.composedBlocks) return null;

  const isSunsetEditorial = designSystem?.LayoutTemplate === 'sunset-editorial';

  // Group blocks by their assigned layout strata
  const blocksByStrata = slide.composedBlocks.reduce((acc, block) => {
    if (!acc[block.strata]) acc[block.strata] = [];
    acc[block.strata].push(block);
    return acc;
  }, { header: [], body: [], data: [], 'absolute-overlay': [] });

  // Separate footer from other absolute overlays
  const absoluteOverlays = blocksByStrata['absolute-overlay'] || [];
  const backgroundGraphics = absoluteOverlays.filter(b => b.type !== 'UnifiedFooter');
  const footerBlock = absoluteOverlays.find(b => b.type === 'UnifiedFooter');

  // Compute footer pill text for Sunset layout
  let footerPillText = '';
  if (isSunsetEditorial) {
    const footnoteBlock = slide.composedBlocks.find(b => b.type === 'Footnote');
    const brandText = footerBlock?.props?.brandText || '@yorilabs';
    if (slideIndex === totalSlides - 1) {
      footerPillText = brandText;
    } else if (footnoteBlock?.props?.text) {
      footerPillText = footnoteBlock.props.text;
    } else {
      footerPillText = slide.role === 'Hook' ? 'READ BEFORE YOU APPLY' : brandText;
    }
  }

  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const now = new Date();
  const currentMonthYear = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  const displayTopic = topic || "EDITORIAL GUIDE";
  const runningHeaderText = `${currentMonthYear}  •  ${displayTopic.toUpperCase()}`;

  const renderBlock = (block, index, strataName) => {
    if (isSunsetEditorial && block.type === 'Footnote') return null;
    const BlockComponent = BlockRegistry[block.type];
    return BlockComponent ? <BlockComponent key={`${strataName}-${index}`} {...block.props} /> : null;
  };

  return (
    <div className="editorial-grid-container">
      {/* Centered Top Running Header */}
      {isSunsetEditorial && (
        <div className="sunset-running-header" style={{
          position: 'absolute',
          top: '2.2em',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: '0.7em',
          fontWeight: '700',
          letterSpacing: '0.12em',
          color: 'var(--sys-accent)',
          textTransform: 'uppercase',
          fontFamily: 'var(--sys-font-body)',
          zIndex: 100,
          pointerEvents: 'none'
        }}>
          {runningHeaderText}
        </div>
      )}

      {/* Background Graphics (Absolute) */}
      {backgroundGraphics.map((block, index) => {
         const BlockComponent = BlockRegistry[block.type];
         return BlockComponent ? <BlockComponent key={`overlay-${index}`} {...block.props} /> : null;
      })}

      {/* The master flex flow container */}
      <div className="flex-flow-container">
        
        {/* Render Header Layer */}
        {(blocksByStrata.header.length > 0 || (isSunsetEditorial && slideIndex < totalSlides - 1)) && (
          <div className="strata-header" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Outlined Slide Number Box */}
            {isSunsetEditorial && slideIndex < totalSlides - 1 && (
              <div className="sunset-number-box" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--sys-accent)',
                color: 'var(--sys-accent)',
                width: '3.2em',
                height: '2.2em',
                borderRadius: '8px',
                fontSize: '0.75em',
                fontWeight: 'bold',
                fontFamily: 'var(--sys-font-body)',
                marginBottom: '0.8em',
                alignSelf: 'flex-start'
              }}>
                {String(slideIndex + 1).padStart(2, '0')}
              </div>
            )}

            {blocksByStrata.header.map((block, index) => renderBlock(block, index, 'header'))}

            {/* Short Divider Line */}
            {isSunsetEditorial && blocksByStrata.header.length > 0 && (
              <div className="sunset-heading-underline" style={{
                width: '2.5em',
                height: '2px',
                background: 'var(--sys-accent)',
                marginTop: '0.8em',
                marginBottom: '0.8em',
                alignSelf: 'flex-start'
              }} />
            )}
          </div>
        )}

        {/* Render Body Layer */}
        {blocksByStrata.body.length > 0 && (
          <div className="strata-body">
            {blocksByStrata.body.map((block, index) => renderBlock(block, index, 'body'))}
          </div>
        )}

        {/* Render Data Layer (Auto-Wrapping) */}
        {blocksByStrata.data.length > 0 && (
          <div className="strata-data">
            {blocksByStrata.data.map((block, index) => renderBlock(block, index, 'data'))}
          </div>
        )}

      </div>
      
      {/* Structural Footer */}
      {!isSunsetEditorial && footerBlock && (() => {
        const BlockComponent = BlockRegistry[footerBlock.type];
        return (
          <div className="structural-footer">
            <BlockComponent {...footerBlock.props} isStructural={true} />
          </div>
        );
      })()}

      {/* Outlined Pill Footer for Sunset Editorial layout */}
      {isSunsetEditorial && (
        <div className="sunset-outlined-footer-pill-container" style={{
          position: 'absolute',
          bottom: '2.2em',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          pointerEvents: 'none'
        }}>
          <div className="sunset-outlined-footer-pill" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--sys-accent)',
            color: 'var(--sys-accent)',
            padding: '0.6em 1.8em',
            borderRadius: 'var(--sys-radius-pill, 9999px)',
            fontSize: '0.72em',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'transparent',
            pointerEvents: 'auto'
          }}>
            {footerPillText}
          </div>
        </div>
      )}
    </div>
  );
}
