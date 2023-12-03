// Import Next/React/Redux
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuestArray } from '../redux/questSlice';
import { useRouter } from 'next/router';

// Type
import QuestList from '../components/QuestList/QuestList';
import QuestType, { map } from '../type/QuestType';

// Components
const MapComponent = dynamic(() => import('@/components/MapComponent/MapComponent'), {
  ssr: false,
});

export default function Quest() {
  const dispatch = useDispatch();
  const router = useRouter();

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
        <script src="https://kit.fontawesome.com/bf63fdfe50.js"></script>
      </Head>
      <QuestList />
      {router?.query?.slug && <MapComponent />}
    </React.Fragment>
  );
}
