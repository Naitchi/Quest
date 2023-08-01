// Import React/Redux
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getQuestArray } from '../../redux/questSlice';
import { RootState } from '../../redux/store';

// Style
import styles from './QuestList.module.css';

// Type
import QuestType from '../../type/QuestType';

export default function QuestList() {
  const allQuests = useSelector((state: RootState) => getQuestArray(state, 'all'));
  const mainQuests = useSelector((state: RootState) => getQuestArray(state, 'main'));

  const [all, setAll] = useState<QuestType[]>([]);
  const [result, setResult] = useState<QuestType[] | null>([]);
  const [temporary, setTemporary] = useState<QuestType[] | null>();
  const [main, setMain] = useState<QuestType[]>([]);

  const addTemporay = (item: QuestType) => {
    setTemporary((prev) => {
      if (!prev) {
        return [item];
      }
      return checkForDouble(prev, item) ? prev : [...prev, item];
    });
  };

  const checkForDouble = (array: QuestType[] | null, target: QuestType) => {
    if (array) return array.some((obj) => obj.id === target.id);
    else return false;
  };

  const searchQuest = (text: string) => {
    if (text.length === 0) return all;
    const data: QuestType[] = all
      .map((quest) => {
        if (
          quest.id.toString().includes(text.toLowerCase()) ||
          quest.name.toLowerCase().includes(text.toLowerCase())
        )
          return quest;
        else return false;
      })
      .filter((quest): quest is QuestType => quest !== false);
    setResult(data);
  };

  const removeTemporary = (itemToDelete: QuestType) => {
    setTemporary((prev) => {
      const updatedArray = prev?.filter((item) => item.id !== itemToDelete.id);
      return updatedArray?.length === 0 ? null : updatedArray;
    });
  };

  useEffect(() => {
    if (allQuests) setAll(allQuests);
    if (mainQuests) setMain(mainQuests);
  }, [allQuests, mainQuests]);

  return (
    <React.Fragment>
      <div className={styles.questList}>
        <button className={styles.onglet}> {/* TODO mettre l'icone */}</button>
        <div className={styles.main}>
          <input
            className={styles.search}
            onChange={(e) => searchQuest(e.target.value)}
            type="text"
            placeholder="Chercher une quête"
          />
          <button className={styles.reset}>x {/** TODO remplacer par une icone propre */}</button>
          <div className={styles.dropdown}>
            {result?.map((quest) => (
              <div key={quest.id}>
                <p
                  className={`
                ${styles.result}
                ${checkForDouble(result, quest) ? styles.unavailable : ''}
                `}
                  onClick={() => addTemporay(quest)}
                >
                  {quest.name}
                </p>
                {checkForDouble(result, quest) && (
                  <button onClick={() => removeTemporary(quest)}>
                    x {/** TODO remplacer par une icone propre */}
                  </button>
                )}
              </div>
            ))}
          </div>
          {temporary && (
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
            {main.length !== 0 && main?.map((quest) => <p key={quest.id}>{quest.name}</p>)}
            {/* TODO mettre le composant à la place */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
