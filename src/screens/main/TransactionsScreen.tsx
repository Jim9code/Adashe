/**
 * Transactions Screen
 * Luxury transaction history with filtering and detailed views
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

interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'transfer' | 'contribution';
  amount: number;
  description: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  groupName?: string;
  memberName?: string;
}

interface TransactionsScreenProps {
  navigation: any;
}

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Sample transactions data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 5000,
      description: 'Top Up via Card',
      date: 'Today',
      time: '2:30 PM',
      status: 'completed',
    },
    {
      id: '2',
      type: 'contribution',
      amount: 2500,
      description: 'Monthly Contribution',
      date: 'Today',
      time: '1:15 PM',
      status: 'completed',
      groupName: 'Family Savings',
    },
    {
      id: '3',
      type: 'credit',
      amount: 10000,
      description: 'Bank Transfer',
      date: 'Yesterday',
      time: '4:45 PM',
      status: 'completed',
    },
    {
      id: '4',
      type: 'debit',
      amount: 1500,
      description: 'Withdrawal',
      date: 'Yesterday',
      time: '11:20 AM',
      status: 'completed',
    },
    {
      id: '5',
      type: 'contribution',
      amount: 3000,
      description: 'Business Investment Contribution',
      date: '2 days ago',
      time: '3:00 PM',
      status: 'completed',
      groupName: 'Business Investment',
    },
    {
      id: '6',
      type: 'transfer',
      amount: 2000,
      description: 'Transfer to John Doe',
      date: '3 days ago',
      time: '9:30 AM',
      status: 'completed',
      memberName: 'John Doe',
    },
    {
      id: '7',
      type: 'credit',
      amount: 7500,
      description: 'Payment Received',
      date: '4 days ago',
      time: '2:15 PM',
      status: 'completed',
      groupName: 'Vacation Fund',
      memberName: 'Sarah Wilson',
    },
  ];

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
    ]).start();
  }, []);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return 'add-circle';
      case 'debit':
        return 'remove-circle';
      case 'transfer':
        return 'swap-horiz';
      case 'contribution':
        return 'group';
      default:
        return 'payment';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit':
        return colors.emeraldGreen;
      case 'debit':
        return '#FF6B6B';
      case 'transfer':
        return colors.metallicGold;
      case 'contribution':
        return colors.metallicGold;
      default:
        return colors.slateGray;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.emeraldGreen;
      case 'pending':
        return '#FFA500';
      case 'failed':
        return '#FF6B6B';
      default:
        return colors.slateGray;
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const sign = type === 'credit' ? '+' : '-';
    return `${sign}₦${amount.toLocaleString()}`;
  };

  const handleTransactionPress = (transaction: Transaction) => {
    console.log('Transaction pressed:', transaction.id);
    // TODO: Navigate to transaction details
  };

  const handleFilterPress = (filter: string) => {
    console.log('Filter pressed:', filter);
    // TODO: Implement filtering
  };

  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => {
    return sum + (t.type === 'credit' ? t.amount : -t.amount);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.charcoalGray} />
      
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
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Icon name="arrow-back" size={24} color={colors.metallicGold} />
            <View style={styles.backGlow} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Transactions</Text>
            <Text style={styles.headerSubtitle}>{totalTransactions} transactions</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => handleFilterPress('all')}
          activeOpacity={0.8}
        >
          <Icon name="filter-list" size={20} color={colors.metallicGold} />
          <View style={styles.filterGlow} />
        </TouchableOpacity>
      </Animated.View>

      {/* Summary Card */}
      <Animated.View 
        style={[
          styles.summaryCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Transaction Summary</Text>
          <View style={styles.summaryIcon}>
            <Icon name="analytics" size={20} color={colors.metallicGold} />
            <View style={styles.iconGlow} />
          </View>
        </View>
        
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₦{Math.abs(totalAmount).toLocaleString()}</Text>
            <Text style={styles.statLabel}>
              {totalAmount >= 0 ? 'Net Gain' : 'Net Loss'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalTransactions}</Text>
            <Text style={styles.statLabel}>Total Transactions</Text>
          </View>
        </View>
      </Animated.View>

      {/* Filter Tabs */}
      <Animated.View 
        style={[
          styles.filterTabs,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabsContent}>
          {['All', 'Credits', 'Debits', 'Contributions', 'Transfers'].map((filter, index) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                index === 0 && styles.filterTabActive
              ]}
              onPress={() => handleFilterPress(filter.toLowerCase())}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.filterTabText,
                index === 0 && styles.filterTabTextActive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Transactions List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {transactions.map((transaction, index) => (
          <Animated.View
            key={transaction.id}
            style={[
              styles.transactionCard,
              {
                opacity: fadeAnim,
                transform: [
                  { 
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30 + (index * 10)],
                    })
                  }
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.transactionItem}
              onPress={() => handleTransactionPress(transaction)}
              activeOpacity={0.8}
            >
              <View style={styles.transactionContent}>
                <View style={styles.transactionIconContainer}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: getTransactionColor(transaction.type) + '20' }
                  ]}>
                    <Icon 
                      name={getTransactionIcon(transaction.type)} 
                      size={20} 
                      color={getTransactionColor(transaction.type)} 
                    />
                    <View style={styles.iconGlow} />
                  </View>
                </View>
                
                <View style={styles.transactionDetails}>
                  <View style={styles.transactionHeader}>
                    <Text style={styles.transactionTitle}>
                      {transaction.description}
                    </Text>
                    <Text style={[
                      styles.transactionAmount,
                      { color: getTransactionColor(transaction.type) }
                    ]}>
                      {formatAmount(transaction.amount, transaction.type)}
                    </Text>
                  </View>
                  
                  <View style={styles.transactionMeta}>
                    <Text style={styles.transactionDate}>
                      {transaction.date} • {transaction.time}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(transaction.status) + '20' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: getStatusColor(transaction.status) }
                      ]}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  {(transaction.groupName || transaction.memberName) && (
                    <Text style={styles.transactionContext}>
                      {transaction.groupName && `Group: ${transaction.groupName}`}
                      {transaction.memberName && ` • From: ${transaction.memberName}`}
                    </Text>
                  )}
                </View>
              </View>
              
              <View style={styles.transactionShine} />
            </TouchableOpacity>
          </Animated.View>
        ))}
        
        {/* Load More */}
        <Animated.View 
          style={[
            styles.loadMore,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.loadMoreButton} activeOpacity={0.8}>
            <Icon name="refresh" size={16} color={colors.metallicGold} />
            <Text style={styles.loadMoreText}>Load More Transactions</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    position: 'relative',
  },
  backGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.matteWhite,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginTop: 2,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 19,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  summaryCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  summaryTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 17,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.metallicGold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    textAlign: 'center',
  },
  filterTabs: {
    marginTop: theme.spacing.md,
  },
  filterTabsContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  filterTab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  filterTabActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  filterTabText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: colors.metallicGold,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  transactionCard: {
    marginBottom: theme.spacing.md,
  },
  transactionItem: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  transactionIconContainer: {
    marginRight: theme.spacing.md,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  transactionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  transactionAmount: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '700',
  },
  transactionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  transactionDate: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
  },
  transactionContext: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    fontStyle: 'italic',
  },
  transactionShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
  },
  loadMore: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  loadMoreText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.metallicGold,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
});

export default TransactionsScreen;
