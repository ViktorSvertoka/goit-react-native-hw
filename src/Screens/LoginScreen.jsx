import React, { useState, useEffect } from 'react';
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

import * as SplashScreen from 'expo-splash-screen';
import Bg from '../image/bg-image.png';

const LoginScreen = () => {
  const [email, setEmail] = useState(''); // Стан для збереження введеної електронної пошти
  const [focusEmail, setIsFocusEmail] = useState(false); // Стан, що показує, чи є фокус на полі електронної пошти

  const [password, setPassword] = useState(''); // Стан для збереження введеного пароля
  const [focusPassword, setFocusPassword] = useState(false); // Стан, що показує, чи є фокус на полі пароля
  const [isPasswordHidden, setIsPasswordHidden] = useState(true); // Стан, що показує, чи прихований пароль

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

  const emailSave = email => setEmail(email); // Функція для збереження введеної електронної пошти
  const passwordSave = password => setPassword(password); // Функція для збереження введеного пароля

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(`Усі поля мають бути заповнені!`); // Перевірка на заповненість полів електронної пошти та пароля
      return;
    }
    Alert.alert(`${email}, успішно увійшли!`); // Виведення повідомлення про успішний вхід
    console.log('email' - email, 'password' - password); // Виведення електронної пошти та пароля у консоль

    setEmail(''); // Очищення стану з електронною поштою
    setPassword(''); // Очищення стану з паролем
    Keyboard.dismiss(); // Сховати клавіатуру
  };

  const keyboardIsHidden = () => {
    Keyboard.dismiss(); // Сховати клавіатуру
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // Перешкода автоматичному закриттю сплеш-екрану
    }
    prepare();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.containerFlex}>
          <ImageBackground
            style={{
              ...styles.backgroundImg,
              width: phoneWidth,
              height: phoneHeight,
            }}
            source={Bg}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.containerWrapper,
                  width: phoneWidth,
                }}
              >
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Увійти</Text>

                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? '#FF6C00' : '#E8E8E8',
                    }}
                    onFocus={() => setIsFocusEmail(true)}
                    onBlur={() => setIsFocusEmail(false)}
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
                    <Text style={styles.textButton}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.textLink}>
                      Немає акаунту?
                      <Text style={styles.textLinkUnderline}>
                        Зареєстуватися
                      </Text>
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

export default LoginScreen;

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
    height: 550,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 400,
  },

  title: {
    marginTop: 35,
    marginBottom: 30,
    textAlign: 'center',
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
    bottom: 265,
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
    marginTop: 43,
    paddingVertical: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },

  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },

  textLink: {
    marginTop: 16,
    marginBottom: 110,
    textAlign: 'center',
    color: '#1B4371',
    fontWeight: '400',
  },

  textLinkUnderline: {
    textDecorationLine: 'underline',
  },
});
