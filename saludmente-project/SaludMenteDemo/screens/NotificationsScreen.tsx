import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { Title, Text, Card, List, Divider } from 'react-native-paper';
import { colors } from '../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  HomePage: undefined;
  Home: undefined;
  Diario: undefined;
  Capsulas: undefined;
  Rutinas: undefined;
  Relajacion: undefined;
  Chatbot: undefined;
  Notifications: undefined;
  Profile: undefined;
};

type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notifications'>;

interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'reminder' | 'education' | 'achievement';
  read: boolean;
}

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const notifications: Notification[] = [
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

  const getNotificationIcon = (type: Notification['type']): string => {
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

  const getNotificationColor = (type: Notification['type']): string => {
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
    paddingVertical: isTablet ? 30 : (isSmallScreen ? 20 : 25),
    marginBottom: isTablet ? 18 : 12,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
  },
  title: {
    fontSize: isTablet ? 30 : (isSmallScreen ? 22 : 26),
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: isTablet ? 10 : 6,
  },
  subtitle: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  notificationsContainer: {
    paddingHorizontal: isSmallScreen ? 10 : (isTablet ? 20 : 15),
  },
  notificationCard: {
    marginBottom: isTablet ? 16 : 12,
    elevation: Platform.OS === 'android' ? 1 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 2 : undefined,
    borderRadius: isTablet ? 14 : 10,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  notificationIcon: {
    marginRight: isSmallScreen ? 8 : (isTablet ? 16 : 12),
  },
  notificationTitle: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 15 : 16),
    fontWeight: '600',
    color: colors.text.primary,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: isTablet ? 16 : (isSmallScreen ? 13 : 14),
    color: colors.text.secondary,
    marginTop: isTablet ? 6 : 4,
  },
  timeText: {
    fontSize: isTablet ? 14 : (isSmallScreen ? 11 : 12),
    color: colors.text.secondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: isTablet ? 80 : (isSmallScreen ? 50 : 60),
  },
  emptyText: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.secondary,
    marginTop: isTablet ? 20 : 15,
    textAlign: 'center',
    paddingHorizontal: isSmallScreen ? 30 : (isTablet ? 60 : 40),
  },
});
