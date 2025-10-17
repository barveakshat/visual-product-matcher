import React from 'react';

/**
 * ProductCard Component
 * Displays product name, image, category, similarity score
 */
const ProductCard = ({ product }) => {
  const { name, category, image_url, similarityScore } = product;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={image_url}
          alt={name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Available';
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
          {name}
        </h3>

        <p className="text-xs text-gray-500 mb-2">
          {category}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">
            Similarity: {(similarityScore * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;