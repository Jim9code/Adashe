/**
 * Top Up Screen
 * Luxury wallet top-up interface with multiple payment methods
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

interface TopUpScreenProps {
  navigation: any;
}

const TopUpScreen: React.FC<TopUpScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const inputFocusAnim = useRef(new Animated.Value(0)).current;

  // State
  const [topUpAmount, setTopUpAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Sample payment methods
  const paymentMethods = [
    {
      id: 'card',
      name: 'Debit Card',
      icon: 'credit-card',
      description: 'Visa, Mastercard, Verve',
      fee: '1.5%',
      available: true,
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'account-balance',
      description: 'Direct bank transfer',
      fee: '₦50',
      available: true,
    },
    {
      id: 'ussd',
      name: 'USSD',
      icon: 'phone-android',
      description: 'Mobile banking',
      fee: '₦25',
      available: true,
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

  const handleAmountChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleanText = text.replace(/[^0-9.]/g, '');
    setTopUpAmount(cleanText);
  };

  const handleQuickAmount = (amount: number) => {
    setTopUpAmount(amount.toString());
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId as 'card' | 'bank' | 'ussd');
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

  const handleProcessTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid top-up amount');
      return;
    }

    if (parseFloat(topUpAmount) < 100) {
      Alert.alert('Minimum Amount', 'Minimum top-up amount is ₦100');
      return;
    }

    setIsProcessing(true);

    // Simulate top-up processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Top-Up Successful! 🎉',
        `Your wallet has been topped up with ₦${parseFloat(topUpAmount).toLocaleString()} successfully.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 3000);
  };

  const getPaymentMethodInfo = () => {
    return paymentMethods.find(method => method.id === paymentMethod);
  };

  const calculateFee = () => {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount)) return 0;
    
    const method = getPaymentMethodInfo();
    if (!method) return 0;
    
    if (method.id === 'card') {
      return amount * 0.015; // 1.5%
    } else if (method.id === 'bank') {
      return 50;
    } else if (method.id === 'ussd') {
      return 25;
    }
    return 0;
  };

  const formatAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) ? '0' : numAmount.toLocaleString();
  };

  const isAmountValid = topUpAmount && parseFloat(topUpAmount) >= 100;
  const fee = calculateFee();
  const totalAmount = parseFloat(topUpAmount) + fee;

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
            <Text style={styles.headerTitle}>Top Up Wallet</Text>
            <Text style={styles.headerSubtitle}>Add money to your wallet</Text>
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
          {/* Current Balance */}
          <Animated.View 
            style={[
              styles.balanceCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceTitle}>Current Balance</Text>
              <Icon name="account-balance-wallet" size={24} color={colors.metallicGold} />
            </View>
            <Text style={styles.balanceAmount}>₦10,000.00</Text>
            <Text style={styles.balanceSubtitle}>Available for contributions</Text>
          </Animated.View>

          {/* Amount Input Section */}
          <Animated.View 
            style={[
              styles.amountSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Top-Up Amount</Text>
            
            <View style={styles.amountContainer}>
              <Animated.View 
                style={[
                  styles.amountInputWrapper,
                  {
                    transform: [{ scale: scaleAnim }],
                    borderColor: isInputFocused 
                      ? colors.metallicGold 
                      : isAmountValid 
                        ? colors.emeraldGreen 
                        : 'rgba(212, 175, 55, 0.3)',
                  },
                ]}
              >
                <Text style={styles.currencySymbol}>₦</Text>
                <TextInput
                  style={styles.amountInput}
                  value={topUpAmount}
                  onChangeText={handleAmountChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="0.00"
                  placeholderTextColor="rgba(248, 248, 248, 0.5)"
                  keyboardType="numeric"
                  autoFocus
                />
                <View style={styles.inputGlow} />
              </Animated.View>
              
              {isAmountValid && (
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

            {/* Quick Amount Buttons */}
            <View style={styles.quickAmounts}>
              {[1000, 2500, 5000, 10000, 25000, 50000].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={styles.quickAmountButton}
                  onPress={() => handleQuickAmount(amount)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.quickAmountText}>₦{amount.toLocaleString()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Payment Method Selection */}
          <Animated.View 
            style={[
              styles.paymentMethodSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethodCard,
                  paymentMethod === method.id && styles.paymentMethodCardActive
                ]}
                onPress={() => handlePaymentMethodSelect(method.id)}
                activeOpacity={0.8}
              >
                <View style={styles.paymentMethodInfo}>
                  <View style={styles.paymentMethodIcon}>
                    <Icon name={method.icon} size={24} color={colors.metallicGold} />
                    <View style={styles.iconGlow} />
                  </View>
                  <View style={styles.paymentMethodDetails}>
                    <Text style={styles.paymentMethodName}>{method.name}</Text>
                    <Text style={styles.paymentMethodDescription}>{method.description}</Text>
                    <Text style={styles.paymentMethodFee}>Fee: {method.fee}</Text>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  paymentMethod === method.id && styles.radioButtonActive
                ]}>
                  {paymentMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Top-Up Summary */}
          <Animated.View 
            style={[
              styles.summarySection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Top-Up Summary</Text>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Top-Up Amount</Text>
                <Text style={styles.summaryValue}>
                  ₦{formatAmount(topUpAmount)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Payment Method</Text>
                <Text style={styles.summaryValue}>
                  {getPaymentMethodInfo()?.name}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Processing Fee</Text>
                <Text style={styles.summaryValue}>
                  ₦{fee.toLocaleString()}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.summaryTotalLabel}>Total Charge</Text>
                <Text style={styles.summaryTotalValue}>
                  ₦{totalAmount.toLocaleString()}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Process Top-Up Button */}
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
                styles.processButton,
                (!isAmountValid || isProcessing) && styles.processButtonDisabled
              ]}
              onPress={handleProcessTopUp}
              disabled={!isAmountValid || isProcessing}
              activeOpacity={0.8}
            >
              <View style={styles.buttonShine} />
              {isProcessing ? (
                <View style={styles.loadingContainer}>
                  <Icon name="refresh" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Processing Top-Up...</Text>
                </View>
              ) : (
                <>
                  <Icon name="add-circle" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Top Up Wallet</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.disclaimerText}>
              Your top-up will be processed securely. You'll receive a confirmation once completed.
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
  balanceCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  balanceTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  balanceAmount: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: '700',
    color: colors.metallicGold,
    marginBottom: theme.spacing.xs,
  },
  balanceSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
  },
  amountSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.md,
  },
  amountContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
  currencySymbol: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.metallicGold,
    marginRight: theme.spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.matteWhite,
    textAlign: 'center',
  },
  validIndicator: {
    position: 'absolute',
    right: theme.spacing.md,
    top: '50%',
    marginTop: -10,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    marginBottom: theme.spacing.sm,
    width: '30%',
  },
  quickAmountText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: colors.metallicGold,
    textAlign: 'center',
  },
  paymentMethodSection: {
    marginBottom: theme.spacing.lg,
  },
  paymentMethodCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  paymentMethodCardActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    borderRadius: 26,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.xs,
  },
  paymentMethodDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginBottom: 2,
  },
  paymentMethodFee: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.metallicGold,
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.slateGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: colors.metallicGold,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.metallicGold,
  },
  summarySection: {
    marginBottom: theme.spacing.lg,
  },
  summaryCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.typography.fontSize.md,
    color: colors.slateGray,
  },
  summaryValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.1)',
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  summaryTotalLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: colors.metallicGold,
  },
  summaryTotalValue: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: colors.metallicGold,
  },
  actionSection: {
    alignItems: 'center',
  },
  processButton: {
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
  processButtonDisabled: {
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

export default TopUpScreen;
