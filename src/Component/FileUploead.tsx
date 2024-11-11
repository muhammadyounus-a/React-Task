import React, { useState } from 'react';

type Props = {};

export default function FileUpload({}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log('Upload progress:', percentComplete); // Debugging log
        setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setUploadStatus('Upload successful');
      } else {
        setUploadStatus('Upload failed');
      }
      setProgress(0);  // Reset progress after upload
    };

    xhr.onerror = () => {
      setUploadStatus('Upload error');
      setProgress(0);  // Reset progress after error
    };

    xhr.send(formData);
  };

  return (
    <div className="flex justify-center h-auto mt-10">
      <div className="w-[50rem] bg-gray-400 p-4">
        <h2 className="font-medium text-2xl text-center">File Upload</h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="block my-4 mx-auto"
        />

        <button
          onClick={handleUpload}
          className="block my-4 mx-auto bg-blue-600 text-white py-2 px-4 rounded"
          disabled={!file}
        >
          Upload File
        </button>

        {progress > 0 && (
          <div className="relative pt-1">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              >
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        )}

        {uploadStatus && <p className="text-center text-white">{uploadStatus}</p>}

        {previewUrl && (
          <div className="mt-4 text-center">
            <p className="text-white">File Preview:</p>
            <img src={previewUrl} alt="Preview" className="mx-auto max-w-xs" />
          </div>
        )}
      </div>
    </div>
  );
}
