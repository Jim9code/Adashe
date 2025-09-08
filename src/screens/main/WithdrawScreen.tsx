/**
 * Withdraw Screen
 * Luxury wallet withdrawal interface with multiple withdrawal methods
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

interface WithdrawScreenProps {
  navigation: any;
}

const WithdrawScreen: React.FC<WithdrawScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const inputFocusAnim = useRef(new Animated.Value(0)).current;

  // State
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'card' | 'ussd'>('bank');
  const [bankAccount, setBankAccount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Sample withdrawal methods
  const withdrawalMethods = [
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'account-balance',
      description: 'Transfer to your bank account',
      fee: '₦50',
      processingTime: '1-3 hours',
      available: true,
    },
    {
      id: 'card',
      name: 'Debit Card',
      icon: 'credit-card',
      description: 'Withdraw to linked card',
      fee: '₦25',
      processingTime: 'Instant',
      available: true,
    },
    {
      id: 'ussd',
      name: 'USSD',
      icon: 'phone-android',
      description: 'Mobile banking withdrawal',
      fee: '₦15',
      processingTime: 'Instant',
      available: true,
    },
  ];

  // Sample bank accounts
  const bankAccounts = [
    {
      id: '1',
      bankName: 'Access Bank',
      accountNumber: '1234567890',
      accountName: 'John Doe',
      isDefault: true,
    },
    {
      id: '2',
      bankName: 'GTBank',
      accountNumber: '0987654321',
      accountName: 'John Doe',
      isDefault: false,
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
    setWithdrawAmount(cleanText);
  };

  const handleQuickAmount = (amount: number) => {
    setWithdrawAmount(amount.toString());
  };

  const handleWithdrawMethodSelect = (methodId: string) => {
    setWithdrawMethod(methodId as 'bank' | 'card' | 'ussd');
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

  const handleProcessWithdrawal = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid withdrawal amount');
      return;
    }

    if (parseFloat(withdrawAmount) < 100) {
      Alert.alert('Minimum Amount', 'Minimum withdrawal amount is ₦100');
      return;
    }

    if (parseFloat(withdrawAmount) > 10000) {
      Alert.alert('Maximum Amount', 'Maximum withdrawal amount is ₦10,000');
      return;
    }

    if (withdrawMethod === 'bank' && !bankAccount) {
      Alert.alert('Bank Account Required', 'Please select a bank account for withdrawal');
      return;
    }

    setIsProcessing(true);

    // Simulate withdrawal processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Withdrawal Successful! 🎉',
        `Your withdrawal of ₦${parseFloat(withdrawAmount).toLocaleString()} has been processed successfully.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 3000);
  };

  const getWithdrawMethodInfo = () => {
    return withdrawalMethods.find(method => method.id === withdrawMethod);
  };

  const calculateFee = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount)) return 0;
    
    const method = getWithdrawMethodInfo();
    if (!method) return 0;
    
    if (method.id === 'bank') {
      return 50;
    } else if (method.id === 'card') {
      return 25;
    } else if (method.id === 'ussd') {
      return 15;
    }
    return 0;
  };

  const formatAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) ? '0' : numAmount.toLocaleString();
  };

  const isAmountValid = withdrawAmount && parseFloat(withdrawAmount) >= 100 && parseFloat(withdrawAmount) <= 10000;
  const fee = calculateFee();
  const totalAmount = parseFloat(withdrawAmount) - fee;

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
            <Text style={styles.headerTitle}>Withdraw Funds</Text>
            <Text style={styles.headerSubtitle}>Transfer money from your wallet</Text>
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
              <Text style={styles.balanceTitle}>Available Balance</Text>
              <Icon name="account-balance-wallet" size={24} color={colors.metallicGold} />
            </View>
            <Text style={styles.balanceAmount}>₦10,000.00</Text>
            <Text style={styles.balanceSubtitle}>Ready for withdrawal</Text>
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
            <Text style={styles.sectionTitle}>Withdrawal Amount</Text>
            
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
                  value={withdrawAmount}
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
              {[1000, 2500, 5000, 10000].map((amount) => (
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

          {/* Withdrawal Method Selection */}
          <Animated.View 
            style={[
              styles.withdrawMethodSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Withdrawal Method</Text>
            
            {withdrawalMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.withdrawMethodCard,
                  withdrawMethod === method.id && styles.withdrawMethodCardActive
                ]}
                onPress={() => handleWithdrawMethodSelect(method.id)}
                activeOpacity={0.8}
              >
                <View style={styles.withdrawMethodInfo}>
                  <View style={styles.withdrawMethodIcon}>
                    <Icon name={method.icon} size={24} color={colors.metallicGold} />
                    <View style={styles.iconGlow} />
                  </View>
                  <View style={styles.withdrawMethodDetails}>
                    <Text style={styles.withdrawMethodName}>{method.name}</Text>
                    <Text style={styles.withdrawMethodDescription}>{method.description}</Text>
                    <View style={styles.withdrawMethodMeta}>
                      <Text style={styles.withdrawMethodFee}>Fee: {method.fee}</Text>
                      <Text style={styles.withdrawMethodTime}>• {method.processingTime}</Text>
                    </View>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  withdrawMethod === method.id && styles.radioButtonActive
                ]}>
                  {withdrawMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Bank Account Selection (for bank transfers) */}
          {withdrawMethod === 'bank' && (
            <Animated.View 
              style={[
                styles.bankAccountSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Select Bank Account</Text>
              
              {bankAccounts.map((account) => (
                <TouchableOpacity
                  key={account.id}
                  style={[
                    styles.bankAccountCard,
                    bankAccount === account.id && styles.bankAccountCardActive
                  ]}
                  onPress={() => setBankAccount(account.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.bankAccountInfo}>
                    <View style={styles.bankAccountIcon}>
                      <Icon name="account-balance" size={24} color={colors.metallicGold} />
                      <View style={styles.iconGlow} />
                    </View>
                    <View style={styles.bankAccountDetails}>
                      <Text style={styles.bankAccountName}>{account.bankName}</Text>
                      <Text style={styles.bankAccountNumber}>{account.accountNumber}</Text>
                      <Text style={styles.bankAccountHolder}>{account.accountName}</Text>
                      {account.isDefault && (
                        <Text style={styles.defaultBadge}>Default</Text>
                      )}
                    </View>
                  </View>
                  <View style={[
                    styles.radioButton,
                    bankAccount === account.id && styles.radioButtonActive
                  ]}>
                    {bankAccount === account.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          {/* Withdrawal Summary */}
          <Animated.View 
            style={[
              styles.summarySection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Withdrawal Summary</Text>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Withdrawal Amount</Text>
                <Text style={styles.summaryValue}>
                  ₦{formatAmount(withdrawAmount)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Withdrawal Method</Text>
                <Text style={styles.summaryValue}>
                  {getWithdrawMethodInfo()?.name}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Processing Fee</Text>
                <Text style={styles.summaryValue}>
                  -₦{fee.toLocaleString()}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.summaryTotalLabel}>You'll Receive</Text>
                <Text style={styles.summaryTotalValue}>
                  ₦{totalAmount.toLocaleString()}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Process Withdrawal Button */}
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
                (!isAmountValid || isProcessing || (withdrawMethod === 'bank' && !bankAccount)) && styles.processButtonDisabled
              ]}
              onPress={handleProcessWithdrawal}
              disabled={!isAmountValid || isProcessing || (withdrawMethod === 'bank' && !bankAccount)}
              activeOpacity={0.8}
            >
              <View style={styles.buttonShine} />
              {isProcessing ? (
                <View style={styles.loadingContainer}>
                  <Icon name="refresh" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Processing Withdrawal...</Text>
                </View>
              ) : (
                <>
                  <Icon name="account-balance-wallet" size={20} color={colors.metallicGold} />
                  <Text style={styles.buttonText}>Process Withdrawal</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.disclaimerText}>
              Your withdrawal will be processed securely. Processing time depends on the selected method.
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
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  quickAmountText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: colors.metallicGold,
  },
  withdrawMethodSection: {
    marginBottom: theme.spacing.lg,
  },
  withdrawMethodCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  withdrawMethodCardActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  withdrawMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawMethodIcon: {
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
  withdrawMethodDetails: {
    flex: 1,
  },
  withdrawMethodName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.xs,
  },
  withdrawMethodDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginBottom: 4,
  },
  withdrawMethodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawMethodFee: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.metallicGold,
    fontWeight: '500',
  },
  withdrawMethodTime: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginLeft: theme.spacing.sm,
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
  bankAccountSection: {
    marginBottom: theme.spacing.lg,
  },
  bankAccountCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  bankAccountCardActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  bankAccountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankAccountIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    position: 'relative',
  },
  bankAccountDetails: {
    flex: 1,
  },
  bankAccountName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.xs,
  },
  bankAccountNumber: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginBottom: 2,
  },
  bankAccountHolder: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    marginBottom: theme.spacing.xs,
  },
  defaultBadge: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.emeraldGreen,
    fontWeight: '600',
    backgroundColor: 'rgba(80, 200, 120, 0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
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

export default WithdrawScreen;
