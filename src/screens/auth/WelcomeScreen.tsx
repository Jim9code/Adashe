/**
 * Welcome Screen
 * Stunning animated entrance with luxury design
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, theme } from '../../constants/theme';
import { AuthStackParamList } from '../../types';

const { width, height } = Dimensions.get('window');

type WelcomeScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const logoScaleAnim = new Animated.Value(0.3);
  const logoOpacityAnim = new Animated.Value(0);
  const logoAccentAnim = new Animated.Value(0);
  const buttonScaleAnim = new Animated.Value(0);

  useEffect(() => {
    // Entrance animation sequence
    Animated.sequence([
      // Logo elegant entrance
      Animated.parallel([
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
      ]),
      // Logo accent line animation
      Animated.timing(logoAccentAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Content fade in
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
      ]),
      // Button scale in
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const logoAccentScale = logoAccentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleGetStarted = () => {
    Animated.timing(buttonScaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      navigation.navigate('Signup');
    });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.charcoalGray} />
      
      {/* Background Gradient Effect */}
      <View style={styles.backgroundGradient} />
      
      {/* Floating Elements */}
      <View style={styles.floatingElements}>
        <View style={[styles.floatingCircle, styles.circle1]} />
        <View style={[styles.floatingCircle, styles.circle2]} />
        <View style={[styles.floatingCircle, styles.circle3]} />
      </View>

      {/* Header with Logo */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: logoOpacityAnim,
            transform: [{ scale: logoScaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Adashe</Text>
          <Animated.View 
            style={[
              styles.logoAccent,
              {
                transform: [{ scaleX: logoAccentScale }],
              },
            ]}
          />
        </View>
        <Text style={styles.subtitle}>Digital Rotating Savings</Text>
        <Text style={styles.tagline}>Where Trust Meets Technology</Text>
      </Animated.View>

      {/* Main Content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>🛡️</Text>
          </View>
          <Text style={styles.featureTitle}>Secure Group Savings</Text>
          <Text style={styles.featureDescription}>
            Join trusted groups and save together with transparent, automated payouts.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>💳</Text>
          </View>
          <Text style={styles.featureTitle}>Digital Payments</Text>
          <Text style={styles.featureDescription}>
            Seamless contributions and payouts through secure payment integration.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>📊</Text>
          </View>
          <Text style={styles.featureTitle}>Trust & Transparency</Text>
          <Text style={styles.featureDescription}>
            Clear payout schedules and fair default handling for peace of mind.
          </Text>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View 
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: buttonScaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <View style={styles.buttonGlow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Already have an account?</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoalGray,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.charcoalGray,
    opacity: 0.95,
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.1,
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
    top: height * 0.3,
    right: -50,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.metallicGold,
    textShadowColor: 'rgba(212, 175, 55, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  logoAccent: {
    position: 'absolute',
    bottom: -10,
    width: 60,
    height: 4,
    backgroundColor: colors.metallicGold,
    borderRadius: 2,
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 20,
    color: colors.matteWhite,
    fontWeight: '300',
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: colors.slateGray,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  featureCard: {
    backgroundColor: 'rgba(248, 248, 248, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    ...theme.shadows.lg,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.matteWhite,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    color: colors.slateGray,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  primaryButton: {
    backgroundColor: colors.metallicGold,
    ...theme.shadows.md,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.metallicGold,
  },
  primaryButtonText: {
    color: colors.charcoalGray,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: colors.metallicGold,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;