import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Type
import QuestType from '@/type/QuestType';
interface QuestsType {
  all: QuestType[] | null;
  main: QuestType[] | null;
  temporary: QuestType[] | null;
}
type QuestArrayName = 'all' | 'main' | 'temporary';

interface SetQuestArrayPayload {
  name: QuestArrayName;
  content: QuestType[];
}

const initialState: QuestsType = {
  all: null,
  main: null,
  temporary: null,
};

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setQuestArray: (state, action: PayloadAction<SetQuestArrayPayload>) => {
      state[action.payload.name] = action.payload.content;
    },
  },
});

export const { setQuestArray } = questSlice.actions;

export default questSlice.reducer;

export const getQuestArray = (state: RootState, arrayName: QuestArrayName) => {
  return state.quest[arrayName];
};
