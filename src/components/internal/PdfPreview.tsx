// "use client";

// import { useEffect, useRef } from "react";

// import * as pdfjsLib from "pdfjs-dist";

// pdfjsLib.GlobalWorkerOptions.workerSrc =
//     `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// type Props = {
//     url: string;
// };

// export default function PdfPreview({ url }: Props) {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const renderPdf = async () => {
//             const loadingTask = pdfjsLib.getDocument(url);
//             const pdf = await loadingTask.promise;

//             const page = await pdf.getPage(1); // hanya halaman pertama
//             const viewport = page.getViewport({ scale: 0.5 }); // kecil = thumbnail

//             const canvas = canvasRef.current!;
//             const context = canvas.getContext("2d")!;

//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             await page.render({
//                 canvasContext: context,
//                 viewport,
//             }).promise;
//         };

//         renderPdf();
//     }, [url]);

//     return (
//         <canvas
//             ref={canvasRef}
//             style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 width: "100%",
//                 maxWidth: "300px",
//             }}
//         />
//     );
// }
