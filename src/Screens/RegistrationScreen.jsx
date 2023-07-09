import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Add from '../image/add.svg';
import Bg from '../image/bg-image.png';

const RegistrationScreen = () => {
  const navigation = useNavigation(); // Навігація між екранами

  const [login, setLogin] = useState(''); // Стан для збереження значення поля "Логін"
  const [focusLogin, setFocusLogin] = useState(false); // Стан для визначення активності поля "Логін"

  const [email, setEmail] = useState(''); // Стан для збереження значення поля "Адреса електронної пошти"
  const [focusEmail, setFocusEmail] = useState(false); // Стан для визначення активності поля "Адреса електронної пошти"

  const [password, setPassword] = useState(''); // Стан для збереження значення поля "Пароль"
  const [focusPassword, setFocusPassword] = useState(false); // Стан для визначення активності поля "Пароль"
  const [isPasswordHidden, setIsPasswordHidden] = useState(true); // Стан для визначення видимості пароля

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get('window').width); // Стан для збереження ширини екрану
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get('window').height
  ); // Стан для збереження висоти екрану

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width; // Отримання ширини вікна
      setPhoneWidth(width); // Оновлення значення ширини пристрою

      const height = Dimensions.get('window').height; // Отримання висоти вікна
      setPhoneHeight(height); // Оновлення значення висоти пристрою
    };
    const addListener = Dimensions.addEventListener('change', onChange); // Додавання слухача на зміни розміру вікна

    return () => addListener.remove(); // Видалення слухача при виході з компонента
  }, []);

  const loginSave = login => setLogin(login); // Функція для збереження значення поля "Логін"
  const emailSave = email => setEmail(email); // Функція для збереження значення поля "Адреса електронної пошти"
  const passwordSave = password => setPassword(password); // Функція для збереження значення поля "Пароль"

  // Функція для перевірки валідності адреси електронної пошти
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = () => {
    if (!login.trim() || !email.trim() || !password.trim()) {
      Alert.alert(`Усі поля мають бути заповнені!`); // Попередження, якщо не всі поля заповнені
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(`Некоректна адреса електронної пошти!`); // Попередження, якщо адреса електронної пошти некоректна
      return;
    }

    Alert.alert(`${login}, успішно зареєстровані!`); // Повідомлення про успішну реєстрацію
    console.log('login: ' + login, 'email: ' + email, 'password: ' + password); // Виведення значень полів "Логін", "Адреса електронної пошти" та "Пароль" у консоль
    setLogin(''); // Скидання значення поля "Логін"
    setEmail(''); // Скидання значення поля "Адреса електронної пошти"
    setPassword(''); // Скидання значення поля "Пароль"
    Keyboard.dismiss(); // Закриття клавіатури

    navigation.navigate('Home', { screen: 'PostsScreen' });
  };

  const keyboardIsHidden = () => {
    Keyboard.dismiss(); // Закриття клавіатури
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.containerFlex}>
          <ImageBackground style={styles.backgroundImg} source={Bg}>
            <ScrollView>
              <View
                style={{
                  ...styles.containerWrapper,
                  width: phoneWidth,

                  marginTop: phoneWidth > 400 ? 200 : 300,
                }}
              >
                <View
                  style={{
                    ...styles.imageWrapper,
                    left: (phoneWidth - 120) / 2,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    ...styles.addSvg,
                    right: phoneWidth / 2 - 70,
                  }}
                >
                  <Add />
                </TouchableOpacity>
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Реєстрація</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusLogin ? '#FF6C00' : '#E8E8E8',
                    }}
                    onFocus={() => setFocusLogin(true)}
                    onBlur={() => setFocusLogin(false)}
                    value={login}
                    placeholder="Логін"
                    cursorColor={'#BDBDBD'}
                    placeholderTextColor={'#BDBDBD'}
                    onChangeText={loginSave}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? '#FF6C00' : '#E8E8E8',
                    }}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => setFocusEmail(false)}
                    value={email}
                    placeholder="Адреса електронної пошти"
                    cursorColor={'#BDBDBD'}
                    placeholderTextColor={'#BDBDBD'}
                    onChangeText={emailSave}
                    keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusPassword ? '#FF6C00' : '#E8E8E8',
                    }}
                    onFocus={() => setFocusPassword(true)}
                    onBlur={() => setFocusPassword(false)}
                    value={password}
                    placeholder="Пароль"
                    cursorColor={'#BDBDBD'}
                    placeholderTextColor={'#BDBDBD'}
                    secureTextEntry={isPasswordHidden}
                    onChangeText={passwordSave}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.isPassword}
                    onPress={() => setIsPasswordHidden(prevState => !prevState)}
                  >
                    <Text style={styles.isPasswordShow}>
                      {isPasswordHidden ? 'Показати' : 'Приховати'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>Зареєстуватися</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={styles.footer}
                      onPress={() => navigation.navigate('LoginScreen')}
                    >
                      Вже є акаунт? Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImg: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },

  containerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 550,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  imageWrapper: {
    position: 'absolute',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },

  addSvg: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 25,
    height: 25,
  },

  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
    fontWeight: '500',
  },

  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: '#F6F6F6',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: '400',
    color: '#212121',
  },

  isPassword: {
    position: 'absolute',
    right: 0,
    bottom: 253,
    paddingRight: 16,
  },

  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    fontWeight: '400',
  },

  button: {
    height: 50,
    marginTop: 40,
    paddingVertical: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },

  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },

  footer: {
    marginTop: 15,
    marginBottom: 100,
    textAlign: 'center',
    color: '#1B4371',
    fontWeight: '400',
  },
});
