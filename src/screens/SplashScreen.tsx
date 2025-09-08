/**
 * Splash Screen
 * Luxury animated splash with premium design
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const logoAccentAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // Logo elegant entrance
      Animated.parallel([
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
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
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Simulate loading time
    const timer = setTimeout(() => {
      // Navigation will be handled by AppNavigator based on auth state
    }, 3000);

    return () => {
      clearTimeout(timer);
      pulseAnimation.stop();
    };
  }, []);

  const logoAccentScale = logoAccentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.charcoalGray} />
      
      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
        <View style={[styles.gradientCircle, styles.circle3]} />
      </View>

      {/* Main Content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Container */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacityAnim,
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <View style={styles.logoBackground}>
            <Text style={styles.logoText}>Adashe</Text>
          </View>
          <Animated.View 
            style={[
              styles.logoAccent,
              {
                transform: [{ scaleX: logoAccentScale }],
              },
            ]}
          />
        </Animated.View>

        <Text style={styles.tagline}>Digital Rotating Savings</Text>
        <Text style={styles.subtitle}>Where Trust Meets Technology</Text>
      </Animated.View>

      {/* Loading Indicator */}
      <Animated.View 
        style={[
          styles.loadingContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.metallicGold} />
        <Text style={styles.loadingText}>Initializing...</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoalGray,
    justifyContent: 'center',
    alignItems: 'center',
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
    opacity: 0.1,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: colors.metallicGold,
    top: -150,
    right: -150,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: colors.softChampagne,
    bottom: -100,
    left: -100,
  },
  circle3: {
    width: 150,
    height: 150,
    backgroundColor: colors.emeraldGreen,
    top: height * 0.4,
    right: -75,
  },
  content: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.metallicGold,
    textShadowColor: 'rgba(212, 175, 55, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoAccent: {
    position: 'absolute',
    bottom: -15,
    width: 80,
    height: 4,
    backgroundColor: colors.metallicGold,
    borderRadius: 2,
    opacity: 0.8,
  },
  tagline: {
    fontSize: 20,
    color: colors.matteWhite,
    fontWeight: '300',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.slateGray,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
  },
  loadingText: {
    color: colors.matteWhite,
    marginTop: 16,
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
