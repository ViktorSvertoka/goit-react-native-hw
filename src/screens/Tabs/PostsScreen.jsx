import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../../firebase/config';
import PostItem from '../../components/Posts/PostItem';
import userlogo from '../../images/userlogo.png';

export default function PostsScreen() {
  const name = useSelector(state => state.auth.name);
  const email = useSelector(state => state.auth.email);
  const avatar = useSelector(state => state.auth.avatar);
  const [serverPosts, setServerPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = () => {
    const dbRef = collection(db, 'posts');
    onSnapshot(dbRef, data => {
      const dbPosts = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedDbPosts = dbPosts.sort((a, b) => b.createdAt - a.createdAt);
      setServerPosts(sortedDbPosts);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={avatar ? { uri: avatar } : userlogo}
          alt="User photo"
        />
        <View style={styles.userData}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      {serverPosts.length !== 0 && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={serverPosts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PostItem
              key={item.id}
              id={item.id}
              title={item.title}
              photoLocation={item.photoLocation}
              url={item.photo}
              geoLocation={item.geoLocation}
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.30)',
    borderBottomColor: 'rgba(0, 0, 0, 0.30)',
    minHeight: Dimensions.get('window').height - 150,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  userData: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    color: '#212121',
    fontSize: 13,
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 11,
  },
  contentContainer: {},
});
