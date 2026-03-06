import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
// In a real app, you might want to bundle this, but for simplicity and Vite compatibility,
// we can point to a CDN or use the worker from the package if configured correctly.
// Using unpkg for the worker to avoid complex Vite worker configuration for this snippet.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to extract text from PDF. Please ensure it is a text-based PDF, not a scanned image.');
  }
}
