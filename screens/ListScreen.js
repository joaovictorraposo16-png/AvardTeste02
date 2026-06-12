import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { useFocusEffect } from '@react-navigation/native';

export default function ListScreen({ route }) {
  const { item } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const textMatchesFilter = item.content.toLowerCase().includes(searchQuery.toLowerCase());

  const falarTexto = () => {
    Speech.speak(item.content, { language: 'pt-BR' });
  };

  const textoInicial = () => {
    const frase = "Lista iniciada. Para retornar a tela anterior, utilize o botão na parte superior esquerda da tela ou use o comando voltar do seu dispositivo. No centro da tela será exibido as informações do texto. para ouvir, presione o botão na parte inferior da tela.";
    Speech.speak(frase, { language: 'pt-BR' });
  };

  useFocusEffect(
    useCallback(() => {
      textoInicial();
      return () => Speech.stop();
    }, [])
  );

  // Visual corrigido
  return (
    // Esta View principal envelopa tudo e garante que a tela ocupe 100% do espaço (flex: 1)
    <View style={styles.mainContainer}>
      
      {/* O ScrollView cuida apenas da rolagem do texto e do input */}
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          placeholderTextColor="#6c7086"
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
      </ScrollView>

      {/* O container do botão fica FORA do ScrollView, fixando-o na parte inferior */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.audioButton} onPress={falarTexto}>
          <Text style={styles.audioButtonText}>Ouvir Texto</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  // Container principal da tela
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#f5e0dc' 
  },
  // Mudamos o padding do container para o ScrollView para não espremer o botão
  scrollContainer: { 
    flex: 1, 
    padding: 20 
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#f2cdcd', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 16, borderColor: '#eba0ac', borderWidth: 1 },
  contentContainer: { minHeight: 150, padding: 10, backgroundColor: '#f2cdcd', borderRadius: 8, marginBottom: 20, borderColor: '#eba0ac', borderWidth: 1 },
  content: { fontSize: 16, lineHeight: 24, color: '#181825' },
  noMatchText: { color: 'red', fontStyle: 'italic' },
  
  // Container que joga o botão para o rodapé e adiciona um espaçamento confortável
  bottomContainer: { 
    padding: 20,
    backgroundColor: '#f5e0dc', // Mantém a cor de fundo igual à da tela
  },
  audioButton: { 
    backgroundColor: '#eba0ac', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#d17c8b' 
  },
  audioButtonText: { color: '#181825', fontSize: 16, fontWeight: 'bold' },
});