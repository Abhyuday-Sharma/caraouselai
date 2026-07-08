import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CarouselRenderer from '../components/editor/CarouselRenderer';

/**
 * Renders each slide off-screen to a fixed 800x1000 viewport,
 * captures it via html2canvas, and compiles a multi-page PDF.
 */
export async function exportToPDF(slides, designSystem, filename = 'carousel.pdf', aspectRatio = '4:5') {
  const width = 800;
  const height = aspectRatio === '1:1' ? 800 : 1000;

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  document.body.appendChild(container);

  const root = createRoot(container);
  const doc = new jsPDF({
    orientation: aspectRatio === '1:1' ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height]
  });

  try {
    for (let i = 0; i < slides.length; i++) {
      await new Promise((resolve) => {
        root.render(
          <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
            <CarouselRenderer slide={slides[i]} designSystem={designSystem} aspectRatio={aspectRatio} />
          </div>
        );
        // Wait for React to mount and layout components
        setTimeout(resolve, 350);
      });

      const canvasElement = container.querySelector('.slide-canvas');
      if (!canvasElement) continue;

      const canvas = await html2canvas(canvasElement, {
        width: width,
        height: height,
        scale: 2, // 2x crisp scale (1600x2000 px or 1600x1600 px)
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      const imgData = canvas.toDataURL('image/png');
      
      if (i > 0) {
        doc.addPage([width, height], aspectRatio === '1:1' ? 'landscape' : 'portrait');
      }
      doc.addImage(imgData, 'PNG', 0, 0, width, height);
    }

    doc.save(filename);
  } catch (error) {
    console.error('Failed to compile PDF:', error);
    throw error;
  } finally {
    root.unmount();
    document.body.removeChild(container);
  }
}

/**
 * Renders each slide off-screen and triggers sequential PNG downloads.
 */
export async function exportToPNGs(slides, designSystem, topicName = 'carousel', aspectRatio = '4:5') {
  const width = 800;
  const height = aspectRatio === '1:1' ? 800 : 1000;

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  document.body.appendChild(container);

  const root = createRoot(container);
  const cleanTopic = topicName.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  try {
    for (let i = 0; i < slides.length; i++) {
      await new Promise((resolve) => {
        root.render(
          <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
            <CarouselRenderer slide={slides[i]} designSystem={designSystem} aspectRatio={aspectRatio} />
          </div>
        );
        setTimeout(resolve, 350);
      });

      const canvasElement = container.querySelector('.slide-canvas');
      if (!canvasElement) continue;

      const canvas = await html2canvas(canvasElement, {
        width: width,
        height: height,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      const imgData = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${cleanTopic}_slide_${i + 1}.png`;
      link.click();
      
      // Delay slightly between downloads to prevent chrome from blocking multiple triggers
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  } catch (error) {
    console.error('Failed to download PNGs:', error);
    throw error;
  } finally {
    root.unmount();
    document.body.removeChild(container);
  }
}
