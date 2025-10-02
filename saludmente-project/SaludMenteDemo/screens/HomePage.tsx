import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, Platform } from "react-native";
import { Title, Text, Card, Button } from "react-native-paper";
import { colors } from "../theme/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Diario: undefined;
  Relajacion: undefined;
};

type HomePageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function HomePage({ navigation }: HomePageProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Title style={styles.welcomeTitle}>¡Bienvenido a SaludMente!</Title>
        <Text style={styles.welcomeSubtitle}>
          Tu compañero personal para el bienestar mental
        </Text>
      </View>

      {/* Quick Actions Card */}
      <Card style={styles.quickActionsCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Acciones Rápidas</Title>
          <View style={styles.quickActions}>
            <Button
              mode="contained"
              style={[styles.quickActionBtn, { backgroundColor: colors.diary }]}
              onPress={() => navigation.navigate("Diario")}
              icon="book-edit"
            >
              Escribir en mi Diario
            </Button>
            <Button
              mode="contained"
              style={[
                styles.quickActionBtn,
                { backgroundColor: colors.relaxation },
              ]}
              onPress={() => navigation.navigate("Relajacion")}
              icon="meditation"
            >
              Ejercicio de Relajación
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Wellness Tips Card */}
      <Card style={styles.tipsCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Tip del Día</Title>
          <Text style={styles.tipText}>
            💡 Recuerda: La respiración profunda puede reducir el estrés en solo
            5 minutos. Inhala durante 4 segundos, mantén durante 4, y exhala
            durante 6.
          </Text>
        </Card.Content>
      </Card>

      {/* Progress Overview */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Tu Progreso</Title>
          <Text style={styles.progressText}>
            Continúa explorando los módulos disponibles en el menú lateral para
            fortalecer tu bienestar mental día a día.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: isTablet ? 30 : 20,
  },
  heroSection: {
    backgroundColor: colors.surface,
    paddingHorizontal: isSmallScreen ? 15 : (isTablet ? 40 : 25),
    paddingVertical: isTablet ? 35 : (isSmallScreen ? 20 : 25),
    marginBottom: isTablet ? 25 : 15,
    borderBottomLeftRadius: isTablet ? 25 : 15,
    borderBottomRightRadius: isTablet ? 25 : 15,
    elevation: Platform.OS === 'android' ? 3 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
  },
  welcomeTitle: {
    fontSize: isTablet ? 32 : (isSmallScreen ? 22 : 26),
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: isTablet ? 12 : 8,
    lineHeight: isTablet ? 38 : (isSmallScreen ? 28 : 32),
  },
  welcomeSubtitle: {
    fontSize: isTablet ? 20 : (isSmallScreen ? 16 : 18),
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: isTablet ? 18 : 12,
    fontWeight: "500",
    lineHeight: isTablet ? 26 : (isSmallScreen ? 22 : 24),
  },
  welcomeDescription: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.primary,
    textAlign: "center",
    lineHeight: isTablet ? 26 : (isSmallScreen ? 20 : 24),
    paddingHorizontal: isSmallScreen ? 0 : 10,
  },
  quickActionsCard: {
    marginHorizontal: isSmallScreen ? 15 : (isTablet ? 30 : 20),
    marginBottom: isTablet ? 20 : 12,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 3 : undefined,
    borderRadius: isTablet ? 18 : 12,
  },
  cardTitle: {
    fontSize: isTablet ? 22 : (isSmallScreen ? 18 : 20),
    color: colors.text.primary,
    marginBottom: isTablet ? 18 : 12,
    fontWeight: "bold",
  },
  quickActions: {
    flexDirection: "column",
    gap: isTablet ? 15 : 10,
  },
  quickActionBtn: {
    borderRadius: isTablet ? 30 : 25,
    paddingVertical: isTablet ? 8 : 5,
    minHeight: isTablet ? 50 : 45,
  },
  tipsCard: {
    marginHorizontal: isSmallScreen ? 15 : (isTablet ? 30 : 20),
    marginBottom: isTablet ? 20 : 12,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 3 : undefined,
    borderRadius: isTablet ? 18 : 12,
    backgroundColor: colors.education + "15",
  },
  tipText: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.primary,
    lineHeight: isTablet ? 26 : (isSmallScreen ? 20 : 22),
  },
  progressCard: {
    marginHorizontal: isSmallScreen ? 15 : (isTablet ? 30 : 20),
    marginBottom: isTablet ? 20 : 12,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 1 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 3 : undefined,
    borderRadius: isTablet ? 18 : 12,
  },
  progressText: {
    fontSize: isTablet ? 18 : (isSmallScreen ? 14 : 16),
    color: colors.text.secondary,
    lineHeight: isTablet ? 26 : (isSmallScreen ? 20 : 22),
  },
});
