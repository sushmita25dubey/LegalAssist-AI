export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/msword' // doc
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.txt', '.docx', '.doc'];

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  fileType?: 'pdf' | 'txt' | 'docx';
}

export function validateFile(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file provided.' };
  }

  // Check file size
  if (file.size <= 0) {
    return { isValid: false, error: 'File is empty (0 bytes).' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return { isValid: false, error: `File size (${sizeMb} MB) exceeds the maximum allowed limit of 10 MB.` };
  }

  const fileNameLower = file.name.toLowerCase();
  const hasValidExt = ALLOWED_EXTENSIONS.some(ext => fileNameLower.endsWith(ext));

  if (!hasValidExt) {
    return { 
      isValid: false, 
      error: `Unsupported file format. Please upload a PDF (.pdf), Text (.txt), or Word document (.docx).` 
    };
  }

  // Determine file type category
  let fileType: 'pdf' | 'txt' | 'docx' = 'txt';
  if (fileNameLower.endsWith('.pdf')) {
    fileType = 'pdf';
  } else if (fileNameLower.endsWith('.docx') || fileNameLower.endsWith('.doc')) {
    fileType = 'docx';
  } else {
    fileType = 'txt';
  }

  return { isValid: true, fileType };
}
