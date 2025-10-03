// src/store/blogSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

// Async thunk with proper typing
export const fetchBlogs = createAsyncThunk<
  Blog[],              // Return type (fulfilled)
  void,                // Argument type
  { rejectValue: string } // Rejected value type
>("blogs/fetch", async (_, thunkAPI) => {
  try {
    return (await apiFetch("/api/blogs")) as Blog[];
  } catch (err) {
    // Ensure we return a string error
    const message =
      err instanceof Error ? err.message : "Failed to fetch blogs";
    return thunkAPI.rejectWithValue(message);
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
      .addCase(
        fetchBlogs.fulfilled,
        (state, action: PayloadAction<Blog[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(
        fetchBlogs.rejected,
        (state, action) => {
          state.loading = false;
          // action.payload is string | undefined
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default blogSlice.reducer;
