import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://localhost:5000/api/category/all');
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async ({ name }, { dispatch }) => {
  const response = await axios.post('http://localhost:5000/api/category/add', { name });
  if (response.status === 201) {
    toast.success('Category created successfully');
    dispatch(fetchCategories());
  }
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ slug, name }, { dispatch }) => {
  const response = await axios.put(`http://localhost:5000/api/category/update/${slug}`, { name });
  if (response.status === 200) {
    toast.success('Category updated successfully');
    dispatch(fetchCategories());
  }
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (slug, { dispatch }) => {
  const response = await axios.delete(`http://localhost:5000/api/category/delete/${slug}`);
  if (response.status === 200) {
    toast.success('Category deleted successfully');
    dispatch(fetchCategories());
  }
  return response.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    name: '',
    slug: '',
    editMode: false,
    editId: null,
    status: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    editCategory: (state, action) => {
      const { _id, name, slug } = action.payload;
      state.editMode = true;
      state.editId = _id;
      state.name = name;
      state.slug = slug;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error fetching categories:', action.error.message);
      })
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error creating category:', action.error.message);
        toast.error('Error creating category');
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = 'succeeded';
        state.editMode = false;
        state.editId = null;
        state.name = '';
        state.slug = '';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error updating category:', action.error.message);
        toast.error('Error updating category');
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error deleting category:', action.error.message);
        toast.error('Error deleting category');
      });
  },
});

export const { setName, setSlug, setEditMode, setEditId, editCategory } = categorySlice.actions;

export default categorySlice.reducer;
