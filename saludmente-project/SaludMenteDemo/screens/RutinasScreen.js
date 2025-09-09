import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, Checkbox, Button, ProgressBar } from 'react-native-paper';
import { colors } from '../theme/colors';

export default function RutinasScreen() {
  const [rutinas, setRutinas] = useState([]);
  const [completedToday, setCompletedToday] = useState({});

  const rutinasDefault = [
    {
      id: 1,
      title: 'Meditación matutina',
      description: '10 minutos de meditación al despertar',
      category: 'Mindfulness',
      time: '10 min',
      icon: '🧘‍♀️',
      color: colors.relaxation
    },
    {
      id: 2,
      title: 'Ejercicio físico',
      description: 'Actividad física por al menos 30 minutos',
      category: 'Salud Física',
      time: '30 min',
      icon: '🏃‍♂️',
      color: colors.diary
    },
    {
      id: 3,
      title: 'Gratitud diaria',
      description: 'Escribir 3 cosas por las que estoy agradecido',
      category: 'Bienestar Emocional',
      time: '5 min',
      icon: '🙏',
      color: colors.education
    },
    {
      id: 4,
      title: 'Lectura relajante',
      description: 'Leer un libro o artículo inspirador',
      category: 'Crecimiento Personal',
      time: '20 min',
      icon: '📚',
      color: colors.routines
    },
    {
      id: 5,
      title: 'Conexión social',
      description: 'Llamar o escribir a un ser querido',
      category: 'Relaciones',
      time: '15 min',
      icon: '💬',
      color: colors.chatbot
    },
    {
      id: 6,
      title: 'Tiempo sin pantallas',
      description: 'Desconectarse de dispositivos por 1 hora',
      category: 'Descanso Mental',
      time: '60 min',
      icon: '📵',
      color: colors.primary
    },
    {
      id: 7,
      title: 'Respiración profunda',
      description: 'Ejercicios de respiración antes de dormir',
      category: 'Relajación',
      time: '10 min',
      icon: '🌬️',
      color: colors.relaxation
    },
    {
      id: 8,
      title: 'Organizar espacio',
      description: 'Mantener ordenado mi espacio personal',
      category: 'Ambiente',
      time: '15 min',
      icon: '🏠',
      color: colors.diary
    }
  ];

  useEffect(() => {
    initializeRutinas();
  }, []);

  const initializeRutinas = () => {
    setRutinas(rutinasDefault);
  };

  const toggleRutina = (rutinaId) => {
    const newCompleted = {
      ...completedToday,
      [rutinaId]: !completedToday[rutinaId]
    };
    setCompletedToday(newCompleted);
  };

  const resetRutinas = () => {
    setCompletedToday({});
  };

  const getProgress = () => {
    const completed = Object.values(completedToday).filter(Boolean).length;
    return completed / rutinas.length;
  };

  const getCompletedCount = () => {
    return Object.values(completedToday).filter(Boolean).length;
  };

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
        <Title style={styles.headerTitle}>Rutinas de Autocuidado</Title>
        <Text style={styles.headerSubtitle}>
          Construye hábitos saludables día a día
        </Text>
        
        <Card style={styles.progressCard}>
          <Card.Content>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Progreso de Hoy</Text>
              <Text style={styles.progressCount}>
                {getCompletedCount()}/{rutinas.length}
              </Text>
            </View>
            <ProgressBar 
              progress={getProgress()} 
              color={colors.education} 
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>
              {Math.round(getProgress() * 100)}% completado
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.rutinasContainer}>
        {rutinas.map((rutina) => {
          const isCompleted = completedToday[rutina.id] || false;
          return (
            <Card 
              key={rutina.id} 
              style={[
                styles.rutinaCard, 
                { backgroundColor: colors.surfaceDark },
                isCompleted && styles.completedCard
              ]}
            >
              <Card.Content>
                <View style={styles.rutinaHeader}>
                  <View style={styles.rutinaInfo}>
                    <View style={styles.rutinaTitle}>
                      <Text style={styles.rutinaIcon}>{rutina.icon}</Text>
                      <View style={styles.rutinaTitleText}>
                        <Title style={[
                          styles.title, 
                          { color: isCompleted ? colors.text.secondary : colors.text.white },
                          isCompleted && styles.completedTitle
                        ]}>
                          {rutina.title}
                        </Title>
                        <Text style={[styles.category, { color: rutina.color }]}>
                          {rutina.category}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.description, { color: colors.text.light }]}>{rutina.description}</Text>
                    <Text style={[styles.time, { color: colors.text.light }]}>⏱️ {rutina.time}</Text>
                  </View>
                  <Checkbox
                    status={isCompleted ? 'checked' : 'unchecked'}
                    onPress={() => toggleRutina(rutina.id)}
                    color={rutina.color}
                  />
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </View>

      <View style={styles.actions}>
        <Button 
          mode="outlined" 
          onPress={resetRutinas}
          style={[styles.resetButton, { borderColor: colors.error }]}
          textColor={colors.error}
          icon="refresh"
        >
          Reiniciar Día
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
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    padding: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  progressCard: {
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  progressCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.education,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: 14,
  },
  rutinasContainer: {
    padding: 10,
  },
  rutinaCard: {
    marginVertical: 5,
    elevation: 3,
    borderRadius: 12,
  },
  completedCard: {
    opacity: 0.7,
  },
  rutinaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rutinaInfo: {
    flex: 1,
    paddingRight: 10,
  },
  rutinaTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rutinaIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  rutinaTitleText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
  },
  actions: {
    padding: 20,
    alignItems: 'center',
  },
  resetButton: {
    borderWidth: 1,
  },
});