// Import React/Redux
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

// Import Fontawesome
import { faCircle, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Type
import { Info } from '../../type/QuestType';

// Style
import styles from './MultiplayerBtn.module.scss';

export default function MultiplayerBtn() {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const info: Info | undefined = useSelector((state: RootState) => getUser(state));

  const infoChange = (value: boolean, name: string) => {
    if (info) {
      dispatch(setUser({ content: { ...info, [name]: value } }));
      localStorage.setItem('user', JSON.stringify({ ...info, [name]: value }));
    }
  };

  const handleMouseEvent = (value: boolean) => {
    setIsHovered(value);
  };

  return (
    <button
      className={styles.mainDiv}
      onMouseEnter={() => handleMouseEvent(true)}
      onMouseLeave={() => handleMouseEvent(false)}
      style={{ borderColor: info?.multiplayer ? '#298e30' : '#8e2929' }}
      onClick={() => {
        if (info) {
          const currentValue = info.multiplayer;
          const newValue = !currentValue;
          infoChange(newValue, 'multiplayer');
        }
      }}
    >
      {info?.multiplayer ? (
        <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: '#298e30' }} />
      ) : (
        <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: '#8e2929' }} />
      )}
      <FontAwesomeIcon icon={faUserGroup} />
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            minWidth: '250px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '7px',
            borderRadius: '5px',
            zIndex: 2,
          }}
        >
          Lift the level and faction restrictions to add your friends&apos; quests.
        </div>
      )}
    </button>
  );
}
