import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MoreScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#C4CFD6',
  },
});

export default MoreScreen;
