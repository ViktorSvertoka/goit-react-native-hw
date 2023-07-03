import LoginScreen from './src/Screens/LoginScreen';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoBold: require('./src/fonts/Roboto-Bold.ttf'), // Завантаження шрифту Roboto-Bold
    RobotoRegular: require('./src/fonts/Roboto-Regular.ttf'), // Завантаження шрифту Roboto-Regular
    RobotoMedium: require('./src/fonts/Roboto-Medium.ttf'), // Завантаження шрифту Roboto-Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </>
  );
}
