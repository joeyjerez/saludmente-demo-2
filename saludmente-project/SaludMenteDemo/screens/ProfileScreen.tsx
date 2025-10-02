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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

interface UserInfo {
  name: string;
  email: string;
  memberSince: string;
  completedActivities: number;
  streak: number;
}

const { width } = Dimensions.get("window");
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const userInfo: UserInfo = {
    name: "Usuario",
    email: "usuario@saludmente.com",
    memberSince: "Enero 2025",
    completedActivities: 25,
    streak: 7,
  };

  return (
    <ScrollView style={styles.container}>
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

      <Card style={styles.optionsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Cuenta</Title>

          <List.Item
            title="Editar Perfil"
            description="Actualiza tu información personal"
            left={() => <List.Icon icon="account-edit" color={colors.primary} />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Cambiar Contraseña"
            description="Modifica tu contraseña de acceso"
            left={() => <List.Icon icon="lock-reset" color={colors.diary} />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Privacidad"
            description="Gestiona tu privacidad y datos"
            left={() => <List.Icon icon="shield-account" color={colors.education} />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={() => {}}
          style={styles.logoutButton}
          textColor={colors.error}
          icon="logout"
        >
          Cerrar Sesión
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
    paddingHorizontal: isSmallScreen ? 15 : (isTablet ? 30 : 20),
    paddingVertical: isTablet ? 35 : (isSmallScreen ? 25 : 30),
    alignItems: "center",
    marginBottom: isTablet ? 20 : 15,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: isTablet ? 18 : 12,
  },
  userName: {
    fontSize: isTablet ? 28 : (isSmallScreen ? 22 : 24),
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: isTablet ? 6 : 4,
  },
  userEmail: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.secondary,
    marginBottom: isTablet ? 6 : 4,
  },
  memberSince: {
    fontSize: isTablet ? 16 : (isSmallScreen ? 12 : 14),
    color: colors.text.secondary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: isSmallScreen ? 10 : (isTablet ? 20 : 15),
    marginBottom: isTablet ? 20 : 15,
  },
  statCard: {
    flex: 1,
    marginHorizontal: isSmallScreen ? 5 : (isTablet ? 10 : 8),
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 3 : undefined,
    borderRadius: isTablet ? 14 : 12,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: isTablet ? 16 : (isSmallScreen ? 10 : 12),
  },
  statNumber: {
    fontSize: isTablet ? 36 : (isSmallScreen ? 28 : 32),
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: isTablet ? 6 : 4,
  },
  statLabel: {
    fontSize: isTablet ? 16 : (isSmallScreen ? 12 : 14),
    color: colors.text.secondary,
    textAlign: "center",
  },
  optionsCard: {
    marginHorizontal: isSmallScreen ? 10 : (isTablet ? 20 : 15),
    marginBottom: isTablet ? 20 : 15,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 3 : undefined,
    borderRadius: isTablet ? 14 : 12,
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : (isSmallScreen ? 18 : 20),
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: isTablet ? 14 : 10,
  },
  logoutContainer: {
    paddingHorizontal: isSmallScreen ? 10 : (isTablet ? 20 : 15),
    paddingVertical: isTablet ? 25 : (isSmallScreen ? 15 : 20),
  },
  logoutButton: {
    borderColor: colors.error,
    borderWidth: 1.5,
    paddingVertical: isTablet ? 6 : 4,
    borderRadius: isTablet ? 12 : 10,
  },
});
