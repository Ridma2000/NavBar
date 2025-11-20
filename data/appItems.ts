import React from 'react';
import CalendarScreen from '../screens/CalendarScreen';
import StoreScreen from '../screens/StoreScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EmailSignatureScreen from '../screens/tools/EmailSignatureScreen';
import MeetingSpaceScreen from '../screens/tools/MeetingSpaceScreen';
import HotelBookingScreen from '../screens/tools/HotelBookingScreen';
import ContactsScreen from '../screens/tools/ContactsScreen';
import ConferencingToolScreen from '../screens/tools/ConferencingToolScreen';
import CustomFormScreen from '../screens/tools/CustomFormScreen';
import PersonalWebsiteScreen from '../screens/tools/PersonalWebsiteScreen';
import StripeIntegrationScreen from '../screens/tools/StripeIntegrationScreen';

export type AppItem = {
  key: string;
  label: string;
  component: React.ComponentType<any>;
  accentColor?: string;
};

export const DEFAULT_NAV_SHORTCUTS: AppItem[] = [
  {
    key: 'calendar',
    label: 'Calendar',
    component: CalendarScreen,
    accentColor: '#102F44',
  },
  {
    key: 'store',
    label: 'Store',
    component: StoreScreen,
    accentColor: '#102F44',
  },
  {
    key: 'settings',
    label: 'Settings',
    component: SettingsScreen,
    accentColor: '#102F44',
  },
];

export const DEFAULT_MORE_ITEMS: AppItem[] = [
  {
    key: 'email-signature',
    label: 'Email Signature',
    component: EmailSignatureScreen,
  },
  {key: 'meeting-space', label: 'Meeting Space', component: MeetingSpaceScreen},
  {key: 'hotel-booking', label: 'Hotel Booking', component: HotelBookingScreen},
  {key: 'contacts', label: 'Contacts', component: ContactsScreen},
  {
    key: 'conferencing-tool',
    label: 'Conferencing Tool',
    component: ConferencingToolScreen,
  },
  {key: 'custom-form', label: 'Custom Form', component: CustomFormScreen},
  {
    key: 'personal-website',
    label: 'Personal Website',
    component: PersonalWebsiteScreen,
  },
  {
    key: 'stripe-integration',
    label: 'Stripe Integration',
    component: StripeIntegrationScreen,
  },
];

export const NAV_SHORTCUT_COUNT = DEFAULT_NAV_SHORTCUTS.length;
