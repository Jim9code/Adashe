/**
 * Create Group Screen
 * Luxury group creation with invite link generation
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
  TextInput,
  Dimensions,
  Animated,
  Easing,
  Alert,
  Share,
} from 'react-native';
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface CreateGroupScreenProps {
  navigation: any; // TODO: Add proper navigation types
}

const CreateGroupScreen: React.FC<CreateGroupScreenProps> = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [memberLimit, setMemberLimit] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [loading, setLoading] = useState(false);

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

    // Create button pulsing animation
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

  const generateInviteLink = (groupId: string) => {
    return `https://adashe.app/join/${groupId}`;
  };

  const handleCreateGroup = async () => {
    if (!groupName || !targetAmount || !memberLimit || !contributionAmount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual API call
      console.log('Creating group:', {
        groupName,
        groupDescription,
        targetAmount,
        memberLimit,
        contributionAmount,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate invite link
      const groupId = 'group_' + Date.now();
      const inviteLink = generateInviteLink(groupId);

      // Show success with invite link
      Alert.alert(
        'Group Created Successfully! 🎉',
        `Your group "${groupName}" has been created.\n\nInvite Link: ${inviteLink}`,
        [
          {
            text: 'Share Invite Link',
            onPress: () => handleShareInvite(groupName, inviteLink),
          },
          {
            text: 'Done',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareInvite = async (groupName: string, inviteLink: string) => {
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
            <Text style={styles.backIcon}>←</Text>
            <View style={styles.backGlow} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Create Group</Text>
            <Text style={styles.headerSubtitle}>Start your savings circle</Text>
          </View>
          <View style={styles.headerSpacer} />
        </Animated.View>

        {/* Form */}
        <Animated.View 
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Form Header */}
          <View style={styles.formHeader}>
            <View style={styles.formIcon}>
              <Text style={styles.formEmoji}>🏦</Text>
              <View style={styles.iconGlow} />
            </View>
            <Text style={styles.formTitle}>Create Your Savings Circle</Text>
            <Text style={styles.formSubtitle}>Set up your group and start inviting members</Text>
          </View>

          {/* Form Fields Grid */}
          <View style={styles.formGrid}>
            {/* Group Name */}
            <View style={styles.inputCard}>
              <View style={styles.cardShine} />
              <View style={styles.inputHeader}>
                <Text style={styles.inputIcon}>📝</Text>
                <Text style={styles.inputLabel}>Group Name</Text>
                <Text style={styles.requiredBadge}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={groupName}
                  onChangeText={setGroupName}
                  placeholder="e.g., Family Savings Circle"
                  placeholderTextColor="rgba(248, 248, 248, 0.6)"
                />
                <View style={styles.inputGlow} />
              </View>
            </View>

            {/* Target Amount */}
            <View style={styles.inputCard}>
              <View style={styles.cardShine} />
              <View style={styles.inputHeader}>
                <Text style={styles.inputIcon}>🎯</Text>
                <Text style={styles.inputLabel}>Target Amount</Text>
                <Text style={styles.requiredBadge}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.currencyContainer}>
                  <Text style={styles.currencySymbol}>₦</Text>
                  <TextInput
                    style={styles.currencyInput}
                    value={targetAmount}
                    onChangeText={setTargetAmount}
                    placeholder="100,000"
                    placeholderTextColor="rgba(248, 248, 248, 0.6)"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGlow} />
              </View>
            </View>

            {/* Member Limit */}
            <View style={styles.inputCard}>
              <View style={styles.cardShine} />
              <View style={styles.inputHeader}>
                <Text style={styles.inputIcon}>👥</Text>
                <Text style={styles.inputLabel}>Max Members</Text>
                <Text style={styles.requiredBadge}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={memberLimit}
                  onChangeText={setMemberLimit}
                  placeholder="10"
                  placeholderTextColor="rgba(248, 248, 248, 0.6)"
                  keyboardType="numeric"
                />
                <View style={styles.inputGlow} />
              </View>
            </View>

            {/* Monthly Contribution */}
            <View style={styles.inputCard}>
              <View style={styles.cardShine} />
              <View style={styles.inputHeader}>
                <Text style={styles.inputIcon}>💰</Text>
                <Text style={styles.inputLabel}>Monthly Contribution</Text>
                <Text style={styles.requiredBadge}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.currencyContainer}>
                  <Text style={styles.currencySymbol}>₦</Text>
                  <TextInput
                    style={styles.currencyInput}
                    value={contributionAmount}
                    onChangeText={setContributionAmount}
                    placeholder="10,000"
                    placeholderTextColor="rgba(248, 248, 248, 0.6)"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGlow} />
              </View>
            </View>
          </View>

          {/* Group Description */}
          <View style={styles.descriptionCard}>
            <View style={styles.cardShine} />
            <View style={styles.inputHeader}>
              <Text style={styles.inputIcon}>📄</Text>
              <Text style={styles.inputLabel}>Description</Text>
              <Text style={styles.optionalBadge}>Optional</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textArea}
                value={groupDescription}
                onChangeText={setGroupDescription}
                placeholder="Describe your group's purpose and goals..."
                placeholderTextColor="rgba(248, 248, 248, 0.6)"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View style={styles.inputGlow} />
            </View>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoShine} />
            <View style={styles.infoHeader}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoEmoji}>💡</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.infoTitle}>How it works</Text>
            </View>
            <Text style={styles.infoText}>
              Once you create the group, you'll get an invite link to share with friends and family. 
              Members can join until you reach the maximum number. Each member contributes the monthly amount until the target is reached.
            </Text>
            <View style={styles.infoSteps}>
              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>Create group</Text>
              </View>
              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>Share invite</Text>
              </View>
              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>Start saving</Text>
              </View>
            </View>
          </View>

          {/* Create Button */}
          <Animated.View style={{ transform: [{ scale: createButtonPulseAnim }] }}>
            <TouchableOpacity 
              style={[styles.createButton, loading && styles.createButtonDisabled]}
              onPress={handleCreateGroup}
              disabled={loading}
              activeOpacity={0.8}
            >
              <View style={styles.buttonShine} />
              <View style={styles.buttonIcon}>
                <Text style={styles.buttonEmoji}>✨</Text>
                <View style={styles.iconGlow} />
              </View>
              <Text style={styles.createButtonText}>
                {loading ? 'Creating Group...' : 'Create Group'}
              </Text>
              <View style={styles.buttonAccent} />
            </TouchableOpacity>
          </Animated.View>
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
  backIcon: {
    fontSize: 20,
    color: colors.metallicGold,
    fontWeight: 'bold',
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
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.matteWhite,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.matteWhite,
    opacity: 0.8,
    marginTop: 2,
  },
  headerSpacer: {
    width: 44,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  formIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  formEmoji: {
    fontSize: 28,
  },
  iconGlow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 28,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.metallicGold,
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(212, 175, 55, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  inputCard: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 16,
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
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.6,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  inputIcon: {
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.matteWhite,
    flex: 1,
  },
  requiredBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  optionalBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.slateGray,
    backgroundColor: 'rgba(110, 110, 110, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.matteWhite,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  currencySymbol: {
    fontSize: 18,
    color: colors.metallicGold,
    fontWeight: 'bold',
    marginRight: 8,
  },
  currencyInput: {
    flex: 1,
    fontSize: 16,
    color: colors.matteWhite,
  },
  inputGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    borderRadius: 12,
    pointerEvents: 'none',
  },
  descriptionCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.md,
    position: 'relative',
    overflow: 'hidden',
  },
  textArea: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.matteWhite,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    height: 100,
    textAlignVertical: 'top',
  },
  infoCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.md,
    position: 'relative',
    overflow: 'hidden',
  },
  infoShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.metallicGold,
    opacity: 0.6,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  infoIcon: {
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
  infoEmoji: {
    fontSize: 18,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.metallicGold,
    textShadowColor: 'rgba(212, 175, 55, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoText: {
    fontSize: 14,
    color: colors.matteWhite,
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoSteps: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stepItem: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.metallicGold,
    color: colors.charcoalGray,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 10,
    color: colors.matteWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: colors.metallicGold,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: colors.metallicGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(44, 44, 44, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonEmoji: {
    fontSize: 16,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.charcoalGray,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(44, 44, 44, 0.2)',
  },
});

export default CreateGroupScreen;