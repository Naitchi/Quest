// Import React/Redux
import Link from 'next/link';
import { modifyAQuest, QuestArrayName, getQuestArray, setQuestArray } from '../../redux/questSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../redux/store';

// Import Fontawesome
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Type
import QuestType, { Objectif } from '@/type/QuestType';

// Style
import styles from './QuestResume.module.scss';

// Components
import Eye from '../Eye/Eye';

export default function QuestResume({
  type,
  quest,
}: Readonly<{ type: QuestArrayName; quest: QuestType }>) {
  const dispatch = useDispatch();
  const router = useRouter();
  const quests: QuestType[] | null = useSelector((state: RootState) =>
    getQuestArray(state, 'quests'),
  );

  const showEyes = (index: number, objectif: Objectif, quest: QuestType) => {
    if (
      objectif.show === undefined ||
      (objectif.maps !== undefined && objectif.maps !== router.query.slug)
    )
      return null;
    return <Eye show={objectif.show} onClick={() => toggleObjectif(quest, index)} />;
  };

  const showMainEyes = (quest: QuestType) => {
    if (quest.show === undefined) return null;
    return <Eye show={quest.show} onClick={() => toggleQuest(quest)} />;
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

  return (
    <div className={styles.resume}>
      <div className={styles.name}>
        {showMainEyes(quest)}
        <h3>
          <Link
            className={styles.link}
            href={`https://escapefromtarkov.fandom.com/wiki/${quest.name}`}
            target="_blank"
          >
            {quest.name}
          </Link>
          <button className={styles.remove} onClick={() => removeQuest(quest)}>
            <FontAwesomeIcon icon={faCircleXmark} size="lg" />
          </button>
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
