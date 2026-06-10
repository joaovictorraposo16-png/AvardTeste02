import React, { useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation, links }) {
	const falarTexto = () => {
		const frase = "Menu. Tela central de navegação entre as funções do app. Para saber mais sobre o app, clique no botão sobre possicionado na parte superior direita da tela. Para scanear um QR code, clique no botão possicionado na parte inferior da tela. Por fim, para proseguir para um link salvo, selecione-o na lista que compôe o centro da tela.";
		Speech.speak(frase, { language: 'pt-BR' });
	};

	useFocusEffect(
		useCallback(() => {
			falarTexto();

			return () => Speech.stop();
		}, [])
	);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Selecione um link:</Text>

			<FlatList
				data={links}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => navigation.navigate('List', { item })}
					>
						<Text style={styles.itemText}>{item.title}</Text>
					</TouchableOpacity>
				)}
			/>

			<TouchableOpacity
				style={styles.cameraButton}
				onPress={() => navigation.navigate('Camera')}
			>
				<Text style={styles.cameraButtonText}>Scaner</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f5e0dc', padding: 20 },
	title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#181825', textAlign: 'center' },
	item: { backgroundColor: '#f2cdcd', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#eba0ac' },
	itemText: { fontSize: 16, color: '#181825' },
	cameraButton: { backgroundColor: '#eba0ac', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 'auto', borderWidth: 1, borderColor: '#d17c8b' },
	cameraButtonText: { color: '#181825', fontSize: 16, fontWeight: 'bold' }
});