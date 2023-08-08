// Import React/Redux
import Link from 'next/link';
import { modifyAQuest, QuestArrayName } from '../../redux/questSlice';
import { useDispatch } from 'react-redux';
// Type
import QuestType, { Objectif } from '@/type/QuestType';

// Style
import styles from './QuestResume.module.css';

export default function QuestResume({ type, quest }: { type: QuestArrayName; quest: QuestType }) {
  const dispatch = useDispatch();

  const showEyes = (index: number, objectif: Objectif, quest: QuestType) => {
    if (objectif.show === undefined) return null;
    return objectif.show ? (
      <button onClick={() => toggleObjectif(quest, index)}>Caché</button>
    ) : (
      <button onClick={() => toggleObjectif(quest, index)}>Montré</button>
    );
  };
  const showMainEyes = (quest: QuestType) => {
    if (quest.show === undefined) return null;
    return quest.show ? (
      <button onClick={() => toggleQuest(quest)}>Caché</button>
    ) : (
      <button onClick={() => toggleQuest(quest)}>Montré</button>
    );
  };
  const updateQuest = (quest: QuestType) => {
    dispatch(modifyAQuest({ name: type, content: quest }));
  };
  const toggleQuest = (quest: QuestType) => {
    const newShow = !quest.show;
    const newQuest = {
      ...quest,
      show: !quest.show,
      objectifs: quest.objectifs.map((objectif) => {
        if (objectif.show === undefined) return { ...objectif };
        return { ...objectif, show: newShow };
      }),
    };
    updateQuest(newQuest);
  };
  const toggleObjectif = (quest: QuestType, index: number) => {
    const newQuest = {
      ...quest,
      objectifs: [
        ...quest.objectifs.slice(0, index),
        { ...quest.objectifs[index], show: !quest.objectifs[index].show },
        ...quest.objectifs.slice(index + 1),
      ],
    };
    updateQuest(newQuest);
  };

  return (
    <div>
      <div>
        {showMainEyes(quest)}
        <h3>
          {/* TODO cheque pour les noms de quete à plusieurs mots et si besoin faire une fonction pour formaté le nom */}
          <Link
            className={styles.link}
            href={`https://escapefromtarkov.fandom.com/wiki/${quest.name}`}
            target="_blank"
          >
            {quest.name}
          </Link>
        </h3>
      </div>
      <div>
        <ul className={styles.ul}>
          {quest.objectifs?.map((objectif: Objectif, index: number) => (
            <div className={styles.row} key={objectif.id}>
              {showEyes(index, objectif, quest)}
              <li
                className={objectif.subtask ? styles.tabulation : ''}
                dangerouslySetInnerHTML={{ __html: objectif.description }}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
