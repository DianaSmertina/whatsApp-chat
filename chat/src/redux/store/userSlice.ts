import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  idInstance: string | null;
  apiTokenInstance: string | null;
};

const initialState: SliceState = {
  idInstance: null,
  apiTokenInstance: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
