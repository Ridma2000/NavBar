import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

const TOOL_ITEMS = [
  'Email Signature',
  'Meeting Space',
  'Hotel Booking',
  'Contacts',
  'Conferencing Tool',
  'Custom Form',
  'Personal Website',
  'Stripe Integration',
];

const MoreScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetHeaderText}>Reorder</Text>
        </View>
        <View style={styles.grid}>
          {TOOL_ITEMS.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.toolItem}
              activeOpacity={0.9}
              onPress={() => Alert.alert(item, 'Placeholder action')}>
              <View style={styles.iconShell}>
                <View style={styles.iconInner} />
              </View>
              <Text style={styles.toolLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-end',
    paddingBottom: 72,
    paddingHorizontal: 20,
  },
  sheet: {
    backgroundColor: '#F5F8FB',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    shadowColor: '#0D2B39',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  sheetHeaderText: {
    fontSize: 14,
    color: '#1E3A4E',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toolItem: {
    width: '25%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  iconShell: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9E4EE',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF4F8',
    marginBottom: 8,
  },
  iconInner: {
    width: 12,
    height: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BCCAD6',
  },
  toolLabel: {
    fontSize: 11,
    textAlign: 'center',
    color: '#1E3A4E',
  },
});

export default MoreScreen;
