// Import React/Redux
import React, { useEffect, useState } from 'react';
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
  const mainQuests = useSelector((state: RootState) => getQuestArray(state, 'main'));
  const temporaryQuests = useSelector((state: RootState) => getQuestArray(state, 'temporary'));

  const [temporary, setTemporary] = useState<QuestType[] | null>();
  const [main, setMain] = useState<QuestType[]>([]);

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (mainQuests) setMain(mainQuests);
    if (temporaryQuests) setTemporary(temporaryQuests);
  }, [mainQuests, temporaryQuests]);

  return (
    <div className={`${styles.questList} ${show ? styles.show : ''}`}>
      <button onClick={() => setShow(!show)} className={styles.onglet}>
        <img src="/assets/iconQuest.svg" alt="icone Quest" />
      </button>
      <div className={styles.main}>
        <SearchInput />
        {temporary && temporary.length > 0 && (
          <div className={styles.temporary}>
            <h2 className={styles.title}>Quêtes temporaire{temporary.length > 1 ? 's' : ''} :</h2>
            {temporary?.map((quest) => (
              <QuestResume key={quest.id} type={'temporary'} quest={quest} />
            ))}
          </div>
        )}
        {/* <div className={styles.mainQuest}>
          <h2>Vos Quêtes :</h2>
          {!main?.length &&
            main?.map((quest) => <QuestResume key={quest.id} type={'main'} quest={quest} />)}
        </div> */}
      </div>
    </div>
  );
}
