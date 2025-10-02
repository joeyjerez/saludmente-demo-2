import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, Checkbox, Button, ProgressBar } from 'react-native-paper';
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

type RutinasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Rutinas'>;

interface RutinasScreenProps {
  navigation?: RutinasScreenNavigationProp;
}

interface Rutina {
  id: number;
  title: string;
  description: string;
  category: string;
  time: string;
  icon: string;
  color: string;
}

interface CompletedRutinas {
  [key: number]: boolean;
}

export default function RutinasScreen({ navigation }: RutinasScreenProps) {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [completedToday, setCompletedToday] = useState<CompletedRutinas>({});

  const rutinasDefault: Rutina[] = [
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

  const initializeRutinas = (): void => {
    setRutinas(rutinasDefault);
  };

  const toggleRutina = (rutinaId: number): void => {
    const newCompleted = {
      ...completedToday,
      [rutinaId]: !completedToday[rutinaId]
    };
    setCompletedToday(newCompleted);
  };

  const resetRutinas = (): void => {
    setCompletedToday({});
  };

  const getProgress = (): number => {
    const completed = Object.values(completedToday).filter(Boolean).length;
    return completed / rutinas.length;
  };

  const getCompletedCount = (): number => {
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
              color={colors.success}
              style={styles.progressBar}
            />
            <Button 
              mode="text" 
              onPress={resetRutinas}
              style={styles.resetButton}
              textColor={colors.text.secondary}
            >
              Reiniciar Día
            </Button>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.rutinasContainer}>
        {rutinas.map((rutina) => (
          <Card key={rutina.id} style={styles.rutinaCard}>
            <Card.Content>
              <View style={styles.rutinaHeader}>
                <View style={styles.rutinaIconContainer}>
                  <Text style={styles.rutinaIcon}>{rutina.icon}</Text>
                </View>
                <View style={styles.rutinaInfo}>
                  <Text style={styles.rutinaTitle}>{rutina.title}</Text>
                  <Text style={styles.rutinaDescription}>{rutina.description}</Text>
                  <View style={styles.rutinaMetadata}>
                    <Text style={[styles.rutinaCategory, { color: rutina.color }]}>
                      {rutina.category}
                    </Text>
                    <Text style={styles.rutinaTime}>{rutina.time}</Text>
                  </View>
                </View>
                <Checkbox
                  status={completedToday[rutina.id] ? 'checked' : 'unchecked'}
                  onPress={() => toggleRutina(rutina.id)}
                  color={rutina.color}
                />
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    padding: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: colors.background,
    elevation: 0,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  progressCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cardBorder,
  },
  resetButton: {
    marginTop: 5,
  },
  rutinasContainer: {
    padding: 15,
  },
  rutinaCard: {
    marginBottom: 12,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  rutinaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rutinaIconContainer: {
    marginRight: 12,
  },
  rutinaIcon: {
    fontSize: 32,
  },
  rutinaInfo: {
    flex: 1,
  },
  rutinaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  rutinaDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  rutinaMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rutinaCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 10,
  },
  rutinaTime: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});
