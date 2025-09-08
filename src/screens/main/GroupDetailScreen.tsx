import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from '../../constants/theme';

interface GroupDetailScreenProps {
  navigation: any;
  route: {
    params: {
      groupId: string;
      groupName: string;
      userRole: 'admin' | 'member';
    };
  };
}

const GroupDetailScreen: React.FC<GroupDetailScreenProps> = ({ navigation, route }) => {
  const { groupId, groupName, userRole } = route.params;
  
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  // Dynamic styles based on userRole
  const dynamicStyles = StyleSheet.create({
    roleBadge: {
      backgroundColor: userRole === 'admin' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(110, 110, 110, 0.2)',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: userRole === 'admin' ? 'rgba(212, 175, 55, 0.4)' : 'rgba(110, 110, 110, 0.4)',
    },
    roleText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: userRole === 'admin' ? colors.metallicGold : colors.slateGray,
    },
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Mock group data
  const groupData = {
    id: groupId,
    name: groupName,
    targetAmount: groupId === 'my-group-1' ? 500000 : 1000000,
    currentAmount: groupId === 'my-group-1' ? 300000 : 400000,
    monthlyContribution: groupId === 'my-group-1' ? 50000 : 100000,
    maxMembers: groupId === 'my-group-1' ? 8 : 10,
    currentMembers: groupId === 'my-group-1' ? 4 : 6,
    nextCollectionDate: 'Dec 15, 2024',
    admin: 'John Doe',
    members: [
      { id: '1', name: 'John Doe', role: 'admin', status: 'paid', amount: 50000 },
      { id: '2', name: 'Jane Smith', role: 'member', status: 'paid', amount: 50000 },
      { id: '3', name: 'Mike Johnson', role: 'member', status: 'pending', amount: 50000 },
      { id: '4', name: 'Sarah Wilson', role: 'member', status: 'paid', amount: 50000 },
      ...(groupId === 'my-group-2' ? [
        { id: '5', name: 'David Brown', role: 'member', status: 'paid', amount: 100000 },
        { id: '6', name: 'Lisa Davis', role: 'member', status: 'pending', amount: 100000 },
      ] : []),
    ],
    recentTransactions: [
      { id: '1', member: 'Jane Smith', amount: 50000, date: 'Dec 1, 2024', status: 'completed' },
      { id: '2', member: 'Mike Johnson', amount: 50000, date: 'Nov 30, 2024', status: 'completed' },
      { id: '3', member: 'Sarah Wilson', amount: 50000, date: 'Nov 29, 2024', status: 'completed' },
    ],
  };

  const progressPercentage = (groupData.currentAmount / groupData.targetAmount) * 100;

  const handleShareGroup = async () => {
    try {
      await Share.share({
        message: `Join my savings group "${groupData.name}" on Adashe! 🏦\n\nTarget: ₦${groupData.targetAmount.toLocaleString()}\nMonthly: ₦${groupData.monthlyContribution.toLocaleString()}\n\nLet's save together! 💰`,
        title: 'Join My Savings Group',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleMakePayment = () => {
    // Navigate to payment screen
    navigation.navigate('Payment', {
      groupId: groupData.id,
      groupName: groupData.name,
      amount: groupData.monthlyContribution,
    });
  };

  const handleManageMembers = () => {
    // Navigate to member management screen
    navigation.navigate('ManageMembers', {
      groupId: groupData.id,
      groupName: groupData.name,
    });
  };

  const handleGroupChat = () => {
    Alert.alert(
      '🚀 Coming Soon!',
      'Group Chat feature is currently under development. Stay tuned for real-time messaging, file sharing, and group collaboration tools!',
      [
        {
          text: 'Got it!',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleViewMemberProfile = (member: any) => {
    navigation.navigate('UserProfileView', {
      userId: member.id,
      userName: member.name,
      userEmail: `${member.name.toLowerCase().replace(' ', '.')}@example.com`,
      userPhone: '+234 801 234 5678',
      userRole: 'member',
      joinDate: 'January 2024',
      isVerified: true,
      groupsCount: 2,
      totalContributions: member.contribution * 12,
      reliabilityScore: 90
    });
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
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <View style={styles.backGlow} />
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{groupData.name}</Text>
            <View style={dynamicStyles.roleBadge}>
              <Text style={dynamicStyles.roleText}>
                {userRole === 'admin' ? 'ADMIN' : 'MEMBER'}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShareGroup}
            activeOpacity={0.8}
          >
            <View style={styles.shareGlow} />
            <Icon name="share" size={18} color={colors.metallicGold} style={styles.shareIcon} />
          </TouchableOpacity>
        </Animated.View>

        {/* Group Overview Card */}
        <Animated.View 
          style={[
            styles.overviewCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.cardShine} />
          <View style={styles.overviewHeader}>
            <Text style={styles.overviewTitle}>Group Overview</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>{progressPercentage.toFixed(0)}% Complete</Text>
            </View>
          </View>

          <View style={styles.overviewStats}>
            <View style={styles.statCard}>
              <Icon name="gps-fixed" size={24} color={colors.metallicGold} style={styles.statIcon} />
              <Text style={styles.statValue}>₦{groupData.targetAmount.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Target Amount</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="account-balance-wallet" size={24} color={colors.metallicGold} style={styles.statIcon} />
              <Text style={styles.statValue}>₦{groupData.currentAmount.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Collected</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="group" size={24} color={colors.metallicGold} style={styles.statIcon} />
              <Text style={styles.statValue}>{groupData.currentMembers}/{groupData.maxMembers}</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <View style={styles.cardAccent} />
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          style={[
            styles.actionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {userRole === 'admin' ? (
            <View style={styles.adminActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleManageMembers}>
                <View style={styles.actionShine} />
                <Icon name="group" size={20} color={colors.metallicGold} style={styles.actionIcon} />
                <Text style={styles.actionText}>Manage Members</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleMakePayment}>
                <View style={styles.actionShine} />
                <Icon name="account-balance-wallet" size={20} color={colors.metallicGold} style={styles.actionIcon} />
                <Text style={styles.actionText}>Collect Funds</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleGroupChat}>
                <View style={styles.actionShine} />
                <Icon name="chat" size={20} color={colors.metallicGold} style={styles.actionIcon} />
                <Text style={styles.actionText}>Group Chat</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.memberActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleMakePayment}>
                <View style={styles.actionShine} />
                <Icon name="payment" size={20} color={colors.metallicGold} style={styles.actionIcon} />
                <Text style={styles.actionText}>Make Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleGroupChat}>
                <View style={styles.actionShine} />
                <Icon name="chat" size={20} color={colors.metallicGold} style={styles.actionIcon} />
                <Text style={styles.actionText}>Group Chat</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        {/* Members List */}
        <Animated.View 
          style={[
            styles.membersContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Members ({groupData.currentMembers})</Text>
            <Text style={styles.nextCollection}>Next Collection: {groupData.nextCollectionDate}</Text>
          </View>

          {groupData.members.map((member, index) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <TouchableOpacity 
                  style={styles.memberAvatar}
                  onPress={() => handleViewMemberProfile(member)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.memberInitial}>{member.name.charAt(0)}</Text>
                </TouchableOpacity>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>
                    {member.role === 'admin' ? 'Admin' : 'Member'}
                  </Text>
                </View>
              </View>
              <View style={styles.memberStatus}>
                <Text style={styles.memberAmount}>₦{member.amount.toLocaleString()}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: member.status === 'paid' ? 'rgba(80, 200, 120, 0.2)' : 'rgba(255, 107, 107, 0.2)' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: member.status === 'paid' ? '#50C878' : '#FF6B6B' }
                  ]}>
                    {member.status === 'paid' ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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

          {groupData.recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <View style={styles.transactionIcon}>
                  <Icon name="account-balance-wallet" size={18} color={colors.metallicGold} style={styles.transactionEmoji} />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionMember}>{transaction.member}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={styles.transactionValue}>+₦{transaction.amount.toLocaleString()}</Text>
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
            </View>
          ))}
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
    pointerEvents: 'none',
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    position: 'relative',
  },
  backGlow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  backIcon: {
    fontSize: 20,
    color: colors.metallicGold,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 4,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    position: 'relative',
  },
  shareGlow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  shareIcon: {
    fontSize: 18,
  },
  overviewCard: {
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
  cardShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.6,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicGold,
  },
  progressContainer: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.metallicGold,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicGold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.metallicGold,
    borderRadius: 4,
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
  actionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  adminActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  actionShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.6,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.matteWhite,
    textAlign: 'center',
  },
  membersContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicGold,
  },
  nextCollection: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.metallicGold,
    fontWeight: '600',
  },
  memberCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  memberInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicGold,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 12,
    color: colors.slateGray,
  },
  memberStatus: {
    alignItems: 'flex-end',
  },
  memberAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.metallicGold,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  transactionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  transactionCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(80, 200, 120, 0.3)',
  },
  transactionEmoji: {
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMember: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.slateGray,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#50C878',
    marginBottom: 4,
  },
  completedBadge: {
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#50C878',
  },
});

export default GroupDetailScreen;