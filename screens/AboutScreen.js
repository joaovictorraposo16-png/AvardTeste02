import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import { useFocusEffect } from '@react-navigation/native';

export default function AboutScreen() {
  // Audio.
  const falarTexto = () => {
    const frase = "Sobre o App. Para retornar a tela anterior, utilize o botão na parte superior esquerda da tela ou use o comando voltar do seu dispositivo. Conteúdo. Texto explicando brevemente o que é o aplicativo Avard. Avard é um aplicativo desenvolvido com a proposta de facilitar o acesso à pessoas com deficiência visual a informações não inclusivas, como rótulos de produtos ou descrições de ambiente. O aplicativo utiliza um scaner de QR codes para inserir conteúdos em uma lista que fica armazenada no dispositivo do usuário. Ele oferece funcionalidades como conversão de texto em fala e um localizador de palavras para facilitar encontrar uma informação específica.";
    Speech.speak(frase, { language: 'pt-BR' }); 
  };
  useFocusEffect(
    useCallback(() => {
      falarTexto();
      return () => Speech.stop();
    }, [])
  );
  // Visual.
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Avard é um aplicativo desenvolvido com a proposta de facilitar o acesso à pessoas com deficiência visual a informações não inclusivas, como rótulos de produtos ou descrições de ambiente.
      </Text>
      <Text style={styles.text}>
        O aplicativo utiliza um scaner de QR codes para inserir conteúdos em uma lista que fica armazenada no dispositivo do usuário.
      </Text>
      <Text style={styles.text}>
        Ele oferece funcionalidades como conversão de texto em fala e um localizador de palavras para facilitar encontrar uma informação específica.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,  padding: 30,  backgroundColor: '#f5e0dc', justifyContent: 'center', gap: 80},
    text: { fontSize: 24, textAlign: 'center', lineHeight: 32, padding: 20, color: '#181825', borderWidth: 1, borderColor: "#d17c8b", borderRadius: 8, backgroundColor: "#f2cdcd" }
});
