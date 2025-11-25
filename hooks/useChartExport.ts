import { useCallback, useState } from 'react';
import { ExportConfig } from '../types';

export const useChartExport = (chartContainerRef: React.RefObject<HTMLDivElement>) => {
  const [error, setError] = useState<string | null>(null);

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = useCallback(async (config: ExportConfig) => {
    setError(null);
    if (!chartContainerRef.current) return;

    const svgElement = chartContainerRef.current.querySelector('svg');
    if (!svgElement) {
      setError('Could not find chart element to export.');
      return;
    }

    try {
      const width = svgElement.clientWidth || 800;
      const height = svgElement.clientHeight || 500;

      // Clone to avoid modifying the DOM
      const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
      svgClone.setAttribute("width", `${width}`);
      svgClone.setAttribute("height", `${height}`);
      
      if (!svgClone.getAttribute("xmlns")) {
        svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      }

      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgClone);

      // Theme Adjustment for Black Background
      if (config.background === 'black') {
         svgString = svgString.replace(/#64748b/gi, '#e2e8f0');
         svgString = svgString.replace(/#e2e8f0/gi, '#334155');
         svgString = svgString.replace(/fill="white"/gi, 'fill="#0f172a"');
         svgString = svgString.replace(/fill="#fff"/gi, 'fill="#0f172a"');
         svgString = svgString.replace(/fill="#ffffff"/gi, 'fill="#0f172a"');
         svgString = svgString.replace(/stroke="white"/gi, 'stroke="#0f172a"');
      }

      if (config.format === 'svg') {
        if (config.background !== 'transparent') {
           const bgColor = config.background === 'black' ? '#0f172a' : '#ffffff';
           const bgRect = `<rect width="100%" height="100%" fill="${bgColor}" />`;
           const svgContentStart = svgString.indexOf('>');
           if (svgContentStart > -1) {
             svgString = svgString.slice(0, svgContentStart + 1) + bgRect + svgString.slice(svgContentStart + 1);
           }
        }
        
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `chart.${config.format}`);
        return;
      }

      // Canvas Rendering for PNG/JPEG
      const canvas = document.createElement('canvas');
      const scale = 2; // High resolution
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');

      if (config.background !== 'transparent') {
        ctx.fillStyle = config.background === 'black' ? '#0f172a' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, width * scale, height * scale);
        const imgData = canvas.toDataURL(`image/${config.format}`);
        triggerDownload(imgData, `chart.${config.format}`);
        URL.revokeObjectURL(url);
      };
      
      img.onerror = () => {
        setError("Failed to render chart image. Please try SVG format.");
      };
      
      img.src = url;

    } catch (e: any) {
      console.error(e);
      setError('Export failed: ' + e.message);
    }
  }, [chartContainerRef]);

  return { handleExport, exportError: error };
};
