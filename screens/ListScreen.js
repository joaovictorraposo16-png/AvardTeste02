import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

export default function ListScreen({ route }) {
  const { item } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const falarTexto = () => {
    Speech.speak(item.content, { language: 'pt-BR' });
  };

  const textMatchesFilter = item.content.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <ScrollView style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.contentContainer}>
        {searchQuery.length > 0 && !textMatchesFilter ? (
          <Text style={styles.noMatchText}>Nenhum termo correspondente encontrado no texto.</Text>
        ) : (
          <Text style={styles.content}>{item.content}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.audioButton} onPress={falarTexto}>
        <Text style={styles.audioButtonText}>Ouvir Texto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5e0dc', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#f2cdcd', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 16, borderColor: '#eba0ac', borderWidth: 1 },
  contentContainer: { minHeight: 150, padding: 10, backgroundColor: '#f2cdcd', borderRadius: 8, marginBottom: 20, borderColor: '#eba0ac', borderWidth: 1 },
  content: { fontSize: 16, lineHeight: 24, color: '#181825' },
  noMatchText: { color: 'red', fontStyle: 'italic' },
  audioButton: { backgroundColor: '#eba0ac', padding: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#d17c8b' },
  audioButtonText: { color: '#181825', fontSize: 16, fontWeight: 'bold' },
});
