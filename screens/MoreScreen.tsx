import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import {AppItem} from '../data/appItems';

type ReorderTile = AppItem & {
  area: 'more' | 'nav';
};

type MoreScreenProps = {
  resetVersion?: number;
  navItems: AppItem[];
  moreItems: AppItem[];
  onApplyReorder: (nextNavItems: AppItem[], nextMoreItems: AppItem[]) => void;
};

const buildReorderTiles = (
  items: AppItem[],
  navCount: number,
): ReorderTile[] => {
  if (!items || items.length === 0) {
    return [];
  }
  const boundary = Math.max(0, items.length - navCount);
  return items.map((item, index) => ({
    ...item,
    area: index >= boundary ? 'nav' : 'more',
  }));
};

const stripArea = ({area: _area, ...rest}: ReorderTile): AppItem => rest;

const MoreScreen = ({
  resetVersion = 0,
  navItems,
  moreItems,
  onApplyReorder,
}: MoreScreenProps): JSX.Element => {
  const [activeTool, setActiveTool] = React.useState<AppItem | null>(null);
  const [isReordering, setIsReordering] = React.useState(false);
  const navItemCount = navItems.length;
  const combinedItems = React.useMemo(
    () => [...(moreItems || []), ...(navItems || [])],
    [moreItems, navItems],
  );
  const [reorderItems, setReorderItems] = React.useState<ReorderTile[]>(() =>
    buildReorderTiles(combinedItems, navItemCount),
  );
  const ToolComponent = activeTool?.component;

  React.useEffect(() => {
    setActiveTool(null);
    setIsReordering(false);
    setReorderItems(buildReorderTiles(combinedItems, navItemCount));
  }, [resetVersion, combinedItems, navItemCount]);

  const handleToggleReorder = () => {
    console.log('[More] Reorder button pressed');
    if (isReordering) {
      const nextMoreItems = reorderItems
        .filter(item => item.area === 'more')
        .map(stripArea);
      const nextNavItems = reorderItems
        .filter(item => item.area === 'nav')
        .map(stripArea);
      onApplyReorder(nextNavItems, nextMoreItems);
      setIsReordering(false);
    } else {
      setReorderItems(buildReorderTiles(combinedItems, navItemCount));
      setIsReordering(true);
    }
  };

  return (
    <View style={styles.container}>
      {ToolComponent && activeTool ? (
        <View style={styles.toolScreen}>
          <View style={styles.toolScreenHeader}>
            <TouchableOpacity
              onPress={() => {
                console.log('[More] Back pressed');
                setActiveTool(null);
              }}
              style={styles.backButton}
              activeOpacity={0.8}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.toolScreenTitle}>{activeTool.label}</Text>
            <View style={styles.headerSpacer} />
          </View>
          <View style={styles.toolScreenBody}>
            <ToolComponent />
          </View>
        </View>
      ) : (
        <View style={styles.sheetWrapper}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <TouchableOpacity
                style={styles.reorderButton}
                activeOpacity={0.8}
                onPress={handleToggleReorder}>
                <Text style={styles.sheetHeaderText}>
                  {isReordering ? 'Done' : 'Reorder'}
                </Text>
              </TouchableOpacity>
            </View>
            {isReordering ? (
              <DraggableGrid
                numColumns={4}
                data={reorderItems || []}
                renderItem={(item: ReorderTile) => {
                  return (
                    <View style={styles.draggableItem}>
                      <View style={styles.iconShell}>
                        <View style={styles.iconInner} />
                      </View>
                      <Text style={styles.toolLabel}>{item.label}</Text>
                      <Text style={styles.areaLabel}>
                        {item.area === 'nav' ? 'Tool bar' : 'More'}
                      </Text>
                    </View>
                  );
                }}
                onDragRelease={(data: ReorderTile[]) => {
                  if (data && Array.isArray(data)) {
                    console.log(
                      '[More] Drag release, new order:',
                      data.map(d => d.label),
                    );
                    setReorderItems(buildReorderTiles(data, navItemCount));
                  }
                }}
              />
            ) : (
              <View style={styles.grid}>
                {(moreItems || []).map(item => {
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.toolItem}
                      activeOpacity={0.9}
                      onPress={() => {
                        console.log(`[More] ${item.label} pressed`);
                        setActiveTool(item);
                      }}>
                      <View style={styles.iconShell}>
                        <View style={styles.iconInner} />
                      </View>
                      <Text style={styles.toolLabel}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 72,
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
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
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  reorderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  draggableItem: {
    width: '100%',
    height: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  areaLabel: {
    fontSize: 10,
    textAlign: 'center',
    color: '#8A9BA8',
    marginTop: 2,
  },
  toolScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  toolScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#FF7A3C',
    fontSize: 14,
    fontWeight: '600',
  },
  toolScreenTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#102F44',
  },
  headerSpacer: {
    width: 56,
  },
  toolScreenBody: {
    flex: 1,
  },
});

export default MoreScreen;
