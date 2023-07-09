import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';

import { postsScreenArray } from '../data/posts';

import UserAvatar from '../image/userAvatar.jpg';
import Message from '../image/message.svg';
import Like from '../image/like.svg';
import Location from '../image/location.svg';

const PostsScreen = () => {
  const navigation = useNavigation();

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );

  const [posts, setPosts] = useState(postsScreenArray);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
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
      <FlatList
        ListHeaderComponent={
          <View style={styles.userContainer}>
            <Image style={styles.avatarImg} source={UserAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>email@example.com</Text>
            </View>
          </View>
        }
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.itemList}>
            <Image
              source={item.img}
              style={{
                ...styles.cardImage,
                width: windowWidth - 16 * 2,
              }}
            />
            <Text style={styles.userPostTitle}>{item.title}</Text>
            <View style={styles.userCard}>
              <View style={styles.userCardInformation}>
                <TouchableOpacity
                  style={styles.wrap}
                  onPress={() => navigation.navigate('Коментарі')}
                >
                  <Message />
                  <Text style={styles.textStatistic}>{item.comments}</Text>
                </TouchableOpacity>
                <View style={{ ...styles.wrap, marginLeft: 24 }}>
                  <Like />
                  <Text style={styles.textStatistic}>{item.likes}</Text>
                </View>
              </View>
              <View style={styles.wrap}>
                <Location />
                <Text style={styles.textStatistic}>{item.location}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  userContainer: {
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  userInfo: {
    marginLeft: 8,
    fontWeight: '700',
  },
  userName: {
    color: '#212121',
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '400',
  },
  userEmail: {
    color: '#212121',
    opacity: 0.8,
    fontSize: 11,
    lineHeight: 13,
  },
  cardSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 32,
  },
  itemList: {},
  cardImage: {
    resizeMode: 'cover',
    borderRadius: 8,
  },
  userPostTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    fontWeight: '500',
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 35,
  },
  userCardInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatistic: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});
