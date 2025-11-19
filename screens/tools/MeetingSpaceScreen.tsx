import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MeetingSpaceScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meeting Space</Text>
      <Text style={styles.subtitle}>This feature is coming soon.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    color: '#102F44',
    fontWeight: '600',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#9AABB8',
  },
});

export default MeetingSpaceScreen;
