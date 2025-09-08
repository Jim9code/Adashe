/**
 * Groups Screen
 * Luxury groups management with interactive elements
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
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface GroupsScreenProps {
  navigation: any; // TODO: Add proper navigation types
}

const GroupsScreen: React.FC<GroupsScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const createButtonPulseAnim = useRef(new Animated.Value(1)).current;

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

    // Create Group button pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(createButtonPulseAnim, {
          toValue: 1.05,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(createButtonPulseAnim, {
          toValue: 1,
          duration: 1200,
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

  const handleCreateGroup = () => {
    console.log('Create Group pressed');
    navigation.navigate('CreateGroup');
  };

  const handleJoinGroup = () => {
    console.log('Join Group pressed');
    navigation.navigate('JoinGroup');
  };

  const handleGroupPress = (groupId: string) => {
    console.log('Group pressed:', groupId);
    
    // Determine user role based on group
    const userRole = groupId === 'my-group-1' ? 'admin' : 'member';
    const groupName = groupId === 'my-group-1' ? 'Family Home Fund' : 'Business Investment';
    
    // Navigate to GroupDetail screen in the parent stack navigator
    navigation.getParent()?.navigate('GroupDetail', {
      groupId,
      groupName,
      userRole,
    });
  };

  const handleShareInvite = async (groupName: string, groupId: string) => {
    const inviteLink = `https://adashe.app/join/${groupId}`;
    try {
      await Share.share({
        message: `Join my savings group "${groupName}" on Adashe! 🏦\n\nInvite Link: ${inviteLink}\n\nLet's save together and achieve our financial goals! 💰`,
        title: 'Join My Savings Group',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
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
              <Text style={styles.greeting}>My Groups</Text>
              <Text style={styles.subtitle}>Manage your savings circles</Text>
              <View style={styles.welcomeAccent} />
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
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
          <View style={styles.quickActionsRow}>
            <Animated.View style={{ transform: [{ scale: createButtonPulseAnim }] }}>
              <TouchableOpacity 
                style={styles.createGroupButton}
                onPress={handleCreateGroup}
                activeOpacity={0.8}
              >
                <View style={styles.buttonShine} />
                <View style={styles.buttonIcon}>
                  <Icon name="add" size={20} color={colors.metallicGold} style={styles.buttonEmoji} />
                  <View style={styles.iconGlow} />
                </View>
                <Text style={styles.buttonText}>Create Group</Text>
                <Text style={styles.buttonSubtext}>Start a new circle</Text>
                <View style={styles.buttonAccent} />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity 
              style={styles.joinGroupButton}
              onPress={handleJoinGroup}
              activeOpacity={0.8}
            >
              <View style={styles.buttonShine} />
              <View style={styles.buttonIcon}>
                <Icon name="link" size={20} color={colors.metallicGold} style={styles.buttonEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.buttonText}>Join Group</Text>
              <Text style={styles.buttonSubtext}>Enter invite code</Text>
              <View style={styles.buttonAccent} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Groups Section */}
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
            <Text style={styles.sectionTitle}>Your Groups</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Admin Group View */}
          <TouchableOpacity 
            style={styles.groupCard}
            onPress={() => handleGroupPress('my-group-1')}
            activeOpacity={0.8}
          >
            <View style={styles.cardShine} />
            <View style={styles.groupHeader}>
              <View style={styles.groupIcon}>
                <Icon name="home" size={20} color={colors.metallicGold} style={styles.groupEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.groupInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.groupTitle}>Family Home Fund</Text>
                  <View style={styles.adminBadge}>
                    <Text style={styles.adminText}>👑 ADMIN</Text>
                  </View>
                </View>
                <Text style={styles.groupSubtitle}>Target: ₦500,000</Text>
              </View>
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={() => handleShareInvite('Family Home Fund', 'my-group-1')}
                activeOpacity={0.8}
              >
                <Icon name="share" size={18} color={colors.metallicGold} style={styles.shareIcon} />
                <View style={styles.shareGlow} />
              </TouchableOpacity>
            </View>
            
            {/* Admin Controls */}
            <View style={styles.adminControls}>
              <TouchableOpacity style={styles.adminButton}>
                <Icon name="group" size={16} color={colors.metallicGold} style={styles.adminButtonIcon} />
                <Text style={styles.adminButtonText}>Manage Members</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adminButton}>
                <Icon name="account-balance-wallet" size={16} color={colors.metallicGold} style={styles.adminButtonIcon} />
                <Text style={styles.adminButtonText}>Collect Funds</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.adminButton}>
                <Icon name="analytics" size={16} color={colors.metallicGold} style={styles.adminButtonIcon} />
                <Text style={styles.adminButtonText}>Analytics</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.groupStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>4/8</Text>
                <Text style={styles.statLabel}>Members</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₦50K</Text>
                <Text style={styles.statLabel}>Monthly</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>60%</Text>
                <Text style={styles.statLabel}>Progress</Text>
              </View>
            </View>
            <View style={styles.cardAccent} />
          </TouchableOpacity>

          {/* Member Group View */}
          <TouchableOpacity 
            style={styles.groupCard}
            onPress={() => handleGroupPress('my-group-2')}
            activeOpacity={0.8}
          >
            <View style={styles.cardShine} />
            <View style={styles.groupHeader}>
              <View style={styles.groupIcon}>
                <Icon name="business" size={20} color={colors.metallicGold} style={styles.groupEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.groupInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.groupTitle}>Business Investment</Text>
                  <View style={styles.memberBadge}>
                    <Text style={styles.memberText}>👤 MEMBER</Text>
                  </View>
                </View>
                <Text style={styles.groupSubtitle}>Target: ₦1,000,000</Text>
              </View>
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={() => handleShareInvite('Business Investment', 'my-group-2')}
                activeOpacity={0.8}
              >
                <Icon name="share" size={18} color={colors.metallicGold} style={styles.shareIcon} />
                <View style={styles.shareGlow} />
              </TouchableOpacity>
            </View>
            
            {/* Member Actions */}
            <View style={styles.memberActions}>
              <TouchableOpacity style={styles.memberButton}>
                <Text style={styles.memberButtonIcon}>💳</Text>
                <Text style={styles.memberButtonText}>Make Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.memberButton}>
                <Text style={styles.memberButtonIcon}>📱</Text>
                <Text style={styles.memberButtonText}>View History</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.memberButton}
                onPress={() => {
                  Alert.alert(
                    '🚀 Coming Soon!',
                    'Group Chat feature is currently under development. Stay tuned for real-time messaging, file sharing, and group collaboration tools!',
                    [{ text: 'Got it!', style: 'default' }],
                    { cancelable: true }
                  );
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.memberButtonIcon}>💬</Text>
                <Text style={styles.memberButtonText}>Group Chat</Text>
              </TouchableOpacity>
            </View>

            {/* Payment Status */}
            <View style={styles.paymentStatus}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentLabel}>Next Payment Due:</Text>
                <Text style={styles.paymentDate}>Dec 15, 2024</Text>
              </View>
              <View style={styles.paymentAmount}>
                <Text style={styles.paymentValue}>₦100,000</Text>
                <Text style={styles.paymentStatusText}>Pending</Text>
              </View>
            </View>

            <View style={styles.groupStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>6/10</Text>
                <Text style={styles.statLabel}>Members</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₦100K</Text>
                <Text style={styles.statLabel}>Monthly</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>40%</Text>
                <Text style={styles.statLabel}>Progress</Text>
              </View>
            </View>
            <View style={styles.cardAccent} />
          </TouchableOpacity>
        </Animated.View>


        {/* Tips Section */}
        <Animated.View 
          style={[
            styles.tipsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>💡 Tips for Success</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>🎯</Text>
              <Text style={styles.tipText}>Set clear goals for your group</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>🤝</Text>
              <Text style={styles.tipText}>Choose trustworthy members</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>📅</Text>
              <Text style={styles.tipText}>Maintain regular contributions</Text>
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
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  createGroupButton: {
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
  joinGroupButton: {
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
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.metallicGold,
    opacity: 0.4,
  },
  buttonIcon: {
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
  buttonEmoji: {
    fontSize: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 4,
    textAlign: 'center',
  },
  buttonSubtext: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  buttonAccent: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.matteWhite,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
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
    position: 'relative',
    overflow: 'hidden',
  },
  emptyButtonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.charcoalGray,
  },
  groupCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.md,
    position: 'relative',
    overflow: 'hidden',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  groupEmoji: {
    fontSize: 24,
  },
  groupInfo: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 2,
  },
  groupSubtitle: {
    fontSize: 12,
    color: colors.metallicGold,
    fontWeight: '500',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  shareIcon: {
    fontSize: 18,
  },
  shareGlow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  groupStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicGold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: colors.matteWhite,
    opacity: 0.8,
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
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  groupEmoji: {
    fontSize: 20,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 2,
    textAlign: 'center',
  },
  groupSubtitle: {
    fontSize: 10,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 8,
  },
  groupStats: {
    alignItems: 'center',
    gap: 2,
  },
  groupStat: {
    fontSize: 9,
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
  tipsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tipsCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.9,
    flex: 1,
  },
  // Admin and Member View Styles
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  adminBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  adminText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.metallicGold,
  },
  memberBadge: {
    backgroundColor: 'rgba(110, 110, 110, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(110, 110, 110, 0.4)',
  },
  memberText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.slateGray,
  },
  adminControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  adminButton: {
    flex: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  adminButtonIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  adminButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.metallicGold,
    textAlign: 'center',
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  memberButton: {
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: 'rgba(248, 248, 248, 0.2)',
  },
  memberButtonIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  memberButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.matteWhite,
    textAlign: 'center',
  },
  paymentStatus: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
  },
  paymentDate: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.metallicGold,
  },
  paymentAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.metallicGold,
  },
  paymentStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export default GroupsScreen;