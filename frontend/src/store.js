import { configureStore } from '@reduxjs/toolkit';
import productSlice from './features/productSlice';

export default configureStore({
  reducer: {
    products: productSlice,
  },
});