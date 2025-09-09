import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Card, Button, Text } from 'react-native-paper';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const menuItems = [
    {
      title: 'Diario Emocional',
      description: 'Registra tus emociones y pensamientos diarios',
      icon: 'book-edit',
      screen: 'Diario',
      color: colors.diary
    },
    {
      title: 'Cápsulas Educativas',
      description: 'Aprende sobre salud mental y bienestar',
      icon: 'school',
      screen: 'Capsulas',
      color: colors.education
    },
    {
      title: 'Rutinas de Autocuidado',
      description: 'Mantén hábitos saludables para tu bienestar',
      icon: 'heart-pulse',
      screen: 'Rutinas',
      color: colors.routines
    },
    {
      title: 'Ejercicios de Relajación',
      description: 'Técnicas de respiración y mindfulness',
      icon: 'meditation',
      screen: 'Relajacion',
      color: colors.relaxation
    },
    {
      title: 'Chatbot Empático',
      description: 'Conversación de apoyo sobre ansiedad',
      icon: 'robot',
      screen: 'Chatbot',
      color: colors.chatbot
    }
  ];

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      nestedScrollEnabled={true}
      overScrollMode="always"
      alwaysBounceVertical={false}
    >
      <View style={styles.header}>
        <Title style={styles.title}>¡Bienvenido a SaludMente!</Title>
        <Text style={styles.subtitle}>
          Tu espacio seguro para el cuidado de la salud mental
        </Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Card key={index} style={[styles.card, { backgroundColor: colors.surfaceDark }]}>
            <Card.Content>
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Title style={[styles.cardTitle, { color: colors.text.white }]}>{item.title}</Title>
                  <Text style={[styles.cardDescription, { color: colors.text.light }]}>{item.description}</Text>
                </View>
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate(item.screen)}
                  style={[styles.button, { backgroundColor: item.color }]}
                  labelStyle={{ color: colors.text.white }}
                  compact
                >
                  Abrir
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.surface,
    marginBottom: 10,
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
  menuContainer: {
    padding: 10,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 5,
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
  },
  button: {
    borderRadius: 20,
  },
});