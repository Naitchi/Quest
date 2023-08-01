import React, { useEffect, useState } from 'react';

import styles from './QuestList.module.css';

export default function QuestList() {
  const [all, setAll] = useState([]);
  const [result, setResult] = useState([]);
  const [temporary, setTemporary] = useState([]);
  const [main, setMain] = useState([]);

  const addTemporay = (id: number) => {
    const newQuest = id; // TODO ajouter une fonction pour trouver un quetes dans le all (la créé dans redux pour l'utilisé partout ?)
    setTemporary((prev) => ({ ...prev, newQuest }));
  };

  const searchQuest = (text: string) => {
    const newQuests = all.includes(text); // TODO ajouter une fonction pour trouver un quetes dans le all (la créé dans redux pour l'utilisé partout ?)
    setResult({ ...newQuests });
  };

  useEffect(() => {
    setAll(['0']); // TODO fetch toutes les quetes depuis le store.
    const mainData = ['fetch localstorage'];
    setMain([...mainData]); // TODO fetch les quetes de la personne depuis le store.
  });

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
              <p className={styles.result} key={quest.id} onClick={() => addTemporay(quest.id)}>
                {quest.name}
              </p>
            ))}
          </div>
          <div className={styles.temporary}>
            <h2>Quêtes temporaires : {/* TODO afficher le s en fonction du nombre de quetes */}</h2>
            {temporary?.map((quest) => {
              return quest; /* TODO supprimer le return et les {} et mettre le composant à la place */
            })}
          </div>
          <div className={styles.mainQuest}>
            <h2>Vos Quêtes :</h2>
            {main?.map((quest) => {
              return quest; /* TODO supprimer le return et les {} et mettre le composant à la place */
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
