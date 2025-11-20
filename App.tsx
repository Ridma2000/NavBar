import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MoreScreen from './screens/MoreScreen';
import {
  AppItem,
  DEFAULT_MORE_ITEMS,
  DEFAULT_NAV_SHORTCUTS,
  NAV_SHORTCUT_COUNT,
} from './data/appItems';

const MORE_NAV_ITEM_KEY = 'nav-more';
const MORE_NAV_ITEM: AppItem = {
  key: MORE_NAV_ITEM_KEY,
  label: 'More',
  component: MoreScreen,
  accentColor: '#FF7A3C',
};

const App = (): JSX.Element => {
  const [orderedItems, setOrderedItems] = React.useState<AppItem[]>(() => [
    ...DEFAULT_NAV_SHORTCUTS,
    ...DEFAULT_MORE_ITEMS,
  ]);
  const [activeKey, setActiveKey] = React.useState<string>(
    DEFAULT_NAV_SHORTCUTS[0]?.key ?? MORE_NAV_ITEM_KEY,
  );
  const [moreResetVersion, setMoreResetVersion] = React.useState(0);

  const navShortcuts = React.useMemo(
    () => orderedItems.slice(0, NAV_SHORTCUT_COUNT),
    [orderedItems],
  );
  const moreItems = React.useMemo(
    () => orderedItems.slice(NAV_SHORTCUT_COUNT),
    [orderedItems],
  );
  const navItems = React.useMemo<AppItem[]>(
    () => [...navShortcuts, MORE_NAV_ITEM],
    [navShortcuts],
  );

  React.useEffect(() => {
    if (!navItems.some(item => item.key === activeKey)) {
      setActiveKey(navItems[0]?.key ?? MORE_NAV_ITEM_KEY);
    }
  }, [navItems, activeKey]);

  const activeNavItem =
    navItems.find(item => item.key === activeKey) ?? navItems[0];
  const isMoreScreenActive = activeNavItem.key === MORE_NAV_ITEM_KEY;
  const ActiveScreen = activeNavItem.component;

  const handleNavPress = (item: AppItem) => {
    console.log(`[Nav] ${item.label} pressed`);
    if (item.key === MORE_NAV_ITEM_KEY) {
      setMoreResetVersion(prev => prev + 1);
    }
    setActiveKey(item.key);
  };

  const handleApplyReorder = (
    nextNavItems: AppItem[],
    nextMoreItems: AppItem[],
  ) => {
    setOrderedItems([...nextNavItems, ...nextMoreItems]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.body}>
        <View style={styles.screenContainer}>
          {isMoreScreenActive ? (
            <MoreScreen
              resetVersion={moreResetVersion}
              navItems={navShortcuts}
              moreItems={moreItems}
              onApplyReorder={handleApplyReorder}
            />
          ) : (
            <ActiveScreen />
          )}
        </View>
        <View style={styles.navWrapper}>
          <View style={styles.navBar}>
            {navItems.map(item => {
              const isActive = item.key === activeKey;
              const accentColor = item.accentColor ?? '#0D2B39';
              return (
                <TouchableOpacity
                  key={item.key}
                  style={styles.navItem}
                  activeOpacity={0.8}
                  onPress={() => handleNavPress(item)}>
                  <View
                    style={[
                      styles.icon,
                      isActive
                        ? [
                            styles.iconActive,
                            {
                              borderColor: accentColor,
                              backgroundColor:
                                accentColor === '#FF7A3C'
                                  ? '#FFF5EF'
                                  : '#F7F9FC',
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
