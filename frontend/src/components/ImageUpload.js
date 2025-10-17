import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, matchProducts, resetUpload } from '../features/productSlice';
import Logger from '../utils/logger';

/**
 * ImageUpload Component
 * Handles file uploads and URL input with preview and validation
 */
const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'url'
  const [productName, setProductName] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { uploadedImage, loading } = useSelector(state => state.products);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (inputMode === 'file' && !fileInputRef.current?.files[0]) {
      alert('Please select a file');
      return;
    }
    if (inputMode === 'url' && !imageUrl.trim()) {
      alert('Please enter a valid URL');
      return;
    }

    dispatch(resetUpload());

    let formData;
    let matchImageUrl; // The URL/data to use for matching
    
    if (inputMode === 'file') {
      formData = new FormData();
      formData.append('image', fileInputRef.current.files[0]);
      formData.append('name', productName.trim() || 'Uploaded Product');
      
      // For file uploads, use the preview (base64) for matching since files don't persist on Render
      matchImageUrl = previewUrl;
    } else {
      formData = { 
        imageUrl: imageUrl.trim(),
        name: productName.trim() || 'Product from URL'
      };
      
      // For URL uploads, use the original URL
      matchImageUrl = imageUrl.trim();
    }

    try {
      const result = await dispatch(uploadImage(formData)).unwrap();
      Logger.debug('Upload result:', result);
      
      // Use the matchImageUrl we prepared earlier instead of the response URL
      // This avoids 404 errors with ephemeral filesystem on Render
      Logger.debug('Matching products with:', inputMode === 'file' ? 'base64 data' : matchImageUrl);
      await dispatch(matchProducts(matchImageUrl)).unwrap();
    } catch (error) {
      Logger.error('Upload failed:', error);
      
      // Better error message for timeout due to cold start
      if (error.message && error.message.includes('timeout')) {
        alert('Request timed out. The server may be waking up (cold start on free tier). Please try again in a few seconds.');
      } else if (error.code === 'ECONNABORTED') {
        alert('Connection timeout. Please wait a moment and try again - the server may be starting up.');
      } else {
        alert(`Upload failed: ${error.message || error}`);
      }
    }
  };

  const resetForm = () => {
    setImageUrl('');
    setPreviewUrl('');
    setProductName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    dispatch(resetUpload());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

      {/* Input Mode Toggle */}
      <div className="mb-4">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="file"
              checked={inputMode === 'file'}
              onChange={(e) => setInputMode(e.target.value)}
              className="mr-2"
            />
            Upload File
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="url"
              checked={inputMode === 'url'}
              onChange={(e) => setInputMode(e.target.value)}
              className="mr-2"
            />
            Image URL
          </label>
        </div>
      </div>

      {/* Product Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name (Optional)
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g., iPhone 15 Pro Max"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* File Input */}
      {inputMode === 'file' && (
        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}

      {/* URL Input */}
      {inputMode === 'url' && (
        <div className="mb-4">
          <input
            type="url"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="Enter image URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-xs max-h-48 object-contain border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleUpload}
          disabled={loading || (!fileInputRef.current?.files[0] && !imageUrl.trim())}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Find Similar Products'}
        </button>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Uploaded Image Info */}
      {uploadedImage && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 text-sm">Image uploaded successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;