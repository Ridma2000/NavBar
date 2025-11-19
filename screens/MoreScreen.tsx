import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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

const MoreScreen = (): JSX.Element => {
  const [activeTool, setActiveTool] = React.useState<ToolItem | null>(null);
  const ToolComponent = activeTool?.component;

  return (
    <View style={styles.container}>
      {ToolComponent && activeTool ? (
        <View style={styles.toolScreen}>
          <View style={styles.toolScreenHeader}>
            <TouchableOpacity
              onPress={() => setActiveTool(null)}
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
              <Text style={styles.sheetHeaderText}>Reorder</Text>
            </View>
            <View style={styles.grid}>
              {TOOL_ITEMS.map(item => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.toolItem}
                  activeOpacity={0.9}
                  onPress={() => setActiveTool(item)}>
                  <View style={styles.iconShell}>
                    <View style={styles.iconInner} />
                  </View>
                  <Text style={styles.toolLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
