import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, Button } from 'react-native-paper';
import { colors } from '../theme/colors';

export default function HomePage({ navigation }) {
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
        <Text style={styles.welcomeDescription}>
          Aquí encontrarás herramientas diseñadas para apoyarte en tu journey hacia una mejor salud mental. 
          Toma un momento para ti, explora nuestros recursos y recuerda: cada paso cuenta.
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
              onPress={() => navigation.navigate('Diario')}
              icon="book-edit"
            >
              Escribir en mi Diario
            </Button>
            <Button 
              mode="contained" 
              style={[styles.quickActionBtn, { backgroundColor: colors.relaxation }]}
              onPress={() => navigation.navigate('Relajacion')}
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
            💡 Recuerda: La respiración profunda puede reducir el estrés en solo 5 minutos. 
            Inhala durante 4 segundos, mantén durante 4, y exhala durante 6.
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
    paddingBottom: 20,
  },
  heroSection: {
    backgroundColor: colors.surface,
    padding: 30,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
  },
  welcomeDescription: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 24,
  },
  quickActionsCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 20,
    color: colors.text.primary,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'column',
    gap: 10,
  },
  quickActionBtn: {
    borderRadius: 25,
    paddingVertical: 5,
  },
  tipsCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
    borderRadius: 15,
    backgroundColor: colors.education + '15',
  },
  tipText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 22,
  },
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
    borderRadius: 15,
  },
  progressText: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});