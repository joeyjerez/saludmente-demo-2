import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Card, Text, TextInput, Button, Avatar } from "react-native-paper";
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

type ChatbotScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chatbot'>;

interface ChatbotScreenProps {
  navigation?: ChatbotScreenNavigationProp;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface PredefinedResponses {
  greetings: string[];
  anxiety: string[];
  breathing: string[];
  sad: string[];
  stress: string[];
  naty: string[];
  support: string[];
  encouragement: string[];
  techniques: string[];
  default: string[];
}

export default function ChatbotScreen({ navigation }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const predefinedResponses: PredefinedResponses = {
    greetings: [
      "Hola, estoy aquí para acompañarte. ¿Cómo te sientes hoy?",
      "¡Hola! Me alegra que hayas decidido conversar conmigo. ¿En qué puedo ayudarte?",
      "Bienvenido/a. Este es un espacio seguro para ti. ¿Qué tienes en mente?",
    ],
    anxiety: [
      "Entiendo que sientes ansiedad. Es completamente normal y no estás solo/a en esto. ¿Puedes contarme qué situación específica te genera ansiedad?",
      "La ansiedad puede ser abrumadora, pero recuerda que es temporal. ¿Has probado alguna técnica de respiración? Te puedo guiar en una.",
      "Siento que estés pasando por un momento difícil. La ansiedad es una respuesta natural del cuerpo. ¿Te gustaría hablar sobre lo que está pasando?",
    ],
    breathing: [
      "Excelente idea. Vamos a hacer un ejercicio simple: Inhala por 4 segundos, mantén por 4, y exhala por 6. ¿Estás listo/a?",
      "La respiración consciente es muy efectiva. Intenta inhalar lentamente por la nariz, pausa, y exhala despacio por la boca. Hazlo conmigo.",
      "¿Te parece si practicamos la técnica 4-7-8? Inhala por 4, mantén por 7, exhala por 8. Es muy relajante.",
    ],
    sad: [
      "Lamento que te sientas triste. Es válido sentir tristeza, es parte de ser humano. ¿Te gustaría contarme qué te tiene así?",
      "La tristeza puede ser pesada, pero no eres débil por sentirla. ¿Hay algo específico que haya desencadenado estos sentimientos?",
      "Te acompaño en este momento. A veces hablar sobre lo que nos entristece puede ayudar a procesarlo mejor.",
    ],
    stress: [
      "El estrés puede ser agotador. ¿Has identificado qué está causando principalmente tu estrés?",
      "Entiendo que te sientes abrumado/a. El estrés es la forma en que nuestro cuerpo responde a las demandas. ¿Qué te está presionando más?",
      "Es importante reconocer cuando estamos estresados. ¿Te gustaría explorar algunas estrategias para manejarlo mejor?",
    ],
    naty: [
      "La Psicóloga más bonita que existe se llama Naty, ella es una ratita muy trabajadora 🐁 y demasiado seca en lo que hace. Además tiene un olor muy rico en su pelaje de ratón. Deberías definitivamente tomar una sesión con ella.",
    ],
    support: [
      "Estoy aquí para ti. No tienes que enfrentar esto solo/a.",
      "Eres más fuerte de lo que crees. Cada día que sigues adelante es una prueba de tu fortaleza.",
      "Es valioso que busques apoyo. Cuidar tu salud mental es tan importante como cuidar tu salud física.",
      "Recuerda que está bien no estar bien todo el tiempo. Eres humano/a y mereces compasión, especialmente de ti mismo/a.",
    ],
    encouragement: [
      "Has tomado el primer paso al reconocer cómo te sientes. Eso requiere valentía.",
      "Cada conversación que tienes aquí es un acto de autocuidado. Estás haciendo un gran trabajo.",
      "Aunque no lo sientas ahora, estás progresando. El solo hecho de estar aquí lo demuestra.",
    ],
    techniques: [
      "Te puedo enseñar algunas técnicas útiles: respiración profunda, relajación muscular progresiva, o mindfulness. ¿Cuál te gustaría probar?",
      "Hay varias herramientas que pueden ayudarte. ¿Te interesa aprender sobre técnicas de grounding, respiración, o tal vez journaling?",
    ],
    default: [
      "Gracias por compartir eso conmigo. ¿Puedes contarme más al respecto?",
      "Te escucho. ¿Cómo te hace sentir eso?",
      "Entiendo. ¿Hay algo más que quieras explorar sobre este tema?",
      "Cuéntame más sobre cómo te sientes.",
    ],
  };

  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      text: predefinedResponses.greetings[0],
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("hola") ||
      lowerMessage.includes("buenos") ||
      lowerMessage.includes("hey")
    ) {
      return predefinedResponses.greetings[
        Math.floor(Math.random() * predefinedResponses.greetings.length)
      ];
    }

    if (
      lowerMessage.includes("ansiedad") ||
      lowerMessage.includes("ansioso") ||
      lowerMessage.includes("ansiosa") ||
      lowerMessage.includes("nervios")
    ) {
      return predefinedResponses.anxiety[
        Math.floor(Math.random() * predefinedResponses.anxiety.length)
      ];
    }

    if (
      lowerMessage.includes("respirar") ||
      lowerMessage.includes("respiración") ||
      lowerMessage.includes("respiro")
    ) {
      return predefinedResponses.breathing[
        Math.floor(Math.random() * predefinedResponses.breathing.length)
      ];
    }

    if (
      lowerMessage.includes("triste") ||
      lowerMessage.includes("tristeza") ||
      lowerMessage.includes("deprimido") ||
      lowerMessage.includes("deprimida")
    ) {
      return predefinedResponses.sad[
        Math.floor(Math.random() * predefinedResponses.sad.length)
      ];
    }

    if (
      lowerMessage.includes("estrés") ||
      lowerMessage.includes("estres") ||
      lowerMessage.includes("estresado") ||
      lowerMessage.includes("estresada") ||
      lowerMessage.includes("abrumado") ||
      lowerMessage.includes("abrumada")
    ) {
      return predefinedResponses.stress[
        Math.floor(Math.random() * predefinedResponses.stress.length)
      ];
    }

    if (
      lowerMessage.includes("naty") ||
      lowerMessage.includes("natalia") ||
      lowerMessage.includes("psicologa") ||
      lowerMessage.includes("psicóloga")
    ) {
      return predefinedResponses.naty[0];
    }

    if (
      lowerMessage.includes("ayuda") ||
      lowerMessage.includes("apoyo") ||
      lowerMessage.includes("solo") ||
      lowerMessage.includes("sola")
    ) {
      return predefinedResponses.support[
        Math.floor(Math.random() * predefinedResponses.support.length)
      ];
    }

    if (
      lowerMessage.includes("técnica") ||
      lowerMessage.includes("tecnica") ||
      lowerMessage.includes("herramienta") ||
      lowerMessage.includes("método")
    ) {
      return predefinedResponses.techniques[
        Math.floor(Math.random() * predefinedResponses.techniques.length)
      ];
    }

    if (Math.random() < 0.3) {
      return predefinedResponses.encouragement[
        Math.floor(Math.random() * predefinedResponses.encouragement.length)
      ];
    }

    return predefinedResponses.default[
      Math.floor(Math.random() * predefinedResponses.default.length)
    ];
  };

  const sendMessage = (): void => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputText.trim());
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
            ]}
          >
            {message.sender === 'bot' && (
              <Avatar.Icon
                size={36}
                icon="robot"
                style={styles.botAvatar}
                color={colors.text.white}
              />
            )}
            <Card
              style={[
                styles.messageCard,
                message.sender === 'user' ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Card.Content style={styles.messageContent}>
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'user' && styles.userMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </Card.Content>
            </Card>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
            <Avatar.Icon
              size={36}
              icon="robot"
              style={styles.botAvatar}
              color={colors.text.white}
            />
            <Card style={[styles.messageCard, styles.botMessage]}>
              <Card.Content style={styles.messageContent}>
                <Text style={styles.typingText}>Escribiendo...</Text>
              </Card.Content>
            </Card>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Escribe tu mensaje..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          multiline
          onSubmitEditing={sendMessage}
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
        />
        <Button
          mode="contained"
          onPress={sendMessage}
          style={styles.sendButton}
          labelStyle={{ color: colors.text.white }}
          icon="send"
        >
          Enviar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageWrapper: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-end",
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  botMessageWrapper: {
    justifyContent: "flex-start",
  },
  botAvatar: {
    backgroundColor: colors.chatbot,
    marginRight: 8,
  },
  messageCard: {
    maxWidth: "75%",
    elevation: 1,
  },
  userMessage: {
    backgroundColor: colors.primary,
  },
  botMessage: {
    backgroundColor: colors.surface,
  },
  messageContent: {
    padding: 8,
  },
  messageText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 22,
  },
  userMessageText: {
    color: colors.text.white,
  },
  typingText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: colors.background,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
  },
});
