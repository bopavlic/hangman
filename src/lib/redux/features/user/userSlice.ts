import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserNameState = {
  userName: string;
};

const initialState: UserNameState = {
  userName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { saveUserName } = userSlice.actions;

export default userSlice.reducer;
