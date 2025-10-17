import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../features/productSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const { filters, matchedProducts } = useSelector(state => state.products);

  const categories = ['all', ...new Set(matchedProducts.map(p => p.category))];

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  const handleSortChange = (sortBy) => {
    dispatch(setFilters({ sortBy }));
  };

  if (matchedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-medium mb-3">Filters & Sorting</h3>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="similarity">Similarity Score</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;