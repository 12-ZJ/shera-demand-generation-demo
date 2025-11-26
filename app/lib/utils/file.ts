import { Dispatch, SetStateAction } from "react";
import { ExportDto } from "../types";

function ensureFileExtension(filename: string, fileType: string): string {
  const defaultExtensions: Record<string, string> = {
    'application/pdf': '.pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'text/plain': '.txt',
    'text/csv': '.csv'
  };

  const expectedExt = defaultExtensions[fileType];
  if (expectedExt && filename.toLowerCase().endsWith(expectedExt)) {
    return filename;
  }

  return filename + (expectedExt || '');
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64 = result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };

    reader.onerror = () => {
      reject(new Error(reader.error?.message ?? 'File reading failed'));
    };

    reader.readAsDataURL(file);
  });
}

export function downloadBase64File(file: ExportDto) {
  const bstr = atob(file.base64);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const blob = new Blob([u8arr], { type: file.fileType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = ensureFileExtension(file.filename, file.fileType ?? "");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadLocalFile(file: File) {
  const url = URL.createObjectURL(file);

  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

type ExportOptions = {
  api: () => Promise<ExportDto>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
};

 const exportHandler = async ({
  api,
  setLoading,
}: ExportOptions) => {
  try {
    setLoading?.(true);
    const res = await api();
    downloadBase64File(res);
  } catch (error) {
    console.error("export failed:", error);
  } finally {
    setLoading?.(false);
  }
};

export function getAverageColor(base64: string) {
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.src = `data:image/png;base64,${base64}`;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve("#ffffff");
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;
      let r = 0, g = 0, b = 0;
      const len = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      r = Math.round(r / len);
      g = Math.round(g / len);
      b = Math.round(b / len);
      resolve(`rgb(${r},${g},${b})`);
    };
  });
}