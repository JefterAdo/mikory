"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'; // For displaying images
import { HiPhotograph, HiOutlineCloudUpload, HiOutlineTrash, HiOutlineRefresh } from 'react-icons/hi'; // Icons

interface MediaItem {
  name: string;
  url: string;
  size: number;
  lastModified: string;
}

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Optional for progress bar

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch media');
      }
      setMediaItems(data.media);
    } catch (err: any) {
      setError(err.message);
      setMediaItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0); 
    const formData = new FormData();
    formData.append('file', selectedFile);

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // Simulate progress as Fetch API doesn't support it directly
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 90) {
          setUploadProgress(currentProgress);
        } else {
          if (progressInterval) clearInterval(progressInterval);
        }
      }, 150);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
      
      if (progressInterval) clearInterval(progressInterval);
      setUploadProgress(100); 

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Échec du téléchargement');
      }

      alert(`Fichier "${selectedFile.name}" téléchargé avec succès ! URL: ${result.url}`);
      setSelectedFile(null); 
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = ""; // Reset the file input visually
      fetchMedia();

    } catch (err: any) {
      if (progressInterval) clearInterval(progressInterval);
      setError(`Erreur de téléchargement: ${err.message}`);
      alert(`Erreur de téléchargement: ${err.message}`);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1500); 
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto p-4 md:p-8 text-white min-h-screen bg-gray-900">
      <header className="mb-8 pt-20"> {/* Added pt-20 for navbar spacing if fixed */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Médiathèque</h1>
        <p className="text-gray-400 mt-2">Gérez les fichiers médias de votre site.</p>
      </header>

      <section className="mb-10 p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Télécharger un nouveau média</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-300 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <HiOutlineCloudUpload className="mr-2 h-5 w-5" />
            {isUploading ? `Téléchargement...` : 'Télécharger'}
          </button>
        </div>
        {isUploading && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
            <div className="bg-primary h-2.5 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
        {selectedFile && !isUploading && (
          <p className="text-sm text-gray-400 mt-2">Fichier sélectionné : {selectedFile.name}</p>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Médias existants</h2>
          <button
            onClick={() => fetchMedia()} // Ensure it's a function call
            disabled={isLoading}
            className="p-2 text-gray-300 hover:text-primary disabled:opacity-50"
            title="Rafraîchir la liste"
          >
            <HiOutlineRefresh className={`h-6 w-6 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        {error && <p className="text-center text-red-400 py-10 bg-red-900/20 rounded-md">{error}</p>}
        
        {!isLoading && !error && mediaItems.length === 0 && (
          <p className="text-center text-gray-400 py-10">Aucun média trouvé. Commencez par en télécharger un !</p>
        )}

        {!isLoading && !error && mediaItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {mediaItems.map((item) => (
              <div key={item.name} className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-700 aspect-square flex flex-col">
                <div className="relative w-full flex-grow bg-gray-700">
                  {item.url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) ? (
                    <Image
                      src={item.url}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:opacity-80 transition-opacity duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <HiPhotograph className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                   <a href={item.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={`Voir ${item.name}`}></a>
                </div>
                <div className="p-2 bg-gray-800/80">
                  <p className="text-xs text-white truncate font-medium" title={item.name}>{item.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(item.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MediaPage;
