import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <>
        <View style={styles.container}>
          <Text style={styles.text1}>Nosso app usando Docker com React Native</Text>
          <Image style={styles.image} resizeMode={'contain'} source={require('./assets/reactnative.png')}/>
          <Text style={styles.text2}>Our app using Docker with React Native</Text>
        </View>    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#755fbd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 15,
    color: '#FFF',
    top: 200,
  }, 
  text2: {
    fontSize: 15,
    color: '#FFF',
    bottom: 200,
  },   
  image: {
    width: "95%",
    height: "95%",
    borderRadius: 30,
  }
});
