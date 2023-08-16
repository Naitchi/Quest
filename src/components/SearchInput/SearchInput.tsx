// Import React/Redux
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestArray, setQuestArray } from '../../redux/questSlice';
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

  // TODO faire une fonction pour proposé les quetes mutltiple de la map actuelle
  const searchQuest = (text: string) => {
    if (!text.length) return null;
    return allQuests?.filter(
      (quest) =>
        quest.id.toString().includes(text.toLowerCase()) ||
        quest.name.toLowerCase().includes(text.toLowerCase()),
    );
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
        placeholder="Chercher une quête"
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
                <p
                  className={`${styles.result} ${styles.unavailable}`}
                  onClick={() => removeTemporary(quest)}
                >
                  {quest.name}
                </p>
              ) : (
                <p className={`${styles.result}`} onClick={() => addTemporary(quest)}>
                  {quest.name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
