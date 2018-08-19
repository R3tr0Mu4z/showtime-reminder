import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MixedNavigators from './src/Navigation/MixedNavigators' 

export default class App extends React.Component {

  render() {
    return (
      <MixedNavigators />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  