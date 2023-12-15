// Import React/Redux
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getQuestArray } from '../../redux/questSlice';
import { RootState } from '../../redux/store';

// Style
import styles from './QuestList.module.scss';

// Type
import QuestType from '../../type/QuestType';

// Import Composents
import SearchInput from '../SearchInput/SearchInput';
import QuestResume from '../QuestResume/QuestResume';

export default function QuestList() {
  const quests: QuestType[] | null = useSelector((state: RootState) =>
    getQuestArray(state, 'quests'),
  );

  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={`${styles.questList} ${show ? styles.show : ''}`}>
      <button onClick={() => setShow(!show)} className={styles.onglet}>
        <img src="/assets/iconQuest.svg" alt="icone Quest" />
      </button>
      <div className={styles.main}>
        <SearchInput />
        {quests && quests.length > 0 && (
          <div className={styles.temporary}>
            <h2 className={styles.title}>Quêtes temporaire{quests.length > 1 ? 's' : ''} :</h2>
            {quests?.map((quest) => (
              <QuestResume key={quest.id} type={'quests'} quest={quest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
