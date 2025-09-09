import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Title, 
  Text, 
  Card, 
  List, 
  Divider, 
  Switch, 
  Avatar,
  Button
} from 'react-native-paper';
import { colors } from '../theme/colors';

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const userInfo = {
    name: 'Usuario',
    email: 'usuario@saludmente.com',
    memberSince: 'Enero 2024',
    completedActivities: 25,
    streak: 7
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Avatar.Icon 
          size={80} 
          icon="account" 
          style={styles.avatar}
          color={colors.text.white}
        />
        <Title style={styles.userName}>{userInfo.name}</Title>
        <Text style={styles.userEmail}>{userInfo.email}</Text>
        <Text style={styles.memberSince}>
          Miembro desde {userInfo.memberSince}
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={[styles.statCard, { backgroundColor: colors.primary + '20' }]}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>{userInfo.completedActivities}</Text>
            <Text style={styles.statLabel}>Actividades Completadas</Text>
          </Card.Content>
        </Card>
        
        <Card style={[styles.statCard, { backgroundColor: colors.success + '20' }]}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>{userInfo.streak}</Text>
            <Text style={styles.statLabel}>Días Consecutivos</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Profile Options */}
      <Card style={styles.optionsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Configuración</Title>
          
          <List.Item
            title="Notificaciones"
            description="Recibir alertas y recordatorios"
            left={() => <List.Icon icon="bell" color={colors.primary} />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Recordatorios Diarios"
            description="Notificaciones para escribir en el diario"
            left={() => <List.Icon icon="calendar-clock" color={colors.diary} />}
            right={() => (
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                color={colors.primary}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Sonidos"
            description="Reproducir sonidos en las notificaciones"
            left={() => <List.Icon icon="volume-high" color={colors.education} />}
            right={() => (
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                color={colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Account Options */}
      <Card style={styles.optionsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Cuenta</Title>
          
          <List.Item
            title="Editar Información Personal"
            description="Actualizar nombre, email y más"
            left={() => <List.Icon icon="account-edit" color={colors.routines} />}
            right={() => <List.Icon icon="chevron-right" color={colors.text.secondary} />}
            onPress={() => {/* Navegar a editar perfil */}}
          />
          
          <Divider />
          
          <List.Item
            title="Cambiar Contraseña"
            description="Actualizar tu contraseña de acceso"
            left={() => <List.Icon icon="lock" color={colors.relaxation} />}
            right={() => <List.Icon icon="chevron-right" color={colors.text.secondary} />}
            onPress={() => {/* Navegar a cambiar contraseña */}}
          />
          
          <Divider />
          
          <List.Item
            title="Privacidad"
            description="Configuración de datos y privacidad"
            left={() => <List.Icon icon="shield-account" color={colors.chatbot} />}
            right={() => <List.Icon icon="chevron-right" color={colors.text.secondary} />}
            onPress={() => {/* Navegar a privacidad */}}
          />
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          mode="outlined"
          onPress={() => {/* Exportar datos */}}
          style={styles.actionButton}
          icon="export"
        >
          Exportar Mis Datos
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          icon="check"
        >
          Guardar Cambios
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    padding: 30,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 10,
  },
  memberSince: {
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    elevation: 2,
    borderRadius: 12,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 5,
  },
  optionsCard: {
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 10,
  },
  actionButtons: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    gap: 15,
  },
  actionButton: {
    borderRadius: 25,
    paddingVertical: 5,
  },
});