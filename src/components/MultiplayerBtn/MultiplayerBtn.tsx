// Import React/Redux
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

// Type
import { Info } from '../../type/QuestType';

// Style
import styles from './MultiplayerBtn.module.css';

export default function MultiplayerBtn() {
  const dispatch = useDispatch();
  const info: Info | undefined = useSelector((state: RootState) => getUser(state));

  // Handle onChange for infos inputs, receive well typed value and name of the variable to change (need to clear the type inside to avoid error ? GL futur me :D)
  const infoChange = (value: any, name: string) => {
    if (info) {
      dispatch(setUser({ content: { ...info, [name]: value } }));
      localStorage.setItem('user', JSON.stringify({ ...info, [name]: value }));
    }
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
        <i className="fa-solid fa-circle" style={{ color: '#298e30' }}></i>
      ) : (
        <i className="fa-solid fa-circle" style={{ color: '#8e2929' }}></i>
      )}
      Playing with Friends
      <p className={styles.info}>?</p>
    </button>
  );
}
