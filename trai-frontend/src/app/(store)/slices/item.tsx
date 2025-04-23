import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface itemState {
  label: string;
  location: string;
  description: string;
}

const initialState: itemState = {
    label: '',
    location: '',
    description: '',
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
      setLabel: (state, action: PayloadAction<string>) => {
        state.label = action.payload;
      },
      setLocation: (state, action: PayloadAction<string>) => {
        state.location = action.payload;
      },
      setDescription: (state, action: PayloadAction<string>) => {
        state.description = action.payload;
      },
      clearLabel: (state) => {
          state.label = "";
        },
      clearLocation: (state) => {
          state.location = "";
        },
      clearDescription: (state) => {
          state.description = "";
        },
    },
  });

export const { setLabel, setLocation, setDescription, clearLabel, clearLocation, clearDescription } = itemSlice.actions;
export default itemSlice.reducer;

