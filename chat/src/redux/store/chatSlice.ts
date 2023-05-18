import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  chatId: string | null;
  isChatStarted: boolean;
  messages: Array<{ isSenderMe: boolean; text: string }>;
};

const initialState: SliceState = {
  chatId: null,
  isChatStarted: false,
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
    startChat(state) {
      if (!state.isChatStarted) {
        state.isChatStarted = true;
      }
    },
  },
});

export const { setRecipient, addMessage, startChat } = chatSlice.actions;
export default chatSlice.reducer;
