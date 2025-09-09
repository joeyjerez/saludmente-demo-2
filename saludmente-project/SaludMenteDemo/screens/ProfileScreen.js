import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import {
  Title,
  Text,
  Card,
  List,
  Divider,
  Switch,
  Avatar,
  Button,
} from "react-native-paper";
import { colors } from "../theme/colors";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const userInfo = {
    name: "Usuario",
    email: "usuario@saludmente.com",
    memberSince: "Enero 2025",
    completedActivities: 25,
    streak: 7,
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
        <Card
          style={[styles.statCard, { backgroundColor: colors.primary + "20" }]}
        >
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>
              {userInfo.completedActivities}
            </Text>
            <Text style={styles.statLabel}>Actividades Completadas</Text>
          </Card.Content>
        </Card>

        <Card
          style={[styles.statCard, { backgroundColor: colors.success + "20" }]}
        >
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
            left={() => (
              <List.Icon icon="calendar-clock" color={colors.diary} />
            )}
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
            left={() => (
              <List.Icon icon="volume-high" color={colors.education} />
            )}
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
            left={() => (
              <List.Icon icon="account-edit" color={colors.routines} />
            )}
            right={() => (
              <List.Icon icon="chevron-right" color={colors.text.secondary} />
            )}
            onPress={() => {
              /* Navegar a editar perfil */
            }}
          />

          <Divider />

          <List.Item
            title="Cambiar Contraseña"
            description="Actualizar tu contraseña de acceso"
            left={() => <List.Icon icon="lock" color={colors.relaxation} />}
            right={() => (
              <List.Icon icon="chevron-right" color={colors.text.secondary} />
            )}
            onPress={() => {
              /* Navegar a cambiar contraseña */
            }}
          />

          <Divider />

          <List.Item
            title="Privacidad"
            description="Configuración de datos y privacidad"
            left={() => (
              <List.Icon icon="shield-account" color={colors.chatbot} />
            )}
            right={() => (
              <List.Icon icon="chevron-right" color={colors.text.secondary} />
            )}
            onPress={() => {
              /* Navegar a privacidad */
            }}
          />
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          mode="outlined"
          onPress={() => {
            /* Exportar datos */
          }}
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
    alignItems: "center",
    paddingHorizontal: isSmallScreen ? 20 : isTablet ? 40 : 30,
    paddingVertical: isTablet ? 35 : isSmallScreen ? 25 : 30,
    marginBottom: isTablet ? 25 : 20,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: isTablet ? 20 : 15,
  },
  userName: {
    fontSize: isTablet ? 28 : isSmallScreen ? 20 : 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: isTablet ? 8 : 5,
  },
  userEmail: {
    fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
    color: colors.text.secondary,
    marginBottom: isTablet ? 12 : 10,
  },
  memberSince: {
    fontSize: isTablet ? 16 : isSmallScreen ? 12 : 14,
    color: colors.text.secondary,
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: isSmallScreen ? "column" : "row",
    paddingHorizontal: isSmallScreen ? 12 : isTablet ? 20 : 15,
    marginBottom: isTablet ? 25 : 20,
    gap: isTablet ? 15 : 10,
  },
  statCard: {
    flex: isSmallScreen ? 0 : 1,
    elevation: Platform.OS === "android" ? 2 : 0,
    shadowColor: Platform.OS === "ios" ? "#000" : undefined,
    shadowOffset: Platform.OS === "ios" ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === "ios" ? 0.1 : undefined,
    shadowRadius: Platform.OS === "ios" ? 2 : undefined,
    borderRadius: isTablet ? 15 : 12,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: isTablet ? 15 : 10,
  },
  statNumber: {
    fontSize: isTablet ? 28 : isSmallScreen ? 20 : 24,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: isTablet ? 14 : isSmallScreen ? 10 : 12,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: isTablet ? 8 : 5,
    lineHeight: isTablet ? 18 : isSmallScreen ? 14 : 16,
  },
  optionsCard: {
    marginHorizontal: isSmallScreen ? 12 : isTablet ? 20 : 15,
    marginBottom: isTablet ? 20 : 15,
    elevation: Platform.OS === "android" ? 2 : 0,
    shadowColor: Platform.OS === "ios" ? "#000" : undefined,
    shadowOffset: Platform.OS === "ios" ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === "ios" ? 0.1 : undefined,
    shadowRadius: Platform.OS === "ios" ? 2 : undefined,
    borderRadius: isTablet ? 15 : 12,
  },
  sectionTitle: {
    fontSize: isTablet ? 20 : isSmallScreen ? 16 : 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: isTablet ? 15 : 10,
  },
  actionButtons: {
    paddingHorizontal: isSmallScreen ? 12 : isTablet ? 20 : 15,
    paddingBottom: isTablet ? 40 : 30,
    gap: isTablet ? 20 : 15,
  },
  actionButton: {
    borderRadius: isTablet ? 30 : 25,
    paddingVertical: isTablet ? 8 : 5,
    minHeight: isTablet ? 50 : 45,
  },
});
