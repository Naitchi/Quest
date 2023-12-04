// Import Redux
import { configureStore } from '@reduxjs/toolkit';

// Import Slice
import questSlice from './questSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    quest: questSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
