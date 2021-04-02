import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <Routes />
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
