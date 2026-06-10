import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import * as Speech from 'expo-speech';
import { useFocusEffect } from '@react-navigation/native';

export default function AboutScreen() {
  const falarTexto = () => {
    const audio =  "Sobre o App. Para retornar a tela anterior, utilize o botão na parte superior esquerda da tela ou use o comando voltar do seu dispositivo. Conteúdo. Texto explicando brevemente o que é o aplicativo Avard. Avard é um aplicativo desenvolvido com a proposta de facilitar o acesso à pessoas com deficiência visual a informações não inclusivas, como rótulos de produtos ou descrições de ambiente. O aplicativo utiliza um scaner de QR codes para inserir conteúdos em uma lista que é fica armazenada no dispositivo do usuario. Ele oferece funcionalidades como conversão de texto em fala e um localizador de palavras para facilitar encontrar uma informação expecifica." ;
    Speech.speak(audio, { language: 'pt-BR' });
  };
  useFocusEffect(
    useCallback(() => {
      falarTexto();
      return () => Speech.stop();
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text style={styles.aboutText} borderWidth={1} borderColor="#d17c8b" borderRadius={8} backgroundColor="#f2cdcd" padding={20}>
        Avard é um aplicativo desenvolvido com a proposta de facilitar o acesso à pessoas com deficiência visual a informações não inclusivas, como rótulos de produtos ou descrições de ambiente.
      </Text>
      <Text style={styles.aboutText} borderWidth={1} borderColor="#d17c8b" borderRadius={8} backgroundColor="#f2cdcd">
        O aplicativo utiliza um scaner de QR codes para inserir conteúdos em uma lista que é fica armazenada no dispositivo do usuario.
      </Text>
      <Text style={styles.aboutText} borderWidth={1} borderColor="#d17c8b" borderRadius={8} backgroundColor="#f2cdcd">
        Ele oferece funcionalidades como conversão de texto em fala e um localizador de palavras para facilitar encontrar uma informação expecifica.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f5e0dc'
  },
  aboutText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#181825',
  }
});