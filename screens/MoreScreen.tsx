import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import EmailSignatureScreen from './tools/EmailSignatureScreen';
import MeetingSpaceScreen from './tools/MeetingSpaceScreen';
import HotelBookingScreen from './tools/HotelBookingScreen';
import ContactsScreen from './tools/ContactsScreen';
import ConferencingToolScreen from './tools/ConferencingToolScreen';
import CustomFormScreen from './tools/CustomFormScreen';
import PersonalWebsiteScreen from './tools/PersonalWebsiteScreen';
import StripeIntegrationScreen from './tools/StripeIntegrationScreen';

type ToolItem = {
  label: string;
  component: React.ComponentType;
};

type DraggableToolItem = ToolItem & {
  key: string;
};

const TOOL_ITEMS: ToolItem[] = [
  {label: 'Email Signature', component: EmailSignatureScreen},
  {label: 'Meeting Space', component: MeetingSpaceScreen},
  {label: 'Hotel Booking', component: HotelBookingScreen},
  {label: 'Contacts', component: ContactsScreen},
  {label: 'Conferencing Tool', component: ConferencingToolScreen},
  {label: 'Custom Form', component: CustomFormScreen},
  {label: 'Personal Website', component: PersonalWebsiteScreen},
  {label: 'Stripe Integration', component: StripeIntegrationScreen},
];

// Helper function to convert ToolItem to DraggableToolItem
const toDraggableItem = (item: ToolItem, index: number): DraggableToolItem => ({
  ...item,
  key: `tool-${index}-${item.label}`,
});

// Helper function to convert DraggableToolItem back to ToolItem
const toToolItem = (item: DraggableToolItem): ToolItem => {
  const {key, ...toolItem} = item;
  return toolItem;
};

type MoreScreenProps = {
  resetVersion?: number;
};

const MoreScreen = ({resetVersion = 0}: MoreScreenProps): JSX.Element => {
  const [activeTool, setActiveTool] = React.useState<ToolItem | null>(null);
  const [isReordering, setIsReordering] = React.useState(false);
  const [orderedItems, setOrderedItems] = React.useState<DraggableToolItem[]>(
    TOOL_ITEMS.map((item, index) => toDraggableItem(item, index)),
  );
  const ToolComponent = activeTool?.component;

  React.useEffect(() => {
    setActiveTool(null);
    setIsReordering(false);
    // Reset to original order when resetVersion changes
    setOrderedItems(TOOL_ITEMS.map((item, index) => toDraggableItem(item, index)));
  }, [resetVersion]);

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
                onPress={() => {
                  console.log('[More] Reorder button pressed');
                  setIsReordering(prev => !prev);
                }}>
                <Text style={styles.sheetHeaderText}>{isReordering ? 'Done' : 'Reorder'}</Text>
              </TouchableOpacity>
            </View>
            {isReordering ? (
              <DraggableGrid
                numColumns={4}
                data={orderedItems}
                renderItem={(item: DraggableToolItem) => {
                  return (
                    <View style={styles.draggableItem}>
                      <View style={styles.iconShell}>
                        <View style={styles.iconInner} />
                      </View>
                      <Text style={styles.toolLabel}>{item.label}</Text>
                    </View>
                  );
                }}
                onDragRelease={(data: DraggableToolItem[]) => {
                  console.log('[More] Drag release, new order:', data.map(d => d.label));
                  setOrderedItems(data);
                }}
              />
            ) : (
              <View style={styles.grid}>
                {orderedItems.map(item => {
                  const toolItem = toToolItem(item);
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.toolItem}
                      activeOpacity={0.9}
                      onPress={() => {
                        console.log(`[More] ${toolItem.label} pressed`);
                        setActiveTool(toolItem);
                      }}>
                      <View style={styles.iconShell}>
                        <View style={styles.iconInner} />
                      </View>
                      <Text style={styles.toolLabel}>{toolItem.label}</Text>
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
