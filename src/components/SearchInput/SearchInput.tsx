// Import React/Redux
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestArray, setQuestArray } from '../../redux/questSlice';
import { getUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

// Style
import styles from './SearchInput.module.css';

// Type
import QuestType from '../../type/QuestType';

export default function SearchInput() {
  const dispatch = useDispatch();

  const allQuests = useSelector((state: RootState) => getQuestArray(state, 'all'));
  const mainQuests = useSelector((state: RootState) => getQuestArray(state, 'main')); // TODO utilisé main pour grisé/et rendre impossible l'ajout ou la suppression via la recherche
  const temporaryQuests = useSelector((state: RootState) => getQuestArray(state, 'temporary'));
  const user = useSelector((state: RootState) => getUser(state));

  const [searchText, setSearchText] = useState<string>('');

  const removeTemporary = (itemToDelete: QuestType) => {
    dispatch(
      setQuestArray({
        name: 'temporary',
        content: temporaryQuests?.filter((item) => item.id !== itemToDelete.id) ?? null,
      }),
    );
  };

  const checkForDouble = (array: QuestType[] | null | undefined, target: QuestType) => {
    return array?.some((obj) => obj.id === target.id) ?? false;
  };

  const addTemporary = (item: QuestType) => {
    if (!checkForDouble(temporaryQuests, item)) {
      dispatch(
        setQuestArray({
          name: 'temporary',
          content: [...(temporaryQuests ?? []), item],
        }),
      );
    }
  };

  const searchQuest = (text: string) => {
    if (!text.length || !user) return null;
    console.log(text, user);

    return allQuests?.filter((quest) => {
      const isMatchingID = quest.id.toString().includes(text.toLowerCase());
      const isMatchingName = quest.name.toLowerCase().includes(text.toLowerCase());
      const isMatchingLevel = quest.levelNeeded <= user.level;
      const isMatchingFaction = quest.factionNeeded ? quest.factionNeeded === user.faction : true;

      return isMatchingID || isMatchingName || (isMatchingLevel && isMatchingFaction);
    });
  };

  const result = searchQuest(searchText);
  console.log(result);

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
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      )}
      {result && (
        <div className={styles.dropdown}>
          {result?.map((quest) => (
            <div key={quest.id}>
              {checkForDouble(temporaryQuests, quest) ? (
                <button
                  className={`${styles.result} ${styles.unavailable}`}
                  onClick={() => removeTemporary(quest)}
                >
                  {quest.name}
                </button>
              ) : (
                <button className={`${styles.result}`} onClick={() => addTemporary(quest)}>
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
