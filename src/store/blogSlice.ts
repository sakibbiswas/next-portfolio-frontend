// src/store/blogSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../lib/api";
import { Blog } from "../types/blog";

type BlogState = {
  items: Blog[];
  loading: boolean;
  error: string | null;
};

const initialState: BlogState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetch", async (_, thunkAPI) => {
  try {
    return (await apiFetch("/api/blogs")) as Blog[];
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
