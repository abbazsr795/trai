import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  email: string;
  password: string;
  token: string | null;
}

const initialState: SessionState = {
  email: '',
  password: '',
  token: null,
};

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
        state.token = null;
      },
      clearPassword: (state) => {
        state.password = "";
      },
      clearEmail: (state) => {
        state.email = "";
      },
  },
});

export const { setEmail, setPassword, setToken, clearEmail, clearPassword, clearToken } = credentialsSlice.actions;
export default credentialsSlice.reducer;
