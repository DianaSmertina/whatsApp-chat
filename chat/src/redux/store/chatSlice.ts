import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  chatId: string | null;
  messages: Array<{ isSenderMe: boolean; text: string }>;
};

const initialState: SliceState = {
  chatId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRecipient(state, action) {
      state.chatId = action.payload.chatId;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { setRecipient, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
