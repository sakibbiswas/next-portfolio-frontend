// // src/store/authSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { apiFetch } from "../lib/api";
// import { setAccessToken, clearAuth } from "../lib/auth";
// import { User } from "../types/user";

// type AuthState = {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
// };

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }: { email: string; password: string }, thunkAPI) => {
//     try {
//       const data = await apiFetch("/api/auth/login", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//       });
//       setAccessToken(data.token);
//       return data.user as User;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// export const logout = createAsyncThunk("auth/logout", async () => {
//   clearAuth();
//   return null;
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//       });
//   },
// });

// export default authSlice.reducer;




















// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "../lib/api";
import { setAccessToken, clearAuth } from "../lib/auth";
import { User } from "../types/user";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // expect { accessToken, user }
    if (!data.accessToken || !data.user) {
      throw new Error("Invalid server response");
    }

    setAccessToken(data.accessToken);
    // optionally set user to localStorage here
    return data.user as User;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk<null>("auth/logout", async () => {
  clearAuth();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
