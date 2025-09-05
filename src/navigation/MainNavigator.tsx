/**
 * Main App Navigator
 * Handles main app screens with luxury bottom tab navigation
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { colors, theme } from '../constants/theme';

// Import main screens
import HomeScreen from '../screens/main/HomeScreen';
import GroupsScreen from '../screens/main/GroupsScreen';
import WalletScreen from '../screens/main/WalletScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import CreateGroupScreen from '../screens/main/CreateGroupScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Tab Icon Component
const TabIcon = ({ 
  icon, 
  label, 
  focused, 
  size = 24 
}: { 
  icon: string; 
  label: string; 
  focused: boolean; 
  size?: number;
}) => {
  return (
    <View style={styles.tabIconContainer}>
      <View style={[
        styles.iconWrapper,
        focused && styles.iconWrapperActive
      ]}>
        <Text style={[
          styles.iconText,
          { fontSize: size },
          focused && styles.iconTextActive
        ]}>
          {icon}
        </Text>
      </View>
      <Text style={[
        styles.tabLabel,
        focused && styles.tabLabelActive
      ]}>
        {label}
      </Text>
    </View>
  );
};

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.charcoalGray,
          borderTopColor: 'rgba(212, 175, 55, 0.2)',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          ...theme.shadows.lg,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon="🏠" 
              label="Home" 
              focused={focused}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="GroupsTab" 
        component={GroupsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon="👥" 
              label="Groups" 
              focused={focused}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="WalletTab" 
        component={WalletScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon="💰" 
              label="Wallet" 
              focused={focused}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon="👤" 
              label="Profile" 
              focused={focused}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C2C2C',
        },
        headerTintColor: '#F8F8F8',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: { backgroundColor: '#F8F8F8' },
      }}
    >
      <Stack.Screen 
        name="Tabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CreateGroup" 
        component={CreateGroupScreen}
        options={{ title: 'Create Group' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  iconText: {
    color: colors.slateGray,
    fontSize: 20,
  },
  iconTextActive: {
    color: colors.metallicGold,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.slateGray,
    fontWeight: '500',
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.metallicGold,
    fontWeight: '600',
  },
});

export default MainNavigator;
