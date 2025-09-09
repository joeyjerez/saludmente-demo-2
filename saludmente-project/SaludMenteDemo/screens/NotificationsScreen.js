import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, List, Divider } from 'react-native-paper';
import { colors } from '../theme/colors';

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
    padding: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 5,
  },
  notificationsContainer: {
    paddingHorizontal: 15,
  },
  notificationCard: {
    marginBottom: 10,
    elevation: 2,
    borderRadius: 12,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  notificationIcon: {
    marginTop: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 20,
  },
});