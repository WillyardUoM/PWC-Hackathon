import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { MdPadding } from 'react-icons/md';


function CertificateIt() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenerateCertificate = async () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000);
    if (name.trim() !== '') {
      generatePDF(name);
    }
  };

  const generatePDF = async (name) => {
    // Fetch existing PDF
    const existingPdfBytes = await fetch('../../public/Certificate.pdf').then((res) =>
      res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Draw a string of text diagonally across the first page
    firstPage.drawText(name, {
      x: 300,
      y: 270,
      size: 58,
      color: rgb(0.529, 0.043, 0.345), // RGB color values
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Convert the bytes to a Blob
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a download link and trigger the download
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newcertificate.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main>
      <div>

      <InputText value={name} onChange={handleNameChange}  />
      <p></p>
        <Button label="Submit" icon="pi pi-check" loading={loading} onClick={handleGenerateCertificate} />

      </div>
    </main>
  );
}

export default CertificateIt;
