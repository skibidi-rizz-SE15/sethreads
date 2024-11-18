import React, { useEffect, useState } from 'react';
import { File, Image, FileText, Music, Video, Download, X } from 'lucide-react';
import { FaRegFilePdf } from "react-icons/fa";

const Modal = ({ isOpen, onClose, isClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isClose ? "animate-[fadeOut_0.15s_ease-in]" : "animate-[fadeIn_0.15s_ease-in]"}`}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-50 bg-gray-200 rounded-lg shadow-xl max-w-4xl w-full m-4">
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

const FilePreviewDialog = ({ isOpen, isClose , onClose, file }) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUrl(reader.result);
      reader.readAsDataURL(file);
    }
  }, [isOpen]);
  
  if (!file) return null;

  const isImage = file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isVideo = file.name.match(/\.(mp4|webm|ogg)$/i);
  const isPDF = file.name.match(/\.(pdf)$/i);
  const isText = file.name.match(/\.(txt)$/i);


  return (
    <Modal isOpen={isOpen} onClose={onClose} isClose={isClose}>
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

const FilesCard = ({ files, onDelete, onDownload, className = "" }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return <Image className="w-6 h-6 text-black group-hover:text-pale-gray" />;
    } else if (file.name.match(/\.(mp4|webm|ogg)$/i)) {
      return <Video className="w-6 h-6 text-black group-hover:text-pale-gray" />;
    } else if (file.name.match(/\.(mp3|wav|ogg)$/i)) {
      return <Music className="w-6 h-6 text-black group-hover:text-pale-gray" />;
    } else if (file.name.match(/\.(pdf)$/i)) {
      return <FaRegFilePdf className="w-6 h-6 text-black group-hover:text-pale-gray" />;
    }
    else {
      return <File className="w-6 h-6 text-black group-hover:text-pale-gray" />;
    }
  };

  const handleFilePreview = (file) => {
    setSelectedFile(file);
    setIsClose(false);
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
    <ul className={`flex flex-wrap gap-2 overflow-x-visible overflow-y-auto pr-2 -mr-2 max-h-[12rem] ${className}`}>
      {files.map((file, index) => (
        <li key={index} className="p-4 bg-gray-200 hover:bg-eerie-black hover:border-software-orange-hover border transition duration-150 rounded-md cursor-pointer group" onClick={() => handleFilePreview(file)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon(file)}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-nowrap text-gray-900 group-hover:text-pale-gray max-w-[8rem] overflow-hidden text-ellipsis transition duration-150">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500 group-hover:text-gray-400">
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
                  onClick={(e) => {
                      e.stopPropagation();
                      onDelete(file)
                  }}
                  className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-400"
                  title="Delete"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </li>
      ))}

      <FilePreviewDialog
        isOpen={previewOpen}
        isClose={isClose}
        onClose={() => {
          setIsClose(true);
          setTimeout(() => {
            setPreviewOpen(false)
            setSelectedFile(null);
          }, 150);
        }}
        file={selectedFile}
      />
    </ul>
  );
};

export default FilesCard;