/**
 * User Profile View Screen
 * View other users' profiles when clicking their profile pictures
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface UserProfileViewScreenProps {
  navigation: any;
  route?: {
    params?: {
      userId: string;
      userName?: string;
      userEmail?: string;
      userPhone?: string;
      userRole?: 'admin' | 'member';
      joinDate?: string;
      isVerified?: boolean;
      groupsCount?: number;
      totalContributions?: number;
      reliabilityScore?: number;
    };
  };
}

const UserProfileViewScreen: React.FC<UserProfileViewScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const {
    userId = 'user-123',
    userName = 'John Doe',
    userEmail = 'john.doe@example.com',
    userPhone = '+234 801 234 5678',
    userRole = 'member',
    joinDate = 'January 2024',
    isVerified = true,
    groupsCount = 3,
    totalContributions = 150000,
    reliabilityScore = 95
  } = route?.params || {};

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

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


  const handleReportUser = () => {
    Alert.alert(
      'Report User',
      'Are you sure you want to report this user? This action will be reviewed by our support team.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', style: 'destructive', onPress: () => {
          Alert.alert('Report Submitted', 'Thank you for your report. We will review it within 24 hours.');
        }},
      ]
    );
  };

  const formatAmount = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 90) return colors.emeraldGreen;
    if (score >= 70) return colors.metallicGold;
    return '#FF6B6B';
  };

  const getReliabilityText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Fair';
  };

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
            <Text style={styles.headerTitle}>User Profile</Text>
            <Text style={styles.headerSubtitle}>Member information</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => Alert.alert('More Options', 'Additional options will be available soon!')}
          activeOpacity={0.8}
        >
          <Icon name="more-vert" size={24} color={colors.metallicGold} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Animated.View 
          style={[
            styles.profileHeader,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
              <View style={styles.avatarGlow} />
            </View>
            {isVerified && (
              <View style={styles.verifiedBadge}>
                <Icon name="verified" size={16} color={colors.metallicGold} />
              </View>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <View style={styles.roleContainer}>
              <View style={[
                styles.roleBadge,
                { backgroundColor: userRole === 'admin' ? colors.metallicGold : colors.slateGray }
              ]}>
                <Text style={[
                  styles.roleText,
                  { color: userRole === 'admin' ? colors.charcoalGray : colors.matteWhite }
                ]}>
                  {userRole === 'admin' ? 'Group Admin' : 'Member'}
                </Text>
              </View>
            </View>
            <Text style={styles.joinDate}>Member since {joinDate}</Text>
          </View>
        </Animated.View>

        {/* Contact Information */}
        <Animated.View 
          style={[
            styles.contactSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="email" size={20} color={colors.metallicGold} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{userEmail}</Text>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="phone" size={20} color={colors.metallicGold} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{userPhone}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Statistics */}
        <Animated.View 
          style={[
            styles.statsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Member Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="group" size={20} color={colors.metallicGold} />
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>{groupsCount}</Text>
              <Text style={styles.statLabel}>Active Groups</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="account-balance-wallet" size={20} color={colors.metallicGold} />
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>{formatAmount(totalContributions)}</Text>
              <Text style={styles.statLabel}>Total Contributions</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="trending-up" size={20} color={colors.metallicGold} />
                <View style={styles.iconGlow} />
              </View>
              <Text style={[styles.statValue, { color: getReliabilityColor(reliabilityScore) }]}>
                {reliabilityScore}%
              </Text>
              <Text style={styles.statLabel}>Reliability Score</Text>
            </View>
          </View>
        </Animated.View>

        {/* Reliability Score */}
        <Animated.View 
          style={[
            styles.reliabilitySection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Reliability Rating</Text>
          
          <View style={styles.reliabilityCard}>
            <View style={styles.reliabilityHeader}>
              <Text style={styles.reliabilityTitle}>
                {getReliabilityText(reliabilityScore)}
              </Text>
              <View style={[
                styles.reliabilityBadge,
                { backgroundColor: getReliabilityColor(reliabilityScore) }
              ]}>
                <Text style={styles.reliabilityScore}>{reliabilityScore}%</Text>
              </View>
            </View>
            
            <View style={styles.reliabilityBar}>
              <View style={styles.reliabilityBarBackground}>
                <View 
                  style={[
                    styles.reliabilityBarFill,
                    { 
                      width: `${reliabilityScore}%`,
                      backgroundColor: getReliabilityColor(reliabilityScore)
                    }
                  ]} 
                />
              </View>
            </View>
            
            <Text style={styles.reliabilityDescription}>
              Based on payment history, group participation, and member feedback
            </Text>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.actionSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          
          <TouchableOpacity 
            style={styles.reportButton}
            onPress={handleReportUser}
            activeOpacity={0.8}
          >
            <Icon name="report" size={16} color={colors.slateGray} />
            <Text style={styles.reportButtonText}>Report User</Text>
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
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.metallicGold,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 52,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  avatarText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: '700',
    color: colors.charcoalGray,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.emeraldGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.charcoalGray,
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.matteWhite,
    marginBottom: theme.spacing.sm,
  },
  roleContainer: {
    marginBottom: theme.spacing.sm,
  },
  roleBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  roleText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  joinDate: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
  },
  contactSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.md,
  },
  contactCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 21,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  statsSection: {
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  statValue: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: colors.metallicGold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.slateGray,
    textAlign: 'center',
  },
  reliabilitySection: {
    marginBottom: theme.spacing.lg,
  },
  reliabilityCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  reliabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  reliabilityTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  reliabilityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  reliabilityScore: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '700',
    color: colors.matteWhite,
  },
  reliabilityBar: {
    marginBottom: theme.spacing.sm,
  },
  reliabilityBarBackground: {
    height: 8,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  reliabilityBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  reliabilityDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    lineHeight: 18,
  },
  actionSection: {
    alignItems: 'center',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  reportButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginLeft: theme.spacing.xs,
  },
});

export default UserProfileViewScreen;
