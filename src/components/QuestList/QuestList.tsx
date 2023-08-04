// Import React/Redux
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getQuestArray } from '../../redux/questSlice';
import { RootState } from '../../redux/store';

// Style
import styles from './QuestList.module.css';

// Type
import QuestType from '../../type/QuestType';

// Import Composents
import SearchInput from '../SearchInput/SearchInput';

export default function QuestList() {
  const mainQuests = useSelector((state: RootState) => getQuestArray(state, 'main'));
  const TemporaryQuests = useSelector((state: RootState) => getQuestArray(state, 'temporary'));

  const [temporary, setTemporary] = useState<QuestType[] | null>();
  const [main, setMain] = useState<QuestType[]>([]);

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (mainQuests) setMain(mainQuests);
    if (TemporaryQuests) setTemporary(TemporaryQuests);
  }, [mainQuests, TemporaryQuests]);

  return (
    <div className={`${styles.questList} ${show ? styles.show : ''}`}>
      <button onClick={() => setShow(!show)} className={styles.onglet}>
        <img src="/assets/iconQuest.svg" alt="icone Quest" />
      </button>
      <div className={styles.main}>
        <SearchInput />
        {temporary && temporary.length > 0 && (
          <div className={styles.temporary}>
            <h2>
              Quêtes temporaire{temporary.length > 1 ? 's' : ''} :
              {/* TODO afficher le s en fonction du nombre de quetes */}
            </h2>
            {temporary?.map((quest) => (
              <p key={quest.id}>{quest.name}</p>
            ))}
            {/* TODO mettre le composant à la place */}
          </div>
        )}
        <div className={styles.mainQuest}>
          <h2>Vos Quêtes :</h2>
          {!main?.length && main?.map((quest) => <p key={quest.id}>{quest.name}</p>)}
          {/* TODO mettre le composant à la place */}
        </div>
      </div>
    </div>
  );
}
