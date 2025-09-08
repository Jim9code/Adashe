/**
 * Home Screen
 * Luxury dashboard with wallet balance, quick actions, and group overview
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const topUpPulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
    ]).start();

    // Top Up button pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(topUpPulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(topUpPulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    
    switch (action) {
      case 'create-group':
        navigation.navigate('CreateGroup');
        break;
      case 'view-transactions':
        navigation.navigate('Transactions');
        break;
      case 'topup':
        navigation.navigate('TopUp');
        break;
      case 'withdraw':
        navigation.navigate('Withdraw');
        break;
      case 'pay-contribution':
        // Navigate to wallet tab for financial actions
        navigation.navigate('Tabs', { screen: 'WalletTab' });
        break;
      case 'join-group':
        // Navigate to join group screen
        navigation.navigate('JoinGroup');
        break;
      default:
        console.log(`Unhandled action: ${action}`);
    }
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.charcoalGray} />
      
      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.greetingContainer}>
            <View style={styles.greetingWrapper}>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.userName}>John Doe</Text>
              <View style={styles.welcomeAccent} />
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={handleNotificationPress}
            activeOpacity={0.8}
          >
            <Icon name="notifications" size={20} color={colors.metallicGold} style={styles.notificationIcon} />
            <View style={styles.notificationBadge} />
            <View style={styles.notificationPulse} />
          </TouchableOpacity>
        </Animated.View>

        {/* Wallet Balance Card */}
        <Animated.View 
          style={[
            styles.walletCard,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <View style={styles.walletShine} />
          <View style={styles.walletHeader}>
            <View style={styles.walletTitleContainer}>
              <Text style={styles.walletTitle}>Wallet Balance</Text>
              <Icon name="account-balance-wallet" size={24} color={colors.metallicGold} style={styles.walletIcon} />
            </View>
            <TouchableOpacity style={styles.refreshButton}>
              <Icon name="refresh" size={18} color={colors.metallicGold} style={styles.refreshIcon} />
              <View style={styles.refreshGlow} />
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceAmount}>₦10,000.00</Text>
          </View>
          <Text style={styles.balanceSubtext}>Available for contributions</Text>
          
          <View style={styles.walletActions}>
            <Animated.View style={{ transform: [{ scale: topUpPulseAnim }] }}>
              <TouchableOpacity 
                style={[styles.walletActionButton, styles.primaryAction]}
                onPress={() => handleQuickAction('topup')}
                activeOpacity={0.8}
              >
                <View style={styles.actionButtonGlow} />
                <View style={styles.topUpShine} />
                <View style={styles.actionIconContainer}>
                  <Icon name="add-circle" size={24} color={colors.charcoalGray} />
                  <View style={styles.iconPulse} />
                </View>
                <Text style={styles.actionText}>Top Up</Text>
                <View style={styles.actionAccent} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: topUpPulseAnim }] }}>
              <TouchableOpacity 
                style={[styles.walletActionButton, styles.secondaryAction]}
                onPress={() => handleQuickAction('withdraw')}
                activeOpacity={0.8}
              >
                <View style={styles.actionButtonGlow} />
                <View style={styles.withdrawShine} />
                <View style={styles.actionIconContainer}>
                  <Icon name="account-balance-wallet" size={24} color={colors.metallicGold} />
                  <View style={styles.iconPulse} />
                </View>
                <Text style={[styles.actionText, styles.withdrawText]}>Withdraw</Text>
                <View style={styles.actionAccent} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          style={[
            styles.quickActionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('create-group')}
              activeOpacity={0.8}
            >
              <View style={styles.cardShine} />
              <View style={styles.quickActionIcon}>
                <Icon name="group" size={20} color={colors.metallicGold} style={styles.quickActionEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.quickActionTitle}>Create Group</Text>
              <Text style={styles.quickActionSubtitle}>Start saving together</Text>
              <View style={styles.cardAccent} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('join-group')}
              activeOpacity={0.8}
            >
              <View style={styles.cardShine} />
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>🔗</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.quickActionTitle}>Join Group</Text>
              <Text style={styles.quickActionSubtitle}>Enter invite code</Text>
              <View style={styles.cardAccent} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('pay-contribution')}
              activeOpacity={0.8}
            >
              <View style={styles.cardShine} />
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>💸</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.quickActionTitle}>Pay Contribution</Text>
              <Text style={styles.quickActionSubtitle}>Make payment</Text>
              <View style={styles.cardAccent} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('view-transactions')}
              activeOpacity={0.8}
            >
              <View style={styles.cardShine} />
              <View style={styles.quickActionIcon}>
                <Icon name="analytics" size={20} color={colors.metallicGold} style={styles.quickActionEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.quickActionTitle}>Transactions</Text>
              <Text style={styles.quickActionSubtitle}>View history</Text>
              <View style={styles.cardAccent} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* My Groups Section */}
        <Animated.View 
          style={[
            styles.groupsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Groups</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Empty State */}
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Icon name="group" size={32} color={colors.slateGray} style={styles.emptyStateEmoji} />
            </View>
            <Text style={styles.emptyStateTitle}>No Groups Yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Create or join your first savings group to get started
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => handleQuickAction('create-group')}
            >
              <Text style={styles.emptyStateButtonText}>Create Your First Group</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View 
          style={[
            styles.activityContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Empty State */}
          <View style={styles.emptyActivity}>
            <View style={styles.emptyActivityIcon}>
              <Icon name="trending-up" size={32} color={colors.slateGray} style={styles.emptyActivityEmoji} />
            </View>
            <Text style={styles.emptyActivityTitle}>No Activity Yet</Text>
            <Text style={styles.emptyActivitySubtitle}>
              Your transactions and group activities will appear here
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoalGray,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.05,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: colors.metallicGold,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: colors.softChampagne,
    bottom: 200,
    left: -75,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom tab
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40, // Increased from 20 to fix spacing
    paddingBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingWrapper: {
    position: 'relative',
  },
  greeting: {
    fontSize: 16,
    color: colors.matteWhite,
    fontWeight: '400',
    opacity: 0.8,
  },
  userName: {
    fontSize: 28,
    color: colors.matteWhite,
    fontWeight: 'bold',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  welcomeAccent: {
    position: 'absolute',
    bottom: -6,
    left: 0,
    width: 50,
    height: 3,
    backgroundColor: colors.metallicGold,
    borderRadius: 2,
    shadowColor: colors.metallicGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emeraldGreen,
  },
  statusText: {
    fontSize: 12,
    color: colors.emeraldGreen,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emeraldGreen,
  },
  notificationPulse: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(80, 200, 120, 0.3)',
  },
  walletCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  walletShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.6,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletTitle: {
    fontSize: 16,
    color: colors.matteWhite,
    fontWeight: '500',
    opacity: 0.9,
  },
  walletIcon: {
    fontSize: 16,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
  },
  refreshIcon: {
    fontSize: 16,
    color: colors.metallicGold,
  },
  refreshGlow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  balanceContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.metallicGold,
    textShadowColor: colors.metallicGold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  balanceSubtext: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.7,
    marginBottom: 20,
  },
  walletActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  walletActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  actionButtonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  topUpShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
  },
  withdrawShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(212, 175, 55, 0.4)',
    borderRadius: 12,
  },
  primaryAction: {
    backgroundColor: colors.metallicGold,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: colors.metallicGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryAction: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.5)',
    shadowColor: colors.metallicGold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  actionIconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  iconPulse: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: -1,
  },
  actionAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoalGray,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  withdrawText: {
    color: colors.metallicGold,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    fontWeight: '700',
    fontSize: 14,
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.md,
    position: 'relative',
    overflow: 'hidden',
  },
  cardShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.metallicGold,
    opacity: 0.4,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  iconGlow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 23,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.3,
  },
  groupsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.metallicGold,
    fontWeight: '600',
    textShadowColor: 'rgba(212, 175, 55, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emptyState: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  emptyStateIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateEmoji: {
    fontSize: 28,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: colors.metallicGold,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.charcoalGray,
  },
  activityContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  emptyActivity: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  emptyActivityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyActivityEmoji: {
    fontSize: 24,
  },
  emptyActivityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 6,
  },
  emptyActivitySubtitle: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default HomeScreen;