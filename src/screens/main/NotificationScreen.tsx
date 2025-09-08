/**
 * Notification Screen
 * Luxury notification center with categorized notifications and interactive elements
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface Notification {
  id: string;
  type: 'payment' | 'group' | 'system' | 'security' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
}

interface NotificationScreenProps {
  navigation: any;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received ₦5,000 from John Doe in "Family Savings" group',
      timestamp: '2 minutes ago',
      isRead: false,
      priority: 'high',
      actionRequired: false,
    },
    {
      id: '2',
      type: 'group',
      title: 'New Group Invitation',
      message: 'Sarah invited you to join "Business Investment" group',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'medium',
      actionRequired: true,
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Payment Due Soon',
      message: 'Your monthly contribution of ₦2,500 is due in 2 days',
      timestamp: '3 hours ago',
      isRead: true,
      priority: 'medium',
      actionRequired: true,
    },
    {
      id: '4',
      type: 'system',
      title: 'App Update Available',
      message: 'New features and improvements are ready to download',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'low',
      actionRequired: false,
    },
    {
      id: '5',
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from a different device',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'high',
      actionRequired: true,
    },
    {
      id: '6',
      type: 'group',
      title: 'Group Goal Reached',
      message: 'Congratulations! "Vacation Fund" group has reached its target',
      timestamp: '3 days ago',
      isRead: true,
      priority: 'medium',
      actionRequired: false,
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
    ]).start();

    // Pulse animation for unread indicator
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return 'account-balance-wallet';
      case 'group':
        return 'group';
      case 'system':
        return 'system-update';
      case 'security':
        return 'security';
      case 'reminder':
        return 'schedule';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return colors.emeraldGreen;
    if (type === 'security') return '#FF6B6B';
    if (type === 'payment') return colors.emeraldGreen;
    return colors.metallicGold;
  };

  const handleNotificationPress = (notification: Notification) => {
    // Handle notification press logic
    console.log('Notification pressed:', notification.id);
  };

  const handleMarkAllRead = () => {
    // Handle mark all as read logic
    console.log('Mark all as read');
  };

  const handleClearAll = () => {
    // Handle clear all notifications logic
    console.log('Clear all notifications');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <Animated.View 
                style={[
                  styles.unreadBadge,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <Text style={styles.unreadText}>{unreadCount}</Text>
              </Animated.View>
            )}
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleMarkAllRead}
            activeOpacity={0.8}
          >
            <Icon name="done-all" size={20} color={colors.metallicGold} />
            <View style={styles.actionGlow} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleClearAll}
            activeOpacity={0.8}
          >
            <Icon name="clear-all" size={20} color={colors.metallicGold} />
            <View style={styles.actionGlow} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Notifications List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {notifications.map((notification, index) => (
          <Animated.View
            key={notification.id}
            style={[
              styles.notificationCard,
              {
                opacity: fadeAnim,
                transform: [
                  { 
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30 + (index * 10)],
                    })
                  }
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.notificationItem,
                !notification.isRead && styles.unreadNotification
              ]}
              onPress={() => handleNotificationPress(notification)}
              activeOpacity={0.8}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationIconContainer}>
                  <View style={[
                    styles.notificationIcon,
                    { backgroundColor: getNotificationColor(notification.type, notification.priority) + '20' }
                  ]}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={20} 
                      color={getNotificationColor(notification.type, notification.priority)} 
                    />
                    <View style={styles.iconGlow} />
                  </View>
                  {!notification.isRead && (
                    <View style={styles.unreadDot} />
                  )}
                </View>
                
                <View style={styles.notificationDetails}>
                  <View style={styles.notificationHeader}>
                    <Text style={[
                      styles.notificationTitle,
                      !notification.isRead && styles.unreadTitle
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.timestamp}
                    </Text>
                  </View>
                  
                  <Text style={[
                    styles.notificationMessage,
                    !notification.isRead && styles.unreadMessage
                  ]}>
                    {notification.message}
                  </Text>
                  
                  {notification.actionRequired && (
                    <View style={styles.actionRequiredBadge}>
                      <Icon name="priority-high" size={12} color={colors.emeraldGreen} />
                      <Text style={styles.actionRequiredText}>Action Required</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <View style={styles.notificationShine} />
            </TouchableOpacity>
          </Animated.View>
        ))}
        
        {/* Empty State */}
        {notifications.length === 0 && (
          <Animated.View 
            style={[
              styles.emptyState,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.emptyStateIcon}>
              <Icon name="notifications-none" size={48} color={colors.slateGray} />
            </View>
            <Text style={styles.emptyStateTitle}>No Notifications</Text>
            <Text style={styles.emptyStateSubtitle}>
              You're all caught up! New notifications will appear here.
            </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: colors.matteWhite,
    marginRight: theme.spacing.sm,
  },
  unreadBadge: {
    backgroundColor: colors.emeraldGreen,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.matteWhite,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
    position: 'relative',
  },
  actionGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 19,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  notificationCard: {
    marginBottom: theme.spacing.md,
  },
  notificationItem: {
    backgroundColor: 'rgba(248, 248, 248, 0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  unreadNotification: {
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIconContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    zIndex: -1,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.emeraldGreen,
    borderWidth: 2,
    borderColor: colors.charcoalGray,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  notificationTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600',
    color: colors.matteWhite,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  unreadTitle: {
    fontWeight: '700',
    color: colors.metallicGold,
  },
  notificationTime: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.slateGray,
    fontWeight: '500',
  },
  notificationMessage: {
    fontSize: theme.typography.fontSize.sm,
    color: colors.matteWhite,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  unreadMessage: {
    opacity: 1,
    color: colors.matteWhite,
  },
  actionRequiredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(80, 200, 120, 0.1)',
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  actionRequiredText: {
    fontSize: theme.typography.fontSize.xs,
    color: colors.emeraldGreen,
    fontWeight: '600',
    marginLeft: 4,
  },
  notificationShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(110, 110, 110, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: colors.matteWhite,
    marginBottom: theme.spacing.sm,
  },
  emptyStateSubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: colors.slateGray,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default NotificationScreen;
