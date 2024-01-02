import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button , Image } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Image
        source={require('../images/Logo.png')}
        style={styles.image}
      />
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    
  },
  image: {
    aspectRatio: 1,
    flex: 0.2, 
    resizeMode: 'contain', 
    alignItems: 'center', 
  }
});
export default LoadingScreen;
