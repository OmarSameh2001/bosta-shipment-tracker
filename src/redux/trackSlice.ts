import { createSlice } from '@reduxjs/toolkit';

interface ApiState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

const trackSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setData(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, setData, setError } = trackSlice.actions;

export default trackSlice.reducer;
