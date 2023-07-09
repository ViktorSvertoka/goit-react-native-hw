import React from 'react';

import { BottomMenu } from '../components/BottomTab';

import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return <BottomMenu navigation={navigation} />;
};

export default Home;
