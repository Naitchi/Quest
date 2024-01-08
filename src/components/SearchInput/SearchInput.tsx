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
  const [isFocused, setIsFocused] = useState(false);

  const allQuests: QuestType[] | null = useSelector((state: RootState) =>
    getQuestArray(state, 'all'),
  );
  const quests: QuestType[] | null = useSelector((state: RootState) =>
    getQuestArray(state, 'quests'),
  );
  const user: Info | undefined = useSelector((state: RootState) => getUser(state));

  const [searchText, setSearchText] = useState<string>('');

  const removeQuest = (itemToDelete: QuestType) => {
    const data: QuestType[] | null = quests?.filter((item) => item.id !== itemToDelete.id) ?? null;
    dispatch(
      setQuestArray({
        name: 'quests',
        content: data,
      }),
    );
    localStorage.setItem('quests', JSON.stringify(data));
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
    <div className={styles.component}>
      <input
        className={styles.search}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          searchQuest(e.target.value);
        }}
        type="text"
        placeholder="Rechercher une quête"
        onFocus={() => setIsFocused(true)}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      />
      {searchText && (
        <button className={styles.reset} onClick={() => setSearchText('')}>
          <FontAwesomeIcon icon={faCircleXmark} size="lg" />
        </button>
      )}
      {isFocused && result && (
        <div className={styles.hide}>
          <div onMouseEnter={() => setIsFocused(true)} className={styles.dropdown}>
            {result.length > 0 ? (
              result.map((quest) => (
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
              ))
            ) : (
              <p className={styles.noResults}>Aucune quête trouvé</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
