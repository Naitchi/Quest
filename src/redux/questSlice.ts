// Import Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Types
import QuestType from '@/type/QuestType';
interface QuestsType {
  all: QuestType[] | null;
  main: QuestType[] | null;
  temporary: QuestType[] | null;
}
export type QuestArrayName = 'all' | 'main' | 'temporary';

interface SetQuestArrayPayload {
  name: QuestArrayName;
  content: QuestType[] | null;
}

interface ModifyQuestPayload {
  name: QuestArrayName;
  content: QuestType;
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
    modifyAQuest: (state, action: PayloadAction<ModifyQuestPayload>) => {
      const arrayName = action.payload.name;
      const updatedQuest = action.payload.content;

      state[arrayName] = state[arrayName]!.map((quest: QuestType) =>
        quest.id === updatedQuest.id ? { ...updatedQuest } : quest,
      );
    },
  },
});

export const { setQuestArray, modifyAQuest } = questSlice.actions;

export default questSlice.reducer;

export const getQuestArray = (state: RootState, arrayName: QuestArrayName) => {
  return state.quest[arrayName];
};
