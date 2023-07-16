import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';

import { FontAwesome } from '@expo/vector-icons';

import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

const CameraScreen = ({ navigation }) => {
  // Створення станів за допомогою useState хука
  const [photo, setPhoto] = useState(); // Збереження URL фотографії, зробленої камерою
  const [location, setLocation] = useState(null); // Збереження інформації про місцезнаходження
  const [cameraAllow, setCameraAllow] = useState(); // Дозвіл на використання камери
  const [libraryAllow, setLibraryAllow] = useState(); // Дозвіл на доступ до медіатеки

  // Створення посилання на об'єкт камери за допомогою useRef хука
  const camera = useRef();

  // Використання useEffect хука для виконання певних дій при завантаженні компонента
  useEffect(() => {
    (async () => {
      // Отримання дозволу на використання геолокації
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Не вдалося визначити місцезнаходження');
      }

      // Отримання поточної геолокації
      const location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);

      // Отримання дозволів на використання камери та медіатеки
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const libraryPermission = await MediaLibrary.requestPermissionsAsync();
      setCameraAllow(cameraPermission.status === 'granted');
      setLibraryAllow(libraryPermission.status === 'granted');
    })();
  }, []);

  // Функція для зйомки фотографії за допомогою камери
  const takePhoto = async () => {
    const newPhoto = await camera.current.takePictureAsync();
    setPhoto(newPhoto.uri);
  };
  console.log(libraryAllow);

  // Умовна конструкція для перевірки наявності фотографії і відображення відповідного екрану
  if (photo) {
    // Функція для збереження фотографії та переходу до сторінки створення публікації
    const savePhoto = () => {
      navigation.navigate('Створити публікацію', { photo, location });
    };

    // Відображення екрану після зйомки фотографії
    return (
      <View style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo }} />
        <View style={styles.buttonContainer}>
          {libraryAllow ? (
            <TouchableOpacity
              style={{ ...styles.button, marginRight: 30 }}
              onPress={savePhoto}
            >
              <Text style={styles.textButton}>Зберегти</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.textButton}>Перезняти</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Відображення екрану перед зйомкою фотографії
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Camera ref={camera} style={styles.camera}>
        <TouchableOpacity style={styles.takeButton} onPress={takePhoto}>
          <FontAwesome name="camera" size={24} color="gray" />
          {/* <DownloadPhoto /> */}
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  preview: {
    width: '100%',
    height: '100%',
    flex: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  button: {
    width: 150,
    height: 50,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  takeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
});
