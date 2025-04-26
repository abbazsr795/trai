import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface itemListState {
  items : any[];
}

const initialState: itemListState = {
    items: [],
}

const itemListSlice = createSlice({
    name: 'itemList',
    initialState,
    reducers: {
      setItemList: (state, action: PayloadAction<any[]>) => {
        state.items = action.payload;
      },
      addItemList: (state, action: PayloadAction<string>) => {
        state.items.push(action.payload);
      },
      clearItemList: (state) => {
          state.items = [];
        }
    },
  });

export const { addItemList, clearItemList, setItemList } = itemListSlice.actions;
export default itemListSlice.reducer;

