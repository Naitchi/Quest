// Import Redux
import { configureStore } from '@reduxjs/toolkit';

// Import Slice
import questSlice from './questSlice';

const store = configureStore({
  reducer: {
    quest: questSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
