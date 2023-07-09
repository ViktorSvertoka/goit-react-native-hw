import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Bg from '../image/bg-image.png';
import UserAvatarBig from '../image/userAvatarBig.jpg';
import Message from '../image/message.svg';
import Like from '../image/like.svg';
import Location from '../image/location.svg';

import { profilePostArray } from '../data/posts';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height
  );

  const [posts, setPosts] = useState(profilePostArray);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
      const height = Dimensions.get('window').height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener('change', onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <ImageBackground style={styles.bgImage} source={Bg}>
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                ...styles.contentContainer,
                marginTop: windowWidth > 500 ? 100 : 120,
                width: windowWidth,
              }}
            >
              <View
                style={{
                  ...styles.imageContainer,
                  left: (windowWidth - 120) / 2,
                }}
              >
                <Image style={styles.imageAvatar} source={UserAvatarBig} />
              </View>
              <View
                style={{
                  ...styles.userTitleContainer,
                  width: windowWidth - 16 * 2,
                }}
              >
                <Text style={styles.userTitle}>Natali Romanova</Text>
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.postContainer,
                width: windowWidth,
              }}
            >
              <Image
                source={item.img}
                style={{
                  ...styles.postImg,
                  width: windowWidth - 16 * 2,
                }}
              />
              <Text
                style={{
                  ...styles.postTitle,
                  width: windowWidth - 30,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{ ...styles.statisticUser, width: windowWidth - 30 }}
              >
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.statisticWrap}
                    onPress={() => navigation.navigate('Коментарі')}
                  >
                    <Message />
                    <Text style={styles.statisticText}>{item.comments}</Text>
                  </TouchableOpacity>
                  <View style={{ ...styles.statisticWrap, marginLeft: 24 }}>
                    <Like />
                    <Text style={styles.statisticText}>{item.likes}</Text>
                  </View>
                </View>
                <View style={styles.statisticWrap}>
                  <Location />
                  <Text style={styles.statisticText}>{item.location}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',

            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },

  imageContainer: {
    position: 'absolute',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  imageAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  userTitleContainer: {
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 30,
  },
  userTitle: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
    fontWeight: '500',
  },
  postContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  postImg: {
    resizeMode: 'cover',
    borderRadius: 8,
  },
  postTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    fontWeight: '500',
  },
  statisticUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 35,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statisticWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statisticText: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});
