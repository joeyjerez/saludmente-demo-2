import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Text, Chip } from 'react-native-paper';
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

type DiarioScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Diario'>;

interface DiarioScreenProps {
  navigation?: DiarioScreenNavigationProp;
}

interface MoodOption {
  label: string;
  value: string;
  color: string;
}

interface DiaryEntry {
  id: number;
  text: string;
  mood: string;
  date: string;
}

export default function DiarioScreen({ navigation }: DiarioScreenProps) {
  const [entry, setEntry] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const moods: MoodOption[] = [
    { label: '😊 Feliz', value: 'feliz', color: colors.mood.feliz },
    { label: '😢 Triste', value: 'triste', color: colors.mood.triste },
    { label: '😰 Ansioso', value: 'ansioso', color: colors.mood.ansioso },
    { label: '😴 Cansado', value: 'cansado', color: colors.mood.cansado },
    { label: '😌 Tranquilo', value: 'tranquilo', color: colors.mood.tranquilo },
    { label: '😤 Enojado', value: 'enojado', color: colors.mood.enojado }
  ];

  const saveEntry = async (): Promise<void> => {
    if (!entry.trim() || !mood) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now(),
      text: entry,
      mood: mood,
      date: new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setEntry('');
    setMood('');
    Alert.alert('¡Guardado!', 'Tu entrada ha sido guardada exitosamente');
  };

  const getMoodEmoji = (moodValue: string): string => {
    const foundMood = moods.find(m => m.value === moodValue);
    return foundMood ? foundMood.label : '😐 Neutral';
  };

  const getMoodColor = (moodValue: string): string => {
    const foundMood = moods.find(m => m.value === moodValue);
    return foundMood ? foundMood.color : colors.text.secondary;
  };

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      scrollEventThrottle={16}
      nestedScrollEnabled={true}
      overScrollMode="always"
      alwaysBounceVertical={false}
    >
      <View style={styles.inputSection}>
        <Title style={styles.sectionTitle}>¿Cómo te sientes hoy?</Title>
        
        <Text style={styles.label}>Estado de ánimo:</Text>
        <ScrollView horizontal style={styles.moodContainer} showsHorizontalScrollIndicator={false} bounces={false} nestedScrollEnabled={true}>
          {moods.map((moodOption) => (
            <Chip
              key={moodOption.value}
              mode={mood === moodOption.value ? 'flat' : 'outlined'}
              selected={mood === moodOption.value}
              onPress={() => setMood(moodOption.value)}
              style={[
                styles.moodChip, 
                mood === moodOption.value && { backgroundColor: moodOption.color }
              ]}
              textStyle={{ 
                color: mood === moodOption.value ? colors.text.white : colors.text.primary 
              }}
            >
              {moodOption.label}
            </Chip>
          ))}
        </ScrollView>

        <Text style={styles.label}>Escribe sobre tu día:</Text>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={6}
          value={entry}
          onChangeText={setEntry}
          placeholder="Comparte tus pensamientos, emociones y experiencias del día..."
          style={styles.textInput}
          outlineColor={colors.primary}
          activeOutlineColor={colors.primary}
        />

        <Button 
          mode="contained" 
          onPress={saveEntry}
          style={styles.saveButton}
          labelStyle={{ color: colors.text.white }}
        >
          Guardar Entrada
        </Button>
      </View>

      <View style={styles.entriesSection}>
        <Title style={styles.sectionTitle}>Mis Entradas</Title>
        {entries.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text style={styles.emptyText}>
                Aún no tienes entradas en tu diario. ¡Comienza escribiendo sobre tu día!
              </Text>
            </Card.Content>
          </Card>
        ) : (
          entries.map((item) => (
            <Card key={item.id} style={styles.entryCard}>
              <Card.Content>
                <View style={styles.entryHeader}>
                  <Text style={[styles.moodText, { color: getMoodColor(item.mood) }]}>
                    {getMoodEmoji(item.mood)}
                  </Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.entryText}>{item.text}</Text>
              </Card.Content>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inputSection: {
    padding: 20,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 10,
    marginTop: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  moodChip: {
    marginRight: 8,
  },
  textInput: {
    backgroundColor: colors.background,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
  },
  entriesSection: {
    padding: 20,
  },
  entryCard: {
    marginBottom: 15,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  moodText: {
    fontSize: 24,
  },
  dateText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  entryText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
