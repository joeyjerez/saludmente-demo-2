import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import { Card, Title, Text, Button, IconButton } from "react-native-paper";
import { colors } from '../theme/colors';
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

type CapsulasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Capsulas'>;

interface CapsulasScreenProps {
  navigation?: CapsulasScreenNavigationProp;
}

interface Capsula {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  color: string;
  icon: string;
}

export default function CapsulasScreen({ navigation }: CapsulasScreenProps) {
  const [selectedCapsula, setSelectedCapsula] = useState<Capsula | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const capsulas: Capsula[] = [
    {
      id: 1,
      title: "¿Qué es la Ansiedad?",
      category: "Conceptos Básicos",
      excerpt:
        "La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés...",
      content: `La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés o peligro percibido. Es una emoción normal que todos experimentamos en ciertos momentos de nuestras vidas.

**Síntomas comunes:**
• Preocupación excesiva
• Nerviosismo o inquietud
• Tensión muscular
• Problemas para concentrarse
• Alteraciones del sueño

**¿Cuándo buscar ayuda?**
Si la ansiedad interfiere con tu vida diaria, trabajo o relaciones, es importante buscar apoyo profesional.

**Recuerda:** La ansiedad es tratable y hay muchas estrategias efectivas para manejarla.`,
      color: colors.diary,
      icon: "brain",
    },
    {
      id: 2,
      title: "Técnicas de Respiración",
      category: "Herramientas Prácticas",
      excerpt:
        "Aprende técnicas simples de respiración para manejar momentos de estrés...",
      content: `La respiración consciente es una de las herramientas más efectivas para manejar la ansiedad y el estrés.

**Técnica 4-7-8:**
1. Inhala por la nariz durante 4 segundos
2. Mantén la respiración por 7 segundos
3. Exhala por la boca durante 8 segundos
4. Repite 3-4 veces

**Respiración diafragmática:**
• Coloca una mano en el pecho y otra en el abdomen
• Respira lentamente por la nariz
• La mano del abdomen debe moverse más que la del pecho
• Exhala lentamente por la boca

**Beneficios:**
• Reduce la frecuencia cardíaca
• Disminuye la presión arterial
• Calma el sistema nervioso
• Aumenta la sensación de control`,
      color: colors.relaxation,
      icon: "lungs",
    },
    {
      id: 3,
      title: "Autocuidado Diario",
      category: "Bienestar",
      excerpt:
        "Pequeñas acciones diarias que pueden mejorar significativamente tu salud mental...",
      content: `El autocuidado no es egoísta, es esencial para mantener un buen equilibrio emocional.

**Rutinas recomendadas:**
• Dormir 7-9 horas diarias
• Ejercicio regular (30 min al día)
• Alimentación balanceada
• Tiempo para hobbies y pasiones
• Conexión social significativa

**Autocuidado mental:**
• Practicar gratitud diariamente
• Establecer límites saludables
• Decir "no" cuando sea necesario
• Tomar descansos regulares
• Buscar ayuda cuando la necesites

**Recuerda:** El autocuidado es una inversión en tu bienestar, no un lujo.`,
      color: colors.routines,
      icon: "heart-pulse",
    },
    {
      id: 4,
      title: "Mindfulness y Atención Plena",
      category: "Prácticas Conscientes",
      excerpt:
        "Descubre cómo vivir el momento presente puede transformar tu bienestar...",
      content: `El mindfulness es la práctica de prestar atención al momento presente de manera intencional y sin juicio.

**¿Qué es mindfulness?**
Es estar completamente presente en el aquí y ahora, observando pensamientos y sensaciones sin reaccionar automáticamente.

**Beneficios comprobados:**
• Reduce el estrés y la ansiedad
• Mejora la concentración
• Aumenta la autoconciencia
• Fortalece la regulación emocional
• Mejora la calidad del sueño

**Cómo empezar:**
1. Dedica 5 minutos al día
2. Encuentra un lugar tranquilo
3. Observa tu respiración
4. Nota cuando tu mente divague
5. Regresa gentilmente al presente

**Práctica diaria:** Puedes practicar mindfulness en cualquier actividad: comer, caminar, ducharte. La clave es estar plenamente presente.`,
      color: colors.education,
      icon: "meditation",
    },
    {
      id: 5,
      title: "Manejo del Estrés",
      category: "Estrategias de Afrontamiento",
      excerpt:
        "Herramientas prácticas para identificar y manejar el estrés efectivamente...",
      content: `El estrés es inevitable, pero cómo lo manejamos hace toda la diferencia.

**Identifica tus estresores:**
• Situaciones laborales
• Relaciones personales
• Preocupaciones financieras
• Problemas de salud
• Cambios vitales importantes

**Estrategias efectivas:**
• Organización y planificación
• Técnicas de relajación
• Ejercicio regular
• Hablar con alguien de confianza
• Establecer prioridades claras

**Señales de alerta:**
• Irritabilidad constante
• Problemas de sueño
• Cambios en el apetito
• Dificultad para concentrarse
• Dolores físicos sin causa

**Recuerda:** Pedir ayuda profesional no es señal de debilidad, sino de fortaleza y autocuidado.`,
      color: colors.warning,
      icon: "alert-circle",
    },
    {
      id: 6,
      title: "La Importancia del Sueño",
      category: "Salud Integral",
      excerpt:
        "El sueño es fundamental para la salud mental y el bienestar emocional...",
      content: `Un buen descanso es esencial para la salud mental y el funcionamiento óptimo del cerebro.

**¿Por qué es importante?**
• Consolida la memoria
• Regula las emociones
• Restaura energía física y mental
• Fortalece el sistema inmune
• Mejora la toma de decisiones

**Higiene del sueño:**
• Mantén horarios regulares
• Evita pantallas antes de dormir
• Crea un ambiente tranquilo y oscuro
• Temperatura confortable (18-22°C)
• Evita cafeína 6 horas antes

**Rutina relajante:**
1. Baño o ducha tibia
2. Lectura ligera
3. Meditación o respiración
4. Estiramientos suaves
5. Evitar preocupaciones

**Meta:** 7-9 horas de sueño de calidad cada noche para adultos.`,
      color: colors.primary,
      icon: "sleep",
    },
  ];

  const openCapsula = (capsula: Capsula): void => {
    setSelectedCapsula(capsula);
    setModalVisible(true);
  };

  const closeCapsula = (): void => {
    setModalVisible(false);
    setTimeout(() => setSelectedCapsula(null), 300);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Cápsulas Educativas</Title>
        <Text style={styles.subtitle}>
          Aprende sobre salud mental y bienestar
        </Text>
      </View>

      <View style={styles.capsulasContainer}>
        {capsulas.map((capsula) => (
          <Card
            key={capsula.id}
            style={styles.capsulaCard}
            onPress={() => openCapsula(capsula)}
          >
            <Card.Content>
              <View style={styles.cardHeader}>
                <IconButton
                  icon={capsula.icon}
                  size={32}
                  iconColor={capsula.color}
                />
                <View style={styles.cardInfo}>
                  <Text style={[styles.category, { color: capsula.color }]}>
                    {capsula.category}
                  </Text>
                  <Title style={styles.capsulaTitle}>{capsula.title}</Title>
                  <Text style={styles.excerpt}>{capsula.excerpt}</Text>
                </View>
              </View>
              <Button
                mode="text"
                onPress={() => openCapsula(capsula)}
                textColor={capsula.color}
              >
                Leer más
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeCapsula}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <IconButton
              icon="close"
              size={24}
              onPress={closeCapsula}
              iconColor={colors.text.primary}
            />
            <Title style={styles.modalTitle}>
              {selectedCapsula?.title}
            </Title>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedCapsula && (
              <View>
                <Text
                  style={[
                    styles.modalCategory,
                    { color: selectedCapsula.color },
                  ]}
                >
                  {selectedCapsula.category}
                </Text>
                <Text style={styles.modalText}>{selectedCapsula.content}</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button
              mode="contained"
              onPress={closeCapsula}
              style={[
                styles.closeButton,
                { backgroundColor: selectedCapsula?.color || colors.primary },
              ]}
              labelStyle={{ color: colors.text.white }}
            >
              Cerrar
            </Button>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: 5,
  },
  capsulasContainer: {
    padding: 15,
  },
  capsulaCard: {
    marginBottom: 15,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  capsulaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
    marginLeft: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalCategory: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 26,
  },
  modalFooter: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  closeButton: {
    paddingVertical: 8,
  },
});
