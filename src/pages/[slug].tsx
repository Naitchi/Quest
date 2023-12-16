// Import Next/React/Redux
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuestArray } from '../redux/questSlice';
import { setUser } from '../redux/userSlice';
import { useRouter } from 'next/router';

// Type
import QuestType, { map, Info } from '../type/QuestType';

// Components
import QuestList from '../components/QuestList/QuestList';
import MultiplayerBtn from '@/components/MultiplayerBtn/MultiplayerBtn';
const MapComponent = dynamic(() => import('@/components/MapComponent/MapComponent'), {
  ssr: false,
});

export default function Quest() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchDataUser = () => {
      const data: any = localStorage.getItem('user');
      if (data) {
        const info: Info = JSON.parse(data);
        dispatch(setUser({ content: info }));
      }
    };
    const fetchQuestsUser = () => {
      const data: any = localStorage.getItem('quests');
      if (data) {
        const quests: QuestType[] = JSON.parse(data);
        dispatch(
          setQuestArray({
            name: 'quests',
            content: quests,
          }),
        );
      }
    };
    fetchDataUser();
    fetchQuestsUser();
  }, []);

  useEffect(() => {
    const maps: map[] = [
      'customs',
      'factory',
      'woods',
      'reserve',
      'lighthouse',
      'shoreline',
      'interchange',
      'streets',
      'lab',
    ];

    const estDeTypeMap = (value: any): value is map => {
      if (maps.includes(value)) {
        return true;
      } else {
        router.push('/');
        return false;
      }
    };
    const fetchData = async (map: map) => {
      const mapQuests: Response = await fetch(`/mock/${map}.json`);
      const multipuleQuests: Response = await fetch(`/mock/multiples.json`);

      const mapJsonData: QuestType[] = await mapQuests.json();
      const multipleMapsjsonData: QuestType[] = await multipuleQuests.json();

      const quests = mapJsonData.concat(multipleMapsjsonData);

      if (quests) {
        dispatch(setQuestArray({ name: 'all', content: quests }));
      }
    };

    if (router?.query?.slug && estDeTypeMap(router.query.slug)) {
      fetchData(router?.query?.slug);
    }
  }, [router.query.slug]);

  return (
    <React.Fragment>
      <Head>
        <title>{router.query.slug} | Quest</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
      </Head>
      <MultiplayerBtn />
      <QuestList />
      {router?.query?.slug && <MapComponent />}
    </React.Fragment>
  );
}
