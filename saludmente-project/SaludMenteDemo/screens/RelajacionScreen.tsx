import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Text, Button, ProgressBar } from 'react-native-paper';
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

type RelajacionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Relajacion'>;

interface RelajacionScreenProps {
  navigation?: RelajacionScreenNavigationProp;
}

interface ExerciseStep {
  text: string;
  duration: number;
}

interface Exercise {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  steps: ExerciseStep[];
}

export default function RelajacionScreen({ navigation }: RelajacionScreenProps) {
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const exercises: Exercise[] = [
    {
      id: 1,
      title: 'Respiración 4-7-8',
      description: 'Técnica de respiración para relajación profunda',
      duration: '5 minutos',
      icon: '🫁',
      color: colors.relaxation,
      steps: [
        { text: 'Siéntate cómodamente con la espalda recta', duration: 5 },
        { text: 'Inhala por la nariz durante 4 segundos', duration: 4 },
        { text: 'Retén la respiración por 7 segundos', duration: 7 },
        { text: 'Exhala por la boca durante 8 segundos', duration: 8 },
        { text: 'Repite el ciclo 4 veces más', duration: 76 },
        { text: '¡Excelente! Has completado el ejercicio', duration: 5 }
      ]
    },
    {
      id: 2,
      title: 'Relajación Progresiva',
      description: 'Libera la tensión de todo tu cuerpo',
      duration: '8 minutos',
      icon: '🧘‍♀️',
      color: colors.education,
      steps: [
        { text: 'Acuéstate o siéntate cómodamente', duration: 10 },
        { text: 'Cierra los ojos y respira profundamente', duration: 10 },
        { text: 'Tensa los músculos de los pies por 5 segundos, luego relaja', duration: 15 },
        { text: 'Tensa las pantorrillas, luego relaja completamente', duration: 15 },
        { text: 'Continúa con los muslos, tensiona y relaja', duration: 15 },
        { text: 'Tensa el abdomen, mantén y luego relaja', duration: 15 },
        { text: 'Tensa los brazos y hombros, luego libera la tensión', duration: 15 },
        { text: 'Finalmente, tensa el rostro y luego relájalo completamente', duration: 15 },
        { text: 'Respira profundamente y disfruta la relajación total', duration: 20 },
        { text: '¡Perfecto! Tu cuerpo está completamente relajado', duration: 5 }
      ]
    },
    {
      id: 3,
      title: 'Mindfulness Básico',
      description: 'Conecta con el momento presente',
      duration: '10 minutos',
      icon: '🌸',
      color: colors.diary,
      steps: [
        { text: 'Encuentra una posición cómoda', duration: 10 },
        { text: 'Cierra los ojos suavemente', duration: 5 },
        { text: 'Observa tu respiración natural sin cambiarla', duration: 60 },
        { text: 'Nota las sensaciones en tu cuerpo', duration: 60 },
        { text: 'Escucha los sonidos a tu alrededor sin juzgar', duration: 60 },
        { text: 'Si tu mente divaga, regresa gentilmente a la respiración', duration: 120 },
        { text: 'Mantén esta atención plena por unos minutos más', duration: 180 },
        { text: 'Lentamente abre los ojos cuando estés listo', duration: 10 },
        { text: '¡Excelente práctica de mindfulness!', duration: 5 }
      ]
    },
    {
      id: 4,
      title: 'Visualización Guiada',
      description: 'Imagina un lugar de paz y tranquilidad',
      duration: '6 minutos',
      icon: '🏞️',
      color: colors.routines,
      steps: [
        { text: 'Cierra los ojos y respira profundamente', duration: 10 },
        { text: 'Imagina que estás en una hermosa playa tropical', duration: 30 },
        { text: 'Siente la arena cálida bajo tus pies', duration: 30 },
        { text: 'Escucha el sonido relajante de las olas', duration: 30 },
        { text: 'Siente la brisa suave en tu rostro', duration: 30 },
        { text: 'Observa el hermoso atardecer en el horizonte', duration: 60 },
        { text: 'Respira la paz y tranquilidad de este lugar', duration: 60 },
        { text: 'Lleva esta sensación de calma contigo', duration: 30 },
        { text: 'Cuando estés listo, regresa al presente', duration: 10 },
        { text: '¡Hermosa visualización completada!', duration: 5 }
      ]
    },
    {
      id: 5,
      title: 'Escaneo Corporal',
      description: 'Consciencia corporal completa',
      duration: '7 minutos',
      icon: '✨',
      color: colors.chatbot,
      steps: [
        { text: 'Recuéstate cómodamente', duration: 10 },
        { text: 'Cierra los ojos y respira naturalmente', duration: 10 },
        { text: 'Lleva tu atención a tus pies', duration: 30 },
        { text: 'Sube lentamente hacia tus tobillos y pantorrillas', duration: 40 },
        { text: 'Continúa hacia tus rodillas y muslos', duration: 40 },
        { text: 'Observa tu abdomen y pecho', duration: 40 },
        { text: 'Nota las sensaciones en tus manos y brazos', duration: 40 },
        { text: 'Lleva la atención a tu cuello y hombros', duration: 40 },
        { text: 'Finalmente, observa tu cabeza y rostro', duration: 40 },
        { text: 'Siente tu cuerpo como un todo', duration: 60 },
        { text: '¡Excelente escaneo corporal!', duration: 5 }
      ]
    }
  ];

  useEffect(() => {
    if (!isRunning || !activeExercise) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev + 1;
        const currentStepDuration = activeExercise.steps[currentStep].duration;

        if (newTime >= currentStepDuration) {
          if (currentStep < activeExercise.steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
            return 0;
          } else {
            setIsRunning(false);
            Alert.alert('¡Completado!', 'Has terminado el ejercicio de relajación');
            return 0;
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentStep, activeExercise]);

  const startExercise = (exercise: Exercise): void => {
    setActiveExercise(exercise);
    setCurrentStep(0);
    setTimer(0);
    setIsRunning(true);
  };

  const stopExercise = (): void => {
    setIsRunning(false);
    setActiveExercise(null);
    setCurrentStep(0);
    setTimer(0);
  };

  const getProgress = (): number => {
    if (!activeExercise) return 0;
    const currentStepDuration = activeExercise.steps[currentStep].duration;
    return timer / currentStepDuration;
  };

  if (activeExercise) {
    return (
      <View style={styles.activeExerciseContainer}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseIcon}>{activeExercise.icon}</Text>
          <Title style={styles.exerciseTitle}>{activeExercise.title}</Title>
        </View>

        <Card style={styles.stepCard}>
          <Card.Content>
            <Text style={styles.stepNumber}>
              Paso {currentStep + 1} de {activeExercise.steps.length}
            </Text>
            <Text style={styles.stepText}>
              {activeExercise.steps[currentStep].text}
            </Text>
            <ProgressBar
              progress={getProgress()}
              color={activeExercise.color}
              style={styles.stepProgress}
            />
            <Text style={styles.timerText}>
              {timer}s / {activeExercise.steps[currentStep].duration}s
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={stopExercise}
          style={[styles.stopButton, { backgroundColor: colors.error }]}
          labelStyle={{ color: colors.text.white }}
        >
          Detener Ejercicio
        </Button>
      </View>
    );
  }

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
        <Title style={styles.headerTitle}>Ejercicios de Relajación</Title>
        <Text style={styles.headerSubtitle}>
          Reduce el estrés y encuentra tu calma interior
        </Text>
      </View>

      <View style={styles.exercisesContainer}>
        {exercises.map((exercise) => (
          <Card key={exercise.id} style={styles.exerciseCard}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{exercise.icon}</Text>
                <View style={styles.cardInfo}>
                  <Title style={styles.cardTitle}>{exercise.title}</Title>
                  <Text style={styles.cardDescription}>{exercise.description}</Text>
                  <Text style={[styles.cardDuration, { color: exercise.color }]}>
                    ⏱ {exercise.duration}
                  </Text>
                </View>
              </View>
              <Button
                mode="contained"
                onPress={() => startExercise(exercise)}
                style={[styles.startButton, { backgroundColor: exercise.color }]}
                labelStyle={{ color: colors.text.white }}
              >
                Comenzar
              </Button>
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
    marginBottom: 15,
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
  },
  exercisesContainer: {
    padding: 15,
  },
  exerciseCard: {
    marginBottom: 15,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardIcon: {
    fontSize: 48,
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  cardDuration: {
    fontSize: 14,
    fontWeight: '600',
  },
  startButton: {
    marginTop: 10,
  },
  activeExerciseContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  exerciseHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  exerciseIcon: {
    fontSize: 72,
    marginBottom: 20,
  },
  exerciseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  stepCard: {
    backgroundColor: colors.surface,
    elevation: 4,
    marginBottom: 40,
  },
  stepNumber: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 15,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 24,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 32,
  },
  stepProgress: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  stopButton: {
    paddingVertical: 8,
  },
});
