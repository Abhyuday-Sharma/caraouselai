import React from 'react';
import BlockRegistry from '../blocks/BlockRegistry';
import './EditorialGrid.css';

export default function EditorialGrid({ slide }) {
  if (!slide || !slide.composedBlocks) return null;

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

  return (
    <div className="editorial-grid-container">
      {/* Background Graphics (Absolute) */}
      {backgroundGraphics.map((block, index) => {
         const BlockComponent = BlockRegistry[block.type];
         return BlockComponent ? <BlockComponent key={`overlay-${index}`} {...block.props} /> : null;
      })}

      {/* The master flex flow container */}
      <div className="flex-flow-container">
        
        {/* Render Header Layer */}
        {blocksByStrata.header.length > 0 && (
          <div className="strata-header">
            {blocksByStrata.header.map((block, index) => {
              const BlockComponent = BlockRegistry[block.type];
              return BlockComponent ? <BlockComponent key={`header-${index}`} {...block.props} /> : null;
            })}
          </div>
        )}

        {/* Render Body Layer */}
        {blocksByStrata.body.length > 0 && (
          <div className="strata-body">
            {blocksByStrata.body.map((block, index) => {
              const BlockComponent = BlockRegistry[block.type];
              return BlockComponent ? <BlockComponent key={`body-${index}`} {...block.props} /> : null;
            })}
          </div>
        )}

        {/* Render Data Layer (Auto-Wrapping) */}
        {blocksByStrata.data.length > 0 && (
          <div className="strata-data">
            {blocksByStrata.data.map((block, index) => {
              const BlockComponent = BlockRegistry[block.type];
              return BlockComponent ? <BlockComponent key={`data-${index}`} {...block.props} /> : null;
            })}
          </div>
        )}

      </div>
      
      {/* Structural Footer */}
      {footerBlock && (() => {
        const BlockComponent = BlockRegistry[footerBlock.type];
        return (
          <div className="structural-footer">
            <BlockComponent {...footerBlock.props} isStructural={true} />
          </div>
        );
      })()}
    </div>
  );
}
