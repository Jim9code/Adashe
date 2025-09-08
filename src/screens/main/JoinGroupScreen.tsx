/**
 * Join Group Screen
 * Secure group joining with unique code input and admin approval flow
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface JoinGroupScreenProps {
  navigation: any;
}

const JoinGroupScreen: React.FC<JoinGroupScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const inputFocusAnim = useRef(new Animated.Value(0)).current;

  // State
  const [groupCode, setGroupCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [groupInfo, setGroupInfo] = useState<any>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  const handleCodeChange = (text: string) => {
    // Remove spaces and convert to uppercase
    const cleanCode = text.replace(/\s/g, '').toUpperCase();
    setGroupCode(cleanCode);
    
    // Validate code format (6-8 alphanumeric characters)
    const isValid = /^[A-Z0-9]{6,8}$/.test(cleanCode);
    setIsCodeValid(isValid);
    
    if (isValid && cleanCode.length >= 6) {
      // Simulate fetching group info
      fetchGroupInfo(cleanCode);
    } else {
      setGroupInfo(null);
    }
  };

  const fetchGroupInfo = async (code: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock group data
      const mockGroupInfo = {
        id: 'group-123',
        name: 'Family Savings Circle',
        description: 'Monthly savings for family expenses and emergencies',
        targetAmount: 500000,
        currentMembers: 3,
        maxMembers: 8,
        monthlyContribution: 25000,
        adminName: 'Sarah Johnson',
        adminAvatar: 'SJ',
        createdDate: '2 weeks ago',
        nextContribution: '2024-02-15',
        status: 'active',
      };
      
      setGroupInfo(mockGroupInfo);
      setIsLoading(false);
    }, 1500);
  };

  const handleJoinRequest = async () => {
    if (!isCodeValid || !groupInfo) {
      Alert.alert('Invalid Code', 'Please enter a valid group code');
      return;
    }

    // Check if phone is verified before allowing join request
    Alert.alert(
      'Phone Verification Required',
      'You need to verify your phone number before joining groups. This ensures security for all members.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Verify Phone',
          onPress: () => {
            navigation.navigate('PhoneConfirmation', {
              phoneNumber: '+234 801 234 5678', // This would come from user profile
              userId: 'current-user-id'
            });
          },
        },
      ]
    );
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    Animated.timing(inputFocusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    Animated.timing(inputFocusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const generateSampleCode = () => {
    const sampleCode = 'FAMILY2024';
    setGroupCode(sampleCode);
    setIsCodeValid(true);
    fetchGroupInfo(sampleCode);
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
            <Text style={styles.headerTitle}>Join Group</Text>
            <Text style={styles.headerSubtitle}>Enter group invitation code</Text>
          </View>
        </View>
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Security Notice */}
          <Animated.View 
            style={[
              styles.securityNotice,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.securityIcon}>
              <Icon name="security" size={24} color={colors.emeraldGreen} />
              <View style={styles.iconGlow} />
            </View>
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Secure Group Joining</Text>
              <Text style={styles.securityText}>
                Only join groups you trust. Group codes are unique and provided by group administrators.
              </Text>
            </View>
          </Animated.View>

          {/* Code Input Section */}
          <Animated.View 
            style={[
              styles.inputSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Group Invitation Code</Text>
            
            <View style={styles.inputContainer}>
              <Animated.View 
                style={[
                  styles.inputWrapper,
                  {
                    transform: [{ scale: scaleAnim }],
                    borderColor: isInputFocused 
                      ? colors.metallicGold 
                      : isCodeValid 
                        ? colors.emeraldGreen 
                        : 'rgba(212, 175, 55, 0.3)',
                  },
                ]}
              >
                <TextInput
                  style={styles.codeInput}
                  value={groupCode}
                  onChangeText={handleCodeChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Enter group code (e.g., FAMILY2024)"
                  placeholderTextColor="rgba(248, 248, 248, 0.5)"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={8}
                />
                <View style={styles.inputGlow} />
              </Animated.View>
              
              {isCodeValid && (
                <Animated.View 
                  style={[
                    styles.validIndicator,
                    {
                      opacity: fadeAnim,
                      transform: [{ scale: scaleAnim }],
                    },
                  ]}
                >
                  <Icon name="check-circle" size={20} color={colors.emeraldGreen} />
                </Animated.View>
              )}
            </View>

            <TouchableOpacity 
              style={styles.sampleButton}
              onPress={generateSampleCode}
              activeOpacity={0.8}
            >
              <Icon name="help-outline" size={16} color={colors.metallicGold} />
              <Text style={styles.sampleButtonText}>See sample code</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Group Info Card */}
          {groupInfo && (
            <Animated.View 
              style={[
                styles.groupInfoCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.groupHeader}>
                <View style={styles.groupIcon}>
                  <Text style={styles.groupIconText}>{groupInfo.name.charAt(0)}</Text>
                  <View style={styles.iconGlow} />
                </View>
                <View style={styles.groupDetails}>
                  <Text style={styles.groupName}>{groupInfo.name}</Text>
                  <Text style={styles.groupDescription}>{groupInfo.description}</Text>
                </View>
              </View>

              <View style={styles.groupStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₦{groupInfo.targetAmount.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Target Amount</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₦{groupInfo.monthlyContribution.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Monthly Contribution</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{groupInfo.currentMembers}/{groupInfo.maxMembers}</Text>
                  <Text style={styles.statLabel}>Members</Text>
                </View>
              </View>

              <View style={styles.adminInfo}>
                <View style={styles.adminAvatar}>
                  <Text style={styles.adminAvatarText}>{groupInfo.adminAvatar}</Text>
                </View>
                <View style={styles.adminDetails}>
                  <Text style={styles.adminName}>Admin: {groupInfo.adminName}</Text>
                  <Text style={styles.adminDate}>Created {groupInfo.createdDate}</Text>
                </View>
              </View>

              <View style={styles.nextContribution}>
                <Icon name="schedule" size={16} color={colors.metallicGold} />
                <Text style={styles.nextContributionText}>
                  Next contribution: {groupInfo.nextContribution}
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Join Button */}
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
              style={[
                styles.joinButton,
                (!isCodeValid || !groupInfo || isLoading) && styles.joinButtonDisabled
              ]}
              onPress={handleJoinRequest}
              disabled={!isCodeValid || !groupInfo || isLoading}
              activeOpacity={0.8}
            >
              <View style={styles.buttonShine} />
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Icon name="refresh" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Sending Request...</Text>
                </View>
              ) : (
                <>
                  <Icon name="group-add" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Request to Join Group</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.disclaimerText}>
              Your request will be sent to the group administrator for approval. You'll be notified once approved.
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  securityNotice: {
    flexDirection: 'row',
    backgroundColor: 'rgba(80, 200, 120, 0.1)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(80, 200, 120, 0.2)',
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
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
    backgroundColor: 'rgba(80, 200, 120, 0.2)',
    zIndex: -1,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.emeraldGreen,
    marginBottom: theme.spacing.xs,
  },
  securityText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.matteWhite,
    opacity: 0.8,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  inputWrapper: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  inputGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: theme.borderRadius.lg + 1,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    zIndex: -1,
  },
  codeInput: {
    fontSize: theme.typography.fontSize.lg,
    color: colors.matteWhite,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
  },
  validIndicator: {
    position: 'absolute',
    right: theme.spacing.md,
    top: '50%',
    marginTop: -10,
  },
  sampleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  sampleButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.metallicGold,
    marginLeft: theme.spacing.xs,
  },
  groupInfoCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  groupIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    position: 'relative',
  },
  groupIconText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: colors.metallicGold,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.xs,
  },
  groupDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    lineHeight: 20,
  },
  groupStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '700',
    color: colors.metallicGold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.slateGray,
    textAlign: 'center',
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  adminAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  adminAvatarText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: colors.metallicGold,
  },
  adminDetails: {
    flex: 1,
  },
  adminName: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  adminDate: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.slateGray,
  },
  nextContribution: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  nextContributionText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.metallicGold,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  actionSection: {
    alignItems: 'center',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: colors.metallicGold,
    position: 'relative',
    overflow: 'hidden',
    minWidth: width * 0.8,
  },
  joinButtonDisabled: {
    backgroundColor: 'rgba(110, 110, 110, 0.2)',
    borderColor: colors.slateGray,
    opacity: 0.6,
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.5)',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.metallicGold,
    marginLeft: theme.spacing.sm,
  },
  disclaimerText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: theme.spacing.md,
  },
});

export default JoinGroupScreen;
