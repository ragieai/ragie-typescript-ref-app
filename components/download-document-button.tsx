"use client";

import { Button } from "./ui/button";

export default function DownloadDocumentButton({
  documentId,
  filename,
}: {
  documentId: string;
  filename: string;
}) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}/source`);
      if (!response.ok) {
        throw new Error("Failed to download document");
      }
      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Failed to download document");
    }
  };

  return <Button onClick={handleDownload}>Download</Button>;
}
