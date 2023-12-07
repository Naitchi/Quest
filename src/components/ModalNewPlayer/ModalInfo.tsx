import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

import { Info } from '../../type/QuestType';

import styles from './ModalInfo.module.css';

export default function ModalInfo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [Info, setInfo] = useState();
  const dispatch = useDispatch();
  const info: Info | undefined = useSelector((state: RootState) => getUser(state));

  const slides = [
    <div key={1}>
      <img src="" alt="/assets/iconQuest.svg" />
      <p>Bienvenue sur Quest-eft</p>
      <p></p>
    </div>,
    <div key={2}></div>,
    <div key={3}></div>,
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const infoChange = (value: any, name: string) => {
    if (info) {
      dispatch(setUser({ content: { ...info, [name]: value } }));
      localStorage.setItem('user', JSON.stringify({ ...info, [name]: value }));
    }
  };

  return (
    <>
      <button className={styles.close}>fermer</button>
      <div className={styles.container}>
        <button className={styles.previous} onClick={prevSlide}>
          Previous
        </button>
        <div className={styles.silde}>{slides[currentSlide]}</div>
        <button className={styles.next} onClick={nextSlide}>
          Next
        </button>
      </div>
    </>
  );
}
