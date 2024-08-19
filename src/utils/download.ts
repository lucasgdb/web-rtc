export function download(blob: Blob, { fileName, mimeType }: { fileName: string; mimeType: string }) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = mimeType === 'video/mp4' ? `${fileName}.mp4` : `${fileName}.webm`;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
