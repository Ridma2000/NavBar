import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarScreen from './screens/CalendarScreen';
import StoreScreen from './screens/StoreScreen';
import SettingsScreen from './screens/SettingsScreen';
import MoreScreen from './screens/MoreScreen';

type NavItem = {
  label: string;
  component: React.ComponentType<any>;
  accentColor?: string;
};

const NAV_ITEMS: NavItem[] = [
  {label: 'Calendar', component: CalendarScreen, accentColor: '#102F44'},
  {label: 'Store', component: StoreScreen, accentColor: '#102F44'},
  {label: 'Settings', component: SettingsScreen, accentColor: '#102F44'},
  {label: 'More', component: MoreScreen, accentColor: '#FF7A3C'},
];

const App = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [moreResetVersion, setMoreResetVersion] = React.useState(0);
  const ActiveScreen = NAV_ITEMS[activeIndex].component;
  const isMoreScreenActive = NAV_ITEMS[activeIndex].label === 'More';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.body}>
        <View style={styles.screenContainer}>
          {isMoreScreenActive ? (
            <MoreScreen resetVersion={moreResetVersion} />
          ) : (
            <ActiveScreen />
          )}
        </View>
        <View style={styles.navWrapper}>
          <View style={styles.navBar}>
            {NAV_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              const accentColor = item.accentColor ?? '#0D2B39';
              return (
                <TouchableOpacity
                  key={item.label}
                  style={styles.navItem}
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log(`[Nav] ${item.label} pressed`);
                    if (item.label === 'More') {
                      setMoreResetVersion(prev => prev + 1);
                    }
                    setActiveIndex(index);
                  }}>
                  <View
                    style={[
                      styles.icon,
                      isActive
                        ? [
                            styles.iconActive,
                            {
                              borderColor: accentColor,
                              backgroundColor: accentColor === '#FF7A3C' ? '#FFF5EF' : '#F7F9FC',
                            },
                          ]
                        : styles.iconInactive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.navLabel,
                      isActive
                        ? [styles.navLabelActive, {color: accentColor}]
                        : styles.navLabelInactive,
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
