import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { Title, Text, Card, List, Divider } from 'react-native-paper';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function NotificationsScreen({ navigation }) {
  const notifications = [
    {
      id: 1,
      title: 'Recordatorio de Diario',
      message: 'Es un buen momento para escribir en tu diario emocional',
      time: '2 horas atrás',
      type: 'reminder',
      read: false
    },
    {
      id: 2,
      title: 'Nueva Cápsula Educativa',
      message: 'Descubre técnicas de relajación para reducir la ansiedad',
      time: '1 día atrás',
      type: 'education',
      read: true
    },
    {
      id: 3,
      title: 'Rutina Completada',
      message: '¡Felicitaciones! Has completado tu rutina de autocuidado',
      time: '2 días atrás',
      type: 'achievement',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder':
        return 'bell-ring';
      case 'education':
        return 'school';
      case 'achievement':
        return 'trophy';
      default:
        return 'information';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'reminder':
        return colors.warning;
      case 'education':
        return colors.education;
      case 'achievement':
        return colors.success;
      default:
        return colors.info;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Notificaciones</Title>
        <Text style={styles.subtitle}>
          Mantente al día con tus actividades de bienestar
        </Text>
      </View>

      <View style={styles.notificationsContainer}>
        {notifications.map((notification, index) => (
          <Card 
            key={notification.id} 
            style={[
              styles.notificationCard,
              !notification.read && styles.unreadCard
            ]}
          >
            <Card.Content>
              <List.Item
                title={notification.title}
                description={notification.message}
                left={() => (
                  <List.Icon 
                    icon={getNotificationIcon(notification.type)}
                    color={getNotificationColor(notification.type)}
                    style={styles.notificationIcon}
                  />
                )}
                right={() => (
                  <Text style={styles.timeText}>{notification.time}</Text>
                )}
                titleStyle={[
                  styles.notificationTitle,
                  !notification.read && styles.unreadTitle
                ]}
                descriptionStyle={styles.notificationDescription}
              />
            </Card.Content>
            {index < notifications.length - 1 && <Divider />}
          </Card>
        ))}
      </View>

      {notifications.length === 0 && (
        <View style={styles.emptyState}>
          <List.Icon 
            icon="bell-outline" 
            color={colors.text.secondary} 
            size={64}
          />
          <Text style={styles.emptyText}>
            No tienes notificaciones por el momento
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: isSmallScreen ? 15 : (isTablet ? 30 : 20),
    paddingVertical: isTablet ? 25 : 20,
    marginBottom: isTablet ? 20 : 15,
  },
  title: {
    fontSize: isTablet ? 28 : (isSmallScreen ? 20 : 24),
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: isTablet ? 8 : 5,
    lineHeight: isTablet ? 24 : (isSmallScreen ? 20 : 22),
  },
  notificationsContainer: {
    paddingHorizontal: isSmallScreen ? 12 : (isTablet ? 20 : 15),
  },
  notificationCard: {
    marginBottom: isTablet ? 15 : 10,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 2 : undefined,
    borderRadius: isTablet ? 15 : 12,
  },
  unreadCard: {
    borderLeftWidth: isTablet ? 5 : 4,
    borderLeftColor: colors.primary,
  },
  notificationIcon: {
    marginTop: isTablet ? 10 : 8,
  },
  notificationTitle: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    fontWeight: '500',
    color: colors.text.primary,
    lineHeight: isTablet ? 24 : (isSmallScreen ? 20 : 22),
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: isTablet ? 16 : (isSmallScreen ? 12 : 14),
    color: colors.text.secondary,
    marginTop: isTablet ? 6 : 4,
    lineHeight: isTablet ? 22 : (isSmallScreen ? 18 : 20),
  },
  timeText: {
    fontSize: isTablet ? 14 : (isSmallScreen ? 10 : 12),
    color: colors.text.secondary,
    marginTop: isTablet ? 15 : 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: isTablet ? 80 : 60,
    paddingHorizontal: isSmallScreen ? 20 : 30,
  },
  emptyText: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: isTablet ? 25 : 20,
    lineHeight: isTablet ? 26 : (isSmallScreen ? 20 : 22),
  },
});