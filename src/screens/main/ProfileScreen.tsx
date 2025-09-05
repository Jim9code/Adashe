/**
 * Profile Screen
 * Luxury profile management with user settings and account details
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

const ProfileScreen: React.FC = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const avatarPulseAnim = useRef(new Animated.Value(1)).current;

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

    // Avatar pulsing animation
    const avatarPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(avatarPulseAnim, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(avatarPulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    avatarPulse.start();

    return () => {
      avatarPulse.stop();
    };
  }, []);

  const handleEditProfile = () => {
    console.log('Edit Profile pressed');
    Alert.alert('Edit Profile', 'Profile editing will be available soon!');
  };

  const handleSettings = (setting: string) => {
    console.log('Setting pressed:', setting);
    Alert.alert('Settings', `${setting} settings will be available soon!`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            console.log('Logout confirmed');
            // TODO: Dispatch logout action
          }
        },
      ]
    );
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
              <Text style={styles.greeting}>Profile</Text>
              <Text style={styles.subtitle}>Manage your account</Text>
              <View style={styles.welcomeAccent} />
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Verified</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={20} color={colors.metallicGold} style={styles.notificationIcon} />
            <View style={styles.notificationBadge} />
            <View style={styles.notificationPulse} />
          </TouchableOpacity>
        </Animated.View>

        {/* Profile Header */}
        <Animated.View 
          style={[
            styles.profileHeader,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <View style={styles.profileShine} />
          <Animated.View style={{ transform: [{ scale: avatarPulseAnim }] }}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
                <View style={styles.avatarGlow} />
              </View>
              <View style={styles.avatarBadge}>
                <Text style={styles.badgeText}>✓</Text>
              </View>
            </View>
          </Animated.View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
            <Text style={styles.userPhone}>+234 800 000 0000</Text>
          </View>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <View style={styles.editButtonGlow} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Account Stats */}
        <Animated.View 
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Account Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>👥</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active Groups</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>💰</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>₦10K</Text>
              <Text style={styles.statLabel}>Total Savings</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>📅</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </View>
          </View>
        </Animated.View>

        {/* Settings Sections */}
        <Animated.View 
          style={[
            styles.settingsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          {/* Personal Information */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionSubtitle}>Personal Information</Text>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettings('Personal Information')}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Icon name="person" size={20} color={colors.metallicGold} style={styles.settingEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Personal Details</Text>
                <Text style={styles.settingSubtitle}>Name, email, phone number</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettings('Security')}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Icon name="security" size={20} color={colors.metallicGold} style={styles.settingEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Security & Privacy</Text>
                <Text style={styles.settingSubtitle}>Password, PIN, biometrics</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Financial Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionSubtitle}>Financial Settings</Text>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettings('Bank Account')}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Text style={styles.settingEmoji}>🏦</Text>
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Bank Account</Text>
                <Text style={styles.settingSubtitle}>Manage linked accounts</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettings('Notifications')}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Icon name="notifications" size={20} color={colors.metallicGold} style={styles.settingEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingSubtitle}>Payment reminders, updates</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* App Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionSubtitle}>App Settings</Text>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettings('Preferences')}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Icon name="settings" size={20} color={colors.metallicGold} style={styles.settingEmoji} />
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Preferences</Text>
                <Text style={styles.settingSubtitle}>Theme, language, currency</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettings('Support')}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Text style={styles.settingEmoji}>💬</Text>
                <View style={styles.iconGlow} />
              </View>
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Help & Support</Text>
                <Text style={styles.settingSubtitle}>FAQ, contact us, feedback</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Logout Section */}
        <Animated.View 
          style={[
            styles.logoutContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <View style={styles.logoutButtonGlow} />
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* App Version */}
        <Animated.View 
          style={[
            styles.versionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.versionText}>Adashe v1.0.0</Text>
          <Text style={styles.versionSubtext}>Built with love for financial freedom</Text>
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
  profileHeader: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  profileShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.6,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.metallicGold,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarGlow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.charcoalGray,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.emeraldGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.charcoalGray,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.matteWhite,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.8,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.8,
  },
  editButton: {
    backgroundColor: colors.metallicGold,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  editButtonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.charcoalGray,
  },
  statsContainer: {
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
  iconGlow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 14,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
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
  settingsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.metallicGold,
    marginBottom: 12,
    textShadowColor: 'rgba(212, 175, 55, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  settingItem: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  settingIcon: {
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
  settingEmoji: {
    fontSize: 18,
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
  },
  settingArrow: {
    fontSize: 20,
    color: colors.metallicGold,
    fontWeight: 'bold',
  },
  logoutContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    ...theme.shadows.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  logoutButtonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#FF6B6B',
    opacity: 0.4,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  versionContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: colors.slateGray,
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 10,
    color: colors.slateGray,
    opacity: 0.8,
  },
});

export default ProfileScreen;