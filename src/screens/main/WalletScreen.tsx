/**
 * Wallet Screen
 * Luxury wallet management with transaction history and balance details
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
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

const WalletScreen: React.FC = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const topUpPulseAnim = useRef(new Animated.Value(1)).current;
  const withdrawPulseAnim = useRef(new Animated.Value(1)).current;

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
    const topUpPulse = Animated.loop(
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
    topUpPulse.start();

    // Withdraw button pulsing animation (slightly offset)
    const withdrawPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(withdrawPulseAnim, {
          toValue: 1.03,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(withdrawPulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    withdrawPulse.start();

    return () => {
      topUpPulse.stop();
      withdrawPulse.stop();
    };
  }, []);

  const handleTopUp = () => {
    console.log('Top Up pressed');
    // TODO: Navigate to top up screen
  };

  const handleWithdraw = () => {
    console.log('Withdraw pressed');
    // TODO: Navigate to withdraw screen
  };

  const handleTransactionPress = (transactionId: string) => {
    console.log('Transaction pressed:', transactionId);
    // TODO: Navigate to transaction detail screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.charcoalGray} />
      
      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
        <View style={[styles.gradientCircle, styles.circle3]} />
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
              <Text style={styles.greeting}>My Wallet</Text>
              <Text style={styles.subtitle}>Manage your finances</Text>
              <View style={styles.welcomeAccent} />
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
            <View style={styles.settingsGlow} />
          </TouchableOpacity>
        </Animated.View>

        {/* Balance Card */}
        <Animated.View 
          style={[
            styles.balanceCard,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <View style={styles.balanceShine} />
          <View style={styles.balanceHeader}>
            <View style={styles.balanceTitleContainer}>
              <Text style={styles.balanceTitle}>Total Balance</Text>
              <Text style={styles.balanceIcon}>💰</Text>
            </View>
            <TouchableOpacity style={styles.refreshButton}>
              <Text style={styles.refreshIcon}>🔄</Text>
              <View style={styles.refreshGlow} />
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceAmount}>₦10,000.00</Text>
          </View>
          <Text style={styles.balanceSubtext}>Available for contributions</Text>
          
          <View style={styles.balanceActions}>
            <Animated.View style={{ transform: [{ scale: topUpPulseAnim }] }}>
              <TouchableOpacity 
                style={[styles.balanceActionButton, styles.primaryAction]}
                onPress={handleTopUp}
                activeOpacity={0.8}
              >
                <View style={styles.actionButtonGlow} />
                <View style={styles.topUpShine} />
                <Text style={styles.actionIcon}>💳</Text>
                <Text style={styles.actionText}>Top Up</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: withdrawPulseAnim }] }}>
              <TouchableOpacity 
                style={[styles.balanceActionButton, styles.secondaryAction]}
                onPress={handleWithdraw}
                activeOpacity={0.8}
              >
                <View style={styles.actionButtonGlow} />
                <View style={styles.withdrawShine} />
                <Text style={styles.actionIcon}>🏦</Text>
                <Text style={styles.actionText}>Withdraw</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* Balance Breakdown */}
        <Animated.View 
          style={[
            styles.breakdownContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Balance Breakdown</Text>
          <View style={styles.breakdownGrid}>
            <View style={styles.breakdownCard}>
              <View style={styles.breakdownIcon}>
                <Text style={styles.breakdownEmoji}>📈</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.breakdownAmount}>₦8,500</Text>
              <Text style={styles.breakdownLabel}>In Groups</Text>
            </View>
            <View style={styles.breakdownCard}>
              <View style={styles.breakdownIcon}>
                <Text style={styles.breakdownEmoji}>💎</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.breakdownAmount}>₦1,500</Text>
              <Text style={styles.breakdownLabel}>Available</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View 
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>⬆️</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>₦5,200</Text>
              <Text style={styles.statLabel}>Total Deposits</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>⬇️</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>₦1,800</Text>
              <Text style={styles.statLabel}>Total Withdrawals</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🎯</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>₦3,400</Text>
              <Text style={styles.statLabel}>Net Growth</Text>
            </View>
          </View>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View 
          style={[
            styles.transactionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Sample Transactions */}
          <TouchableOpacity 
            style={styles.transactionCard}
            onPress={() => handleTransactionPress('txn-1')}
            activeOpacity={0.8}
          >
            <View style={styles.cardShine} />
            <View style={styles.transactionIcon}>
              <Text style={styles.transactionEmoji}>💳</Text>
              <View style={styles.iconGlow} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Top Up via Card</Text>
              <Text style={styles.transactionSubtitle}>Today, 2:30 PM</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={styles.amountPositive}>+₦2,000</Text>
              <Text style={styles.transactionStatus}>Completed</Text>
            </View>
            <View style={styles.cardAccent} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.transactionCard}
            onPress={() => handleTransactionPress('txn-2')}
            activeOpacity={0.8}
          >
            <View style={styles.cardShine} />
            <View style={styles.transactionIcon}>
              <Text style={styles.transactionEmoji}>👥</Text>
              <View style={styles.iconGlow} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Group Contribution</Text>
              <Text style={styles.transactionSubtitle}>Yesterday, 10:15 AM</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={styles.amountNegative}>-₦500</Text>
              <Text style={styles.transactionStatus}>Completed</Text>
            </View>
            <View style={styles.cardAccent} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.transactionCard}
            onPress={() => handleTransactionPress('txn-3')}
            activeOpacity={0.8}
          >
            <View style={styles.cardShine} />
            <View style={styles.transactionIcon}>
              <Text style={styles.transactionEmoji}>🏦</Text>
              <View style={styles.iconGlow} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Bank Transfer</Text>
              <Text style={styles.transactionSubtitle}>2 days ago, 4:45 PM</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={styles.amountPositive}>+₦3,200</Text>
              <Text style={styles.transactionStatus}>Completed</Text>
            </View>
            <View style={styles.cardAccent} />
          </TouchableOpacity>
        </Animated.View>

        {/* Security Tips */}
        <Animated.View 
          style={[
            styles.securityContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>🔒 Security Tips</Text>
          <View style={styles.securityCard}>
            <View style={styles.securityItem}>
              <Text style={styles.securityIcon}>🛡️</Text>
              <Text style={styles.securityText}>Never share your wallet PIN</Text>
            </View>
            <View style={styles.securityItem}>
              <Text style={styles.securityIcon}>🔐</Text>
              <Text style={styles.securityText}>Enable biometric authentication</Text>
            </View>
            <View style={styles.securityItem}>
              <Text style={styles.securityIcon}>📱</Text>
              <Text style={styles.securityText}>Keep your app updated</Text>
            </View>
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
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: colors.emeraldGreen,
    top: 300,
    left: 50,
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingWrapper: {
    position: 'relative',
  },
  greeting: {
    fontSize: 28,
    color: colors.matteWhite,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.8,
    marginTop: 4,
  },
  welcomeAccent: {
    position: 'absolute',
    bottom: -6,
    left: 0,
    width: 60,
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
  settingsButton: {
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
  settingsIcon: {
    fontSize: 20,
  },
  settingsGlow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  balanceCard: {
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
  balanceShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.6,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceTitle: {
    fontSize: 16,
    color: colors.matteWhite,
    fontWeight: '500',
    opacity: 0.9,
  },
  balanceIcon: {
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
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceActionButton: {
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 12,
  },
  primaryAction: {
    backgroundColor: colors.metallicGold,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: colors.metallicGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  secondaryAction: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.charcoalGray,
  },
  breakdownContainer: {
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
  breakdownGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  breakdownCard: {
    flex: 1,
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
  breakdownIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  breakdownEmoji: {
    fontSize: 20,
  },
  breakdownAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicGold,
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.sm,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  statEmoji: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.metallicGold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  transactionsContainer: {
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
  transactionCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
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
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  transactionEmoji: {
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.emeraldGreen,
    marginBottom: 2,
  },
  amountNegative: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 10,
    color: colors.metallicGold,
    fontWeight: '500',
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
  securityContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  securityCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.md,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  securityIcon: {
    fontSize: 16,
  },
  securityText: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.9,
    flex: 1,
  },
});

export default WalletScreen;