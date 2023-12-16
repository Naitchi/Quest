// Import React/Redux
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestArray, setQuestArray } from '../../redux/questSlice';
import { getUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

// Import Fontawesome
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Style
import styles from './SearchInput.module.scss';

// Type
import QuestType, { Info } from '../../type/QuestType';

export default function SearchInput() {
  const dispatch = useDispatch();

  const allQuests: QuestType[] | null = useSelector((state: RootState) =>
    getQuestArray(state, 'all'),
  );
  const quests: QuestType[] | null = useSelector((state: RootState) =>
    getQuestArray(state, 'quests'),
  );
  const user: Info | undefined = useSelector((state: RootState) => getUser(state));

  const [searchText, setSearchText] = useState<string>('');

  const removeQuest = (itemToDelete: QuestType) => {
    dispatch(
      setQuestArray({
        name: 'quests',
        content: quests?.filter((item) => item.id !== itemToDelete.id) ?? null,
      }),
    );
  };

  const checkForDouble = (array: QuestType[] | null | undefined, target: QuestType) => {
    return array?.some((obj) => obj.id === target.id) ?? false;
  };

  const addQuest = (item: QuestType) => {
    if (!checkForDouble(quests, item)) {
      dispatch(
        setQuestArray({
          name: 'quests',
          content: [...(quests ?? []), item],
        }),
      );
      localStorage.setItem('quests', JSON.stringify([...(quests ?? []), item]));
    }
  };

  const searchQuest = (text: string) => {
    if (!text.length || !user) return null;

    return allQuests?.filter((quest) => {
      const isMatchingName = quest.name.toLowerCase().includes(text.toLowerCase());
      const isMatchingLevel = quest.levelNeeded <= user.level;
      const isMatchingFaction = quest.factionNeeded ? quest.factionNeeded === user.faction : true;

      if (user.multiplayer) return isMatchingName;
      return isMatchingName && isMatchingLevel && isMatchingFaction;
    });
  };

  const result = searchQuest(searchText);

  return (
    <>
      <input
        className={styles.search}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          searchQuest(e.target.value);
        }}
        type="text"
        placeholder="Rechercher une quête"
      />
      {searchText && (
        <button className={styles.reset} onClick={() => setSearchText('')}>
          <FontAwesomeIcon icon={faCircleXmark} size="lg" />
        </button>
      )}
      {result && (
        <div className={styles.dropdown}>
          {result?.map((quest) => (
            <div key={quest.id}>
              {checkForDouble(quests, quest) ? (
                <button
                  className={`${styles.result} ${styles.unavailable}`}
                  onClick={() => removeQuest(quest)}
                >
                  {quest.name}
                </button>
              ) : (
                <button className={`${styles.result}`} onClick={() => addQuest(quest)}>
                  {quest.name}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
