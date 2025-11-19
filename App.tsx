import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarScreen from './screens/CalendarScreen';
import StoreScreen from './screens/StoreScreen';
import SettingsScreen from './screens/SettingsScreen';
import MoreScreen from './screens/MoreScreen';

type NavItem = {
  label: string;
  component: React.ComponentType;
};

const NAV_ITEMS: NavItem[] = [
  {label: 'Calendar', component: CalendarScreen},
  {label: 'Store', component: StoreScreen},
  {label: 'Settings', component: SettingsScreen},
  {label: 'More', component: MoreScreen},
];

const App = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ActiveScreen = NAV_ITEMS[activeIndex].component;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.body}>
        <View style={styles.screenContainer}>
          <ActiveScreen />
        </View>
        <View style={styles.navWrapper}>
          <View style={styles.navBar}>
            {NAV_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <TouchableOpacity
                  key={item.label}
                  style={styles.navItem}
                  activeOpacity={0.8}
                  onPress={() => setActiveIndex(index)}>
                  <View
                    style={[
                      styles.icon,
                      isActive ? styles.iconActive : styles.iconInactive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.navLabel,
                      isActive ? styles.navLabelActive : styles.navLabelInactive,
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.indicator} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  screenContainer: {
    flex: 1,
  },
  navWrapper: {
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#EBEEF0',
    paddingTop: 16,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  iconActive: {
    borderColor: '#0D2B39',
  },
  iconInactive: {
    borderColor: '#D9E1E7',
  },
  navLabel: {
    fontSize: 12,
  },
  navLabelActive: {
    color: '#0D2B39',
    fontWeight: '600',
  },
  navLabelInactive: {
    color: '#C4CFD6',
  },
  indicator: {
    alignSelf: 'center',
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0D2B39',
    marginTop: 12,
  },
});

export default App;
