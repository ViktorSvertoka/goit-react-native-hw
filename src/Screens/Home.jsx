import React from 'react';
import { BottomMenu } from '../components/BottomTab'; // Імпорт компонента BottomMenu з папки components/BottomTab
import { useNavigation } from '@react-navigation/native'; // Імпорт хука useNavigation з пакету @react-navigation/native

const Home = () => {
  const navigation = useNavigation(); // Навігація між екранами

  return <BottomMenu navigation={navigation} />; // Відображення компонента BottomMenu з передачею об'єкта navigation в якості пропсу
};

export default Home; // Експорт компонента Home
