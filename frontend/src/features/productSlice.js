import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Logger from '../utils/logger';
import { 
  uploadProductImage, 
  uploadProductUrl, 
  findSimilarProducts, 
  getAllProducts 
} from '../api/endpoints';

export const uploadImage = createAsyncThunk(
  'products/uploadImage',
  async (data, { rejectWithValue }) => {
    try {
      let response;
      
      if (data instanceof FormData) {
        const file = data.get('image');
        const name = data.get('name') || 'Unnamed Product';
        Logger.debug('Uploading file:', file.name);
        response = await uploadProductImage(file, name);
      } else if (data.imageUrl) {
        Logger.debug('Uploading URL:', data.imageUrl);
        response = await uploadProductUrl(data.imageUrl, data.name);
      } else {
        throw new Error('Invalid upload data');
      }
      
      Logger.debug('Upload successful:', response);
      return response;
    } catch (error) {
      Logger.error('Upload error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Upload failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const matchProducts = createAsyncThunk(
  'products/matchProducts',
  async (imageUrl, { rejectWithValue }) => {
    try {
      Logger.debug('Finding matches for:', imageUrl);
      const response = await findSimilarProducts(imageUrl);
      Logger.debug('Found matches:', response.count);
      return response;
    } catch (error) {
      Logger.error('Match error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Matching failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      Logger.debug('Fetching all products...');
      const response = await getAllProducts();
      Logger.debug('Fetched products:', response.count);
      return response;
    } catch (error) {
      Logger.error('Fetch error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch products';
      return rejectWithValue(errorMessage);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    uploadedImage: null,
    matchedProducts: [],
    allProducts: [],
    loading: false,
    error: null,
    filters: {
      category: 'all',
      sortBy: 'similarity'
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    resetUpload: (state) => {
      state.uploadedImage = null;
      state.matchedProducts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedImage = action.payload.data?.image_url || action.payload.image_url;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(matchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(matchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.matchedProducts = action.payload.data || action.payload;
      })
      .addCase(matchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data || action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearError, resetUpload } = productSlice.actions;
export default productSlice.reducer;