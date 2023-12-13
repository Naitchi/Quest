// Import React/Redux
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

// Import Fontawesome
import { faCircle } from '@fortawesome/free-solid-svg-icons';
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

  // Handle onChange for infos inputs, receive well typed value and name of the variable to change (need to clear the type inside to avoid error ? GL futur me :D)
  const infoChange = (value: any, name: string) => {
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
      Playing with Friends
      <p
        onMouseEnter={() => handleMouseEvent(true)}
        onMouseLeave={() => handleMouseEvent(false)}
        className={styles.info}
      >
        ?
      </p>
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '100%',
            minWidth: '250px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '7px',
            borderRadius: '5px',
            zIndex: 1,
          }}
        >
          Lève les restrictions de level et de faction pour pouvoir ajouter les quêtes de tes amis
        </div>
      )}
    </button>
  );
}
