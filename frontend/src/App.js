import React from 'react';
import ImageUpload from './components/ImageUpload';
import ProductList from './components/ProductList';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useSelector } from 'react-redux';

function App() {
  const { loading, error } = useSelector(state => state.products);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Visual Product Matcher</h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload an image or enter a URL to find visually similar products
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ImageUpload />
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          <FilterBar />
          <ProductList />
        </div>
      </main>
    </div>
  );
}

export default App;