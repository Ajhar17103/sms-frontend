import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

let BASEURL=process.env.NEXT_PUBLIC_API_URL

// Define a type for the menu data (adjust as per your API response)
interface MenuState {
  menu: any;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MenuState = {
  menu: null,
  loading: false,
  error: null,
};


// Async thunk for menu creation API
export const createMenu = createAsyncThunk(
  'menu/createMenu',
  async (menuData: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${BASEURL}/menu/create'`,
        menuData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error occurred');
    }
  }
);

// Create the slice
const menuReducer = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.loading = false;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default menuReducer.reducer;
