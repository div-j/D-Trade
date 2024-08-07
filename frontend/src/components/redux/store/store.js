import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slice/categorySlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export default store;
