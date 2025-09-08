/**
 * Manage Members Screen
 * Admin-only screen for managing group members and approving join requests
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  groupCode: string;
}

interface GroupMember {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  joinDate: string;
  role: 'admin' | 'member';
  status: 'active' | 'inactive' | 'suspended';
  totalContributions: number;
  lastContribution: string;
  nextDueDate: string;
}

interface ManageMembersScreenProps {
  navigation: any;
  route: {
    params: {
      groupId: string;
      groupName: string;
    };
  };
}

const ManageMembersScreen: React.FC<ManageMembersScreenProps> = ({ navigation, route }) => {
  const { groupId, groupName } = route.params;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // State
  const [activeTab, setActiveTab] = useState<'members' | 'requests'>('members');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data
  const joinRequests: JoinRequest[] = [
    {
      id: 'req-1',
      userId: 'user-1',
      userName: 'John Doe',
      userEmail: 'john.doe@email.com',
      userPhone: '+234 801 234 5678',
      requestDate: '2 hours ago',
      status: 'pending',
      groupCode: 'FAMILY2024',
    },
    {
      id: 'req-2',
      userId: 'user-2',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@email.com',
      userPhone: '+234 802 345 6789',
      requestDate: '1 day ago',
      status: 'pending',
      groupCode: 'FAMILY2024',
    },
    {
      id: 'req-3',
      userId: 'user-3',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@email.com',
      userPhone: '+234 803 456 7890',
      requestDate: '3 days ago',
      status: 'pending',
      groupCode: 'FAMILY2024',
    },
  ];

  const groupMembers: GroupMember[] = [
    {
      id: 'member-1',
      userId: 'admin-1',
      userName: 'You (Admin)',
      userEmail: 'admin@email.com',
      userPhone: '+234 800 123 4567',
      joinDate: '2 weeks ago',
      role: 'admin',
      status: 'active',
      totalContributions: 50000,
      lastContribution: '2024-01-15',
      nextDueDate: '2024-02-15',
    },
    {
      id: 'member-2',
      userId: 'user-4',
      userName: 'Alice Brown',
      userEmail: 'alice.brown@email.com',
      userPhone: '+234 804 567 8901',
      joinDate: '1 week ago',
      role: 'member',
      status: 'active',
      totalContributions: 25000,
      lastContribution: '2024-01-15',
      nextDueDate: '2024-02-15',
    },
    {
      id: 'member-3',
      userId: 'user-5',
      userName: 'David Lee',
      userEmail: 'david.lee@email.com',
      userPhone: '+234 805 678 9012',
      joinDate: '5 days ago',
      role: 'member',
      status: 'active',
      totalContributions: 25000,
      lastContribution: '2024-01-15',
      nextDueDate: '2024-02-15',
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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleApproveRequest = async (requestId: string, userName: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Request Approved!',
        `${userName} has been added to the group successfully.`,
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  const handleRejectRequest = async (requestId: string, userName: string) => {
    Alert.alert(
      'Reject Request',
      `Are you sure you want to reject ${userName}'s request to join the group?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('Request Rejected', `${userName}'s request has been rejected.`);
            }, 1000);
          },
        },
      ]
    );
  };

  const handleSuspendMember = async (memberId: string, userName: string) => {
    Alert.alert(
      'Suspend Member',
      `Are you sure you want to suspend ${userName} from the group?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Suspend',
          style: 'destructive',
          onPress: () => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('Member Suspended', `${userName} has been suspended from the group.`);
            }, 1000);
          },
        },
      ]
    );
  };

  const handleRemoveMember = async (memberId: string, userName: string) => {
    Alert.alert(
      'Remove Member',
      `Are you sure you want to remove ${userName} from the group? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('Member Removed', `${userName} has been removed from the group.`);
            }, 1000);
          },
        },
      ]
    );
  };

  const handleViewProfile = (member: GroupMember | JoinRequest) => {
    navigation.navigate('UserProfileView', {
      userId: member.userId,
      userName: member.userName,
      userEmail: member.userEmail,
      userPhone: member.userPhone,
      userRole: 'role' in member ? member.role : 'member',
      joinDate: 'joinDate' in member ? member.joinDate : 'Pending',
      isVerified: true,
      groupsCount: 'totalContributions' in member ? Math.floor(member.totalContributions / 50000) : 1,
      totalContributions: 'totalContributions' in member ? member.totalContributions : 0,
      reliabilityScore: 'totalContributions' in member ? Math.min(95, Math.floor(member.totalContributions / 2000)) : 75
    });
  };

  const pendingRequestsCount = joinRequests.filter(req => req.status === 'pending').length;
  const activeMembersCount = groupMembers.filter(member => member.status === 'active').length;

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
            <Text style={styles.headerTitle}>Manage Members</Text>
            <Text style={styles.headerSubtitle}>{groupName}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => Alert.alert('Settings', 'Group settings will be available soon!')}
          activeOpacity={0.8}
        >
          <Icon name="settings" size={20} color={colors.metallicGold} />
          <View style={styles.settingsGlow} />
        </TouchableOpacity>
      </Animated.View>

      {/* Tab Navigation */}
      <Animated.View 
        style={[
          styles.tabContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, activeTab === 'members' && styles.tabActive]}
          onPress={() => setActiveTab('members')}
          activeOpacity={0.8}
        >
          <Icon name="group" size={18} color={activeTab === 'members' ? colors.metallicGold : colors.slateGray} />
          <Text style={[styles.tabText, activeTab === 'members' && styles.tabTextActive]}>
            Members ({activeMembersCount})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.tabActive]}
          onPress={() => setActiveTab('requests')}
          activeOpacity={0.8}
        >
          <Icon name="person-add" size={18} color={activeTab === 'requests' ? colors.metallicGold : colors.slateGray} />
          <Text style={[styles.tabText, activeTab === 'requests' && styles.tabTextActive]}>
            Requests ({pendingRequestsCount})
          </Text>
          {pendingRequestsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pendingRequestsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'members' ? (
          // Members List
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {groupMembers.map((member, index) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberHeader}>
                  <TouchableOpacity 
                    style={styles.memberAvatar}
                    onPress={() => handleViewProfile(member)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.memberAvatarText}>
                      {member.userName.charAt(0)}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.memberInfo}>
                    <View style={styles.memberNameRow}>
                      <Text style={styles.memberName}>{member.userName}</Text>
                      {member.role === 'admin' && (
                        <View style={styles.adminBadge}>
                          <Icon name="admin-panel-settings" size={12} color={colors.metallicGold} />
                          <Text style={styles.adminBadgeText}>Admin</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.memberEmail}>{member.userEmail}</Text>
                    <Text style={styles.memberPhone}>{member.userPhone}</Text>
                  </View>
                  <View style={styles.memberStatus}>
                    <View style={[
                      styles.statusDot,
                      { backgroundColor: member.status === 'active' ? colors.emeraldGreen : colors.slateGray }
                    ]} />
                    <Text style={[
                      styles.statusText,
                      { color: member.status === 'active' ? colors.emeraldGreen : colors.slateGray }
                    ]}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.memberStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>₦{member.totalContributions.toLocaleString()}</Text>
                    <Text style={styles.statLabel}>Total Contributed</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{member.lastContribution}</Text>
                    <Text style={styles.statLabel}>Last Payment</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{member.nextDueDate}</Text>
                    <Text style={styles.statLabel}>Next Due</Text>
                  </View>
                </View>

                {member.role !== 'admin' && (
                  <View style={styles.memberActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleSuspendMember(member.id, member.userName)}
                      activeOpacity={0.8}
                    >
                      <Icon name="pause-circle" size={16} color="#FFA500" />
                      <Text style={styles.actionButtonText}>Suspend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.removeButton]}
                      onPress={() => handleRemoveMember(member.id, member.userName)}
                      activeOpacity={0.8}
                    >
                      <Icon name="remove-circle" size={16} color="#FF6B6B" />
                      <Text style={[styles.actionButtonText, styles.removeButtonText]}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </Animated.View>
        ) : (
          // Join Requests List
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {joinRequests.map((request, index) => (
              <View key={request.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <TouchableOpacity 
                    style={styles.requestAvatar}
                    onPress={() => handleViewProfile(request)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.requestAvatarText}>
                      {request.userName.charAt(0)}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.requestInfo}>
                    <Text style={styles.requestName}>{request.userName}</Text>
                    <Text style={styles.requestEmail}>{request.userEmail}</Text>
                    <Text style={styles.requestPhone}>{request.userPhone}</Text>
                  </View>
                  <View style={styles.requestMeta}>
                    <Text style={styles.requestDate}>{request.requestDate}</Text>
                    <View style={styles.requestStatus}>
                      <View style={styles.pendingDot} />
                      <Text style={styles.pendingText}>Pending</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => handleApproveRequest(request.id, request.userName)}
                    disabled={isLoading}
                    activeOpacity={0.8}
                  >
                    <Icon name="check-circle" size={18} color={colors.emeraldGreen} />
                    <Text style={styles.approveButtonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleRejectRequest(request.id, request.userName)}
                    disabled={isLoading}
                    activeOpacity={0.8}
                  >
                    <Icon name="cancel" size={18} color="#FF6B6B" />
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {joinRequests.length === 0 && (
              <View style={styles.emptyState}>
                <Icon name="person-add-disabled" size={48} color={colors.slateGray} />
                <Text style={styles.emptyStateTitle}>No Pending Requests</Text>
                <Text style={styles.emptyStateSubtitle}>
                  New join requests will appear here for your approval.
                </Text>
              </View>
            )}
          </Animated.View>
        )}
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
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  settingsGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 19,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    position: 'relative',
  },
  tabActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  tabText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
  tabTextActive: {
    color: colors.metallicGold,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.emeraldGreen,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xs,
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  memberCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  memberAvatarText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: colors.metallicGold,
  },
  memberInfo: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  memberName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
    marginRight: theme.spacing.sm,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
  },
  adminBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.metallicGold,
    fontWeight: '600',
    marginLeft: 2,
  },
  memberEmail: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginBottom: 2,
  },
  memberPhone: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
  },
  memberStatus: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
  },
  memberStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: colors.metallicGold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.slateGray,
    textAlign: 'center',
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  actionButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
  removeButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  removeButtonText: {
    color: '#FF6B6B',
  },
  requestCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  requestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  requestAvatarText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: colors.metallicGold,
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.xs,
  },
  requestEmail: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginBottom: 2,
  },
  requestPhone: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
  },
  requestMeta: {
    alignItems: 'flex-end',
  },
  requestDate: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.slateGray,
    marginBottom: theme.spacing.xs,
  },
  requestStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA500',
    marginRight: 4,
  },
  pendingText: {
    fontSize: theme.typography.fontSize.xs,
    color: '#FFA500',
    fontWeight: '600',
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(80, 200, 120, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(80, 200, 120, 0.2)',
  },
  approveButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: colors.emeraldGreen,
    marginLeft: theme.spacing.xs,
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  rejectButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: theme.spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  emptyStateSubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: colors.slateGray,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ManageMembersScreen;
