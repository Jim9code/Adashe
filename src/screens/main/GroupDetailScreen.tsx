/**
 * Group Detail Screen
 * Shows detailed information about a specific group
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors, theme } from '../../constants/theme';

const GroupDetailScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.matteWhite} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Group Details</Text>
        <Text style={styles.subtitle}>View group information and members</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.matteWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.charcoalGray,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.slateGray,
  },
});

export default GroupDetailScreen;
