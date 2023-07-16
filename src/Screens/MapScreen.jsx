import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Компонент для відображення карти з маркером на вказаній позиції
export const MapScreen = ({ route }) => {
  // Отримання координат місцезнаходження з параметрів маршруту
  const { longitude, latitude } = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922, // Зум для широти
          longitudeDelta: 0.0421, // Зум для довготи
        }}
        minZoomLevel={1} // Мінімальний рівень зуму
      >
        {/* Маркер, що позначає місцезнаходження */}
        <Marker title="Ти тут" coordinate={{ longitude, latitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
