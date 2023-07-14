import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { EvilIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

// import Location from '../image/location.svg';
// import AddPhoto from '../image/addPhoto.svg';
// import Delete from '../image/trash.svg';

const CreatePostsScreen = () => {
  const navigation = useNavigation(); // Навігація між екранами

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width // Стан для збереження ширини вікна
  );
  const [title, setTitle] = useState(''); // Стан для збереження значення поля "Назва"
  const [isFocusedTitle, setIsFocusedTitle] = useState(false); // Стан для визначення активності поля "Назва"

  const [location, setLocation] = useState(''); // Стан для збереження значення поля "Місцевість"
  const [isFocusedLocation, setIsFocusedLocation] = useState(false); // Стан для визначення активності поля "Місцевість"

  const [isDisabledPublish, setIsDisabledPublish] = useState(true); // Стан для визначення активності кнопки "Опубліковати"
  const [isDelete, setIsDelete] = useState(true); // Стан для визначення активності кнопки "Видалити"

  const titleHandler = title => setTitle(title); // Обробник для зміни значення поля "Назва"
  const locationHandler = location => setLocation(location); // Обробник для зміни значення поля "Місцевість"

  // Отримання ширини вікна після зміни його розміру
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener('change', onChange);

    return () => dimensionsHandler.remove();
  }, []);

  // Перевірка, чи заповнені поля "Назва" і "Місцевість"
  useEffect(() => {
    title && location
      ? setIsDisabledPublish(false)
      : setIsDisabledPublish(true);
  }, [title, location]);

  // Перевірка, чи не порожні поля "Назва" і "Місцевість"
  useEffect(() => {
    title || location ? setIsDelete(false) : setIsDelete(true);
  }, [title, location]);

  // Обробник натискання кнопки "Опубліковати"
  const onPublish = () => {
    if (!title.trim() || !location.trim()) {
      Alert.alert(`Усі поля мають бути заповнені!`);
      return;
    }
    Alert.alert(`Пост успішно було створено.`);
    console.log(title, location);
    setTitle('');
    setLocation('');
    Keyboard.dismiss();
  };

  // Обробник натискання кнопки "Видалити"
  const onDelete = () => {
    setTitle('');
    setLocation('');
    Alert.alert(`Вилучення пройшло успішно.`);
    Keyboard.dismiss();
  };

  // Підготовка до відображення екрану
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  // Приховання заставки після завантаження екрану
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <KeyboardAvoidingView
      onLayout={onLayoutRootView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.section}>
          <View style={{ ...styles.contentSection, width: windowWidth - 30 }}>
            <TouchableOpacity style={styles.postImgAdd} activeOpacity={0.5}>
              {/* <AddPhoto /> */}
              <FontAwesome name="camera" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.contentTitle}>
            <Text style={styles.text}>Завантажте фото</Text>
          </View>
          <View style={{ width: windowWidth - 32 }}>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocusedTitle ? '#FF6C00' : '#E8E8E8',
              }}
              onFocus={() => setIsFocusedTitle(true)}
              onBlur={() => setIsFocusedTitle(false)}
              value={title}
              placeholder="Назва..."
              cursorColor={'#BDBDBD'}
              placeholderTextColor={'#BDBDBD'}
              onChangeText={titleHandler}
            ></TextInput>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocusedLocation ? '#FF6C00' : '#E8E8E8',
                paddingLeft: 25,
              }}
              onFocus={() => setIsFocusedLocation(true)}
              onBlur={() => setIsFocusedLocation(false)}
              value={location}
              textContentType={'location'}
              placeholder="Місцевість..."
              cursorColor={'#BDBDBD'}
              placeholderTextColor={'#BDBDBD'}
              onChangeText={locationHandler}
              onPressIn={() => navigation.navigate('Map')}
            >
              <AntDesign name="enviromento" size={24} color="#BDBDBD" />
            </TextInput>

            {/* <Location style={styles.locationIcon} /> */}
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              width: windowWidth - 32,
              backgroundColor: isDisabledPublish ? '#F6F6F6' : '#FF6C00',
            }}
            onPress={onPublish}
          >
            <Text
              style={{
                ...styles.textButton,
                color: isDisabledPublish ? '#BDBDBD' : '#FFFFFF',
              }}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.deleteImg,
              backgroundColor: isDelete ? '#F6F6F6' : '#FF6C00',
            }}
            onPress={onDelete}
          >
            <EvilIcons name="trash" size={24} color="black" />
            {/* <Delete stroke={isDelete ? '#BDBDBD' : '#FFFFFF'} /> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },

  section: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  contentSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
  contentTitle: {
    width: '100%',

    alignItems: 'flex-start',
  },
  text: {
    marginTop: 8,
    marginBottom: 16,
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    marginTop: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 56,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  locationIcon: {
    position: 'absolute',
    bottom: 16,
  },
  button: {
    height: 40,
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
  deleteImg: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    width: 70,
    height: 40,
    borderRadius: 20,
  },
  postImg: {
    flex: 2,
    width: '80%',
    height: '40%',
    color: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
