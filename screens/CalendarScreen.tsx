import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CalendarScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
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

export default CalendarScreen;
