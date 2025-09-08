/**
 * Phone Number Confirmation Screen
 * OTP verification for phone numbers before users can join groups
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
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

interface PhoneNumberConfirmationScreenProps {
  navigation: any;
  route?: {
    params?: {
      phoneNumber?: string;
      userId?: string;
    };
  };
}

const PhoneNumberConfirmationScreen: React.FC<PhoneNumberConfirmationScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { phoneNumber = '+234 801 234 5678', userId } = route?.params || {};

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const inputFocusAnim = useRef(new Animated.Value(0)).current;

  // State
  const [otpCode, setOtpCode] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
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

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (text: string) => {
    // Only allow numeric input and limit to 6 digits
    const cleanText = text.replace(/[^0-9]/g, '').slice(0, 6);
    setOtpCode(cleanText);
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

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      Alert.alert(
        'Phone Verified! 🎉',
        'Your phone number has been successfully verified. You can now join groups.',
        [
          {
            text: 'Continue',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 2000);
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    setIsResending(true);

    // Simulate resend
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(60);
      setOtpCode('');
      
      // Restart countdown
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      Alert.alert('Code Sent', 'A new verification code has been sent to your phone');
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isOtpValid = otpCode.length === 6;

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
            <Text style={styles.headerTitle}>Verify Phone Number</Text>
            <Text style={styles.headerSubtitle}>Required for group security</Text>
          </View>
        </View>
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.scrollContent}>
          {/* Phone Number Display */}
          <Animated.View 
            style={[
              styles.phoneCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.phoneHeader}>
              <Text style={styles.phoneTitle}>Phone Number</Text>
              <Icon name="phone-android" size={24} color={colors.metallicGold} />
            </View>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            <Text style={styles.phoneSubtitle}>
              We've sent a 6-digit verification code to this number
            </Text>
          </Animated.View>

          {/* OTP Input Section */}
          <Animated.View 
            style={[
              styles.otpSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Enter Verification Code</Text>
            
            <View style={styles.otpContainer}>
              <Animated.View 
                style={[
                  styles.otpInputWrapper,
                  {
                    transform: [{ scale: scaleAnim }],
                    borderColor: isInputFocused 
                      ? colors.metallicGold 
                      : isOtpValid 
                        ? colors.emeraldGreen 
                        : 'rgba(212, 175, 55, 0.3)',
                  },
                ]}
              >
                <TextInput
                  style={styles.otpInput}
                  value={otpCode}
                  onChangeText={handleOtpChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="000000"
                  placeholderTextColor="rgba(248, 248, 248, 0.5)"
                  keyboardType="numeric"
                  maxLength={6}
                  autoFocus
                />
                <View style={styles.inputGlow} />
              </Animated.View>
              
              {isOtpValid && (
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

            {/* OTP Digits Display */}
            <View style={styles.otpDigitsContainer}>
              {Array.from({ length: 6 }, (_, index) => (
                <View 
                  key={index}
                  style={[
                    styles.otpDigit,
                    index < otpCode.length && styles.otpDigitFilled,
                    isInputFocused && index === otpCode.length && styles.otpDigitActive
                  ]}
                >
                  <Text style={[
                    styles.otpDigitText,
                    index < otpCode.length && styles.otpDigitTextFilled
                  ]}>
                    {otpCode[index] || ''}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Resend Code Section */}
          <Animated.View 
            style={[
              styles.resendSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn't receive the code?
              </Text>
              <TouchableOpacity
                style={[
                  styles.resendButton,
                  timeLeft > 0 && styles.resendButtonDisabled
                ]}
                onPress={handleResendCode}
                disabled={timeLeft > 0 || isResending}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.resendButtonText,
                  timeLeft > 0 && styles.resendButtonTextDisabled
                ]}>
                  {isResending ? 'Sending...' : timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend Code'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

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
            <View style={styles.securityCard}>
              <View style={styles.securityHeader}>
                <Icon name="security" size={20} color={colors.metallicGold} />
                <Text style={styles.securityTitle}>Why We Verify</Text>
              </View>
              <Text style={styles.securityText}>
                Phone verification ensures only trusted members can join groups, 
                protecting everyone's investments and maintaining group integrity.
              </Text>
            </View>
          </Animated.View>

          {/* Verify Button */}
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
                styles.verifyButton,
                (!isOtpValid || isVerifying) && styles.verifyButtonDisabled
              ]}
              onPress={handleVerifyOtp}
              disabled={!isOtpValid || isVerifying}
              activeOpacity={0.8}
            >
              <View style={styles.buttonShine} />
              {isVerifying ? (
                <View style={styles.loadingContainer}>
                  <Icon name="refresh" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Verifying...</Text>
                </View>
              ) : (
                <>
                  <Icon name="verified-user" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Verify Phone Number</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.disclaimerText}>
              By verifying your phone number, you agree to our security policies 
              and confirm you are the owner of this number.
            </Text>
          </Animated.View>
        </View>
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
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  phoneCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  phoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  phoneTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  phoneNumber: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.metallicGold,
    marginBottom: theme.spacing.xs,
  },
  phoneSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
  },
  otpSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.md,
  },
  otpContainer: {
    position: 'relative',
    marginBottom: theme.spacing.lg,
  },
  otpInputWrapper: {
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
  otpInput: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.matteWhite,
    textAlign: 'center',
    letterSpacing: 8,
  },
  validIndicator: {
    position: 'absolute',
    right: theme.spacing.md,
    top: '50%',
    marginTop: -10,
  },
  otpDigitsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  otpDigit: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
  },
  otpDigitFilled: {
    borderColor: colors.metallicGold,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  otpDigitActive: {
    borderColor: colors.metallicGold,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  otpDigitText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: colors.slateGray,
  },
  otpDigitTextFilled: {
    color: colors.metallicGold,
  },
  resendSection: {
    marginBottom: theme.spacing.lg,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: theme.typography.fontSize.md,
    color: colors.slateGray,
    marginBottom: theme.spacing.sm,
  },
  resendButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.metallicGold,
  },
  resendButtonDisabled: {
    borderColor: colors.slateGray,
    opacity: 0.5,
  },
  resendButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.metallicGold,
  },
  resendButtonTextDisabled: {
    color: colors.slateGray,
  },
  securityNotice: {
    marginBottom: theme.spacing.lg,
  },
  securityCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  securityTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.metallicGold,
  },
  securityText: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    lineHeight: 20,
  },
  actionSection: {
    alignItems: 'center',
  },
  verifyButton: {
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
  verifyButtonDisabled: {
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

export default PhoneNumberConfirmationScreen;
