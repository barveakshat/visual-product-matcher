import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { matchedProducts, filters } = useSelector(state => state.products);

  const filteredProducts = matchedProducts
    .filter(product => filters.category === 'all' || product.category === filters.category)
    .sort((a, b) => {
      if (filters.sortBy === 'similarity') {
        return b.similarityScore - a.similarityScore;
      } else if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  if (matchedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products matched yet. Upload an image to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Similar Products ({filteredProducts.length})
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No products match the current filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;