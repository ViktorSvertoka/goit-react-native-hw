import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { FontAwesome, EvilIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import posts from '../data/posts';

// Створення навігації в нижній частині екрану
const BottomTabs = createBottomTabNavigator();

// Компонент для створення публікації
const CreatePost = () => {
  // Використання хука useNavigation для навігації між екранами
  const navigation = useNavigation();

  // Створення станів за допомогою useState хука
  const [postPhoto, setPostPhoto] = useState(null); // Збереження URL фотографії для публікації
  const [photoName, setPhotoName] = useState(''); // Збереження назви фотографії
  const [photoLocationName, setPhotoLocationName] = useState(''); // Збереження місцевості фотографії
  const [hasPermission, setHasPermission] = useState(null); // Дозвіл на використання камери
  const [currentGeoLocation, setCurrentGeoLocation] = useState({}); // Поточна геолокація
  const cameraRef = useRef(null); // Посилання на об'єкт камери

  // Використання useEffect хука для отримання поточної геолокації
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentGeoLocation(coords);
    })();
  }, []);

  // Використання useEffect хука для отримання дозволу на використання камери
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Функція для зйомки фотографії за допомогою камери
  const makePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPostPhoto(uri);
    }
  };

  // Умовна конструкція для відображення компонентів залежно від наявності дозволу на використання камери
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Функція для очищення даних після створення публікації
  const clearData = () => {
    setPostPhoto(null);
    setPhotoName('');
    setPhotoLocationName('');
  };

  // Функція для завантаження фотографії з галереї пристрою
  const uploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) setPostPhoto(result.assets[0].uri);
  };

  // Функція для обробки натискання кнопки "Опубліковати"
  const handleSubmit = () => {
    const data = {
      img: postPhoto,
      description: photoName,
      comments: [],
      likes: 0,
      locationName: photoLocationName,
      geoLocation: currentGeoLocation,
    };
    posts.unshift(data); // Додавання нової публікації до списку постів
    clearData(); // Очищення даних після створення публікації
    navigation.navigate('PostsScreen'); // Перехід на екран постів
  };

  // Відображення компонентів для створення публікації
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {postPhoto ? (
            <Image
              source={{ uri: postPhoto }}
              style={{
                width: '95%',
                height: 240,
                borderRadius: 8,
              }}
            />
          ) : (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={cameraRef}
            >
              <TouchableOpacity
                style={styles.imageAddButton}
                opacity={0.5}
                onPress={makePhoto}
              >
                <FontAwesome name="camera" size={24} color="gray" />
              </TouchableOpacity>
            </Camera>
          )}
          <TouchableOpacity onPress={uploadPhoto}>
            <Text style={styles.imageText}>
              {postPhoto ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              type={'text'}
              name={'photoName'}
              value={photoName}
              onChangeText={setPhotoName}
            />
            <TextInput
              style={styles.input}
              placeholder="Місцевість..."
              type={'text'}
              name={'photoLocation'}
              value={photoLocationName}
              onChangeText={setPhotoLocationName}
            />
            <TouchableOpacity
              style={[
                styles.button,
                postPhoto
                  ? {
                      color: '#FFFFFF',
                      backgroundColor: '#FF6C00',
                    }
                  : {
                      color: '#BDBDBD',
                      backgroundColor: '#F6F6F6',
                    },
              ]}
              activeOpacity={0.5}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  styles.buttonText,
                  postPhoto
                    ? {
                        color: '#FFFFFF',
                      }
                    : {
                        color: '#BDBDBD',
                      },
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// Компонент, що містить навігацію для створення публікації
const CreatePostsScreen = () => {
  const navigation = useNavigation();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          borderBottomColor: '#E8E8E8',
          borderBottomWidth: 2,
        },
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: () => (
            <TouchableOpacity style={styles.trashButton} activeOpacity={0.5}>
              <EvilIcons name="trash" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('Home', { screen: 'PostsScreen' })
              }
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleAlign: 'center',
          headerTitleStyle: { paddingBottom: 5 },
        }}
        name="Створити публікацію"
        component={CreatePost}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  trashButton: {
    backgroundColor: '#F6F6F6',
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    width: '92%',
    height: 240,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAddButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#BDBDBD',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
  },
  formContainer: {
    flex: 3,
  },
  button: {
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 44,
  },
  buttonText: {
    fontWeight: '400',
  },
  input: {
    width: 340,
    height: 50,
    marginTop: 33,
    padding: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 2,
  },
});

export default CreatePostsScreen;
