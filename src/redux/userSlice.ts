// Import Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Types
import { Info } from '@/type/QuestType';

interface UserType {
  info: Info | undefined;
}

const initialState: UserType = {
  info: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ content: Info }>) => {
      state.info = action.payload.content;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => {
  return state.user.info;
};
