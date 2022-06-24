import * as pdfjsLib from "pdfjs-dist";

const pdfjsVersion = "2.8.335";

// not working on pdf with specific fonts
// const pdfjsVersion = "2.14.305";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.js`;

const baseUrl = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsVersion}`;
const cMapUrl = `${baseUrl}/cmaps/`;

export async function convertPdfObjUrlToDataUrl(
  objUrl: string,
  mimeType: string = "image/png"
) {
  const pdf = await pdfjsLib.getDocument({
    url: objUrl,
    cMapUrl,
    cMapPacked: true,
  }).promise;
  const page = await pdf.getPage(1);
  let viewport = page.getViewport({ scale: 1 });

  const canvas = document.createElement("canvas");
  if (!canvas) {
    throw new Error("failed to get canvas by getElementById");
  }
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("failed to getContext from canvas");
  }

  await page.render({
    canvasContext: ctx,
    viewport,
  }).promise;

  return canvas.toDataURL(mimeType);
}
