import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Text, Chip } from 'react-native-paper';
import { colors } from '../theme/colors';

export default function DiarioScreen() {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [entries, setEntries] = useState([]);

  const moods = [
    { label: '😊 Feliz', value: 'feliz', color: colors.mood.feliz },
    { label: '😢 Triste', value: 'triste', color: colors.mood.triste },
    { label: '😰 Ansioso', value: 'ansioso', color: colors.mood.ansioso },
    { label: '😴 Cansado', value: 'cansado', color: colors.mood.cansado },
    { label: '😌 Tranquilo', value: 'tranquilo', color: colors.mood.tranquilo },
    { label: '😤 Enojado', value: 'enojado', color: colors.mood.enojado }
  ];

  const saveEntry = async () => {
    if (!entry.trim() || !mood) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const newEntry = {
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

  const getMoodEmoji = (moodValue) => {
    const foundMood = moods.find(m => m.value === moodValue);
    return foundMood ? foundMood.label : '😐 Neutral';
  };

  const getMoodColor = (moodValue) => {
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
          style={[styles.saveButton, { backgroundColor: colors.education }]}
          icon="content-save"
          labelStyle={{ color: colors.text.white }}
        >
          Guardar Entrada
        </Button>
      </View>

      <View style={styles.entriesSection}>
        <Title style={styles.sectionTitle}>Entradas Anteriores</Title>
        {entries.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text style={styles.emptyText}>
                Aún no tienes entradas. ¡Escribe tu primera entrada arriba!
              </Text>
            </Card.Content>
          </Card>
        ) : (
          entries.map((item) => (
            <Card key={item.id} style={styles.entryCard}>
              <Card.Content>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{item.date}</Text>
                  <Chip 
                    mode="flat" 
                    compact
                    style={{ backgroundColor: getMoodColor(item.mood) }}
                    textStyle={{ color: colors.text.white }}
                  >
                    {getMoodEmoji(item.mood)}
                  </Chip>
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  inputSection: {
    backgroundColor: colors.surface,
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text.primary,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.text.primary,
  },
  moodContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  moodChip: {
    marginRight: 8,
    marginVertical: 4,
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: colors.surface,
  },
  saveButton: {
    paddingVertical: 6,
    borderRadius: 25,
  },
  entriesSection: {
    padding: 10,
  },
  emptyCard: {
    marginVertical: 10,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: 16,
  },
  entryCard: {
    marginVertical: 8,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.primary,
  },
});