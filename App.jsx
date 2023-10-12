import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import Main from './src/components/Main/Main';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('./src/fonts/Roboto-Regular.ttf'),
          'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf'),
          'Roboto-Bold': require('./src/fonts/Roboto-Bold.ttf'),
        });
      } catch (error) {
        console.warn('Error loading assets:', error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  });

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Main onLayout={onLayoutRootView} />
    </Provider>
  );
}
