import React, { useState } from 'react';
import { File, Image, FileText, Music, Video, Download, X } from 'lucide-react';
import { FaRegFilePdf } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-4xl w-full m-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const FilePreviewDialog = ({ isOpen, onClose, file }) => {
  if (!file) return null;

  const isImage = file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isVideo = file.name.match(/\.(mp4|webm|ogg)$/i);
  const isPDF = file.name.match(/\.(pdf)$/i);
  const isText = file.name.match(/\.(txt)$/i);

  const url = URL.createObjectURL(file);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">{file.name}</h2>
        <div className="mt-4">
          {isImage && (
            <img
              src={url}
              alt={file.name}
              className="max-w-full h-auto rounded"
            />
          )}
          {isVideo && (
            <video
              controls
              className="max-w-full h-auto rounded"
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {isPDF && (
            <iframe
              src={url}
              className="w-full h-[600px] rounded"
              title={file.name}
            />
          )}
          {isText && (
            <iframe
              src={url}
              className="w-full h-[600px] rounded text-gray-900"
              title={file.name}
            />
          )}
          {!isImage && !isVideo && !isPDF && !isText && (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 mx-auto text-gray-400" />
              <p className="mt-2">Preview not available for this file type</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

const FilesCard = ({ files, onDelete, onDownload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return <Image className="w-6 h-6 text-black" />;
    } else if (file.name.match(/\.(mp4|webm|ogg)$/i)) {
      return <Video className="w-6 h-6 text-black" />;
    } else if (file.name.match(/\.(mp3|wav|ogg)$/i)) {
      return <Music className="w-6 h-6 text-black" />;
    } else if (file.name.match(/\.(pdf)$/i)) {
        return <FaRegFilePdf className="w-6 h-6 text-black" />;
    }
    else {
      return <File className="w-6 h-6" />;
    }
  };

  const handleFilePreview = (file) => {
    setSelectedFile(file);
    setPreviewOpen(true);
  };

  if (!files || files.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center">No files attached</p>
      </div>
    );
  }

  return (
    <div className="">
      <ul className="flex gap-4 flex-wrap">
        {files.map((file, index) => (
          <li key={index} className="p-4 bg-white hover:bg-neutral-500 transition duration-150 rounded-md cursor-pointer" onClick={() => handleFilePreview(file)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getFileIcon(file)}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
              <div className="flex items-center ml-3">
                {onDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(file);
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-50"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(file)}
                    className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                    title="Delete"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <FilePreviewDialog
        isOpen={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedFile(null);
        }}
        file={selectedFile}
      />
    </div>
  );
};

export default FilesCard;