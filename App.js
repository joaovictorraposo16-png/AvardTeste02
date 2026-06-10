import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import CameraScreen from './screens/CameraScreen';
import AboutScreen from './screens/AboutScreen';
import { storeData, getData } from './storage/storage';

const Stack = createStackNavigator();

export default function App() {
  // Começa com uma lista vazia até carregar os dados do banco local
  const [links, setLinks] = useState([]);

  // Carrega os dados salvos assim que o app inicia
  useEffect(() => {
    const loadStoredData = async () => {
      const savedLinks = await getData('@app_links');
      setLinks(savedLinks);
      setLinks(initialData);
      await storeData('@app_links', initialData);
    };
    loadStoredData();
  }, []);

  // Função para adicionar um novo link e salvar no AsyncStorage
  const handleAddLink = async (newLink) => {
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks); // Atualiza o estado visual
    await storeData('@app_links', updatedLinks); // Salva no dispositivo
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: { backgroundColor: '#585b70' },
        headerTintColor: '#cdd6f4',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            title: 'Menu',
            headerTitleAlign: 'center',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('About')}
                title="Sobre"
                color="#eba0ac"
                borderRadius={20}
                borderWidth={4}
                borderColor="#d17c8b"
              />
            ),
          })}>
          {(props) => <HomeScreen {...props} links={links} />}
        </Stack.Screen>

        <Stack.Screen
          name="List" component={ListScreen}
          options={{ title: 'Conteúdo', headerTitleAlign: 'center' }}
        />

        <Stack.Screen
          name="Camera"
          options={{ title: 'Câmera', headerTitleAlign: 'center' }}>
          {/* Passamos a nova função handleAddLink para a tela de Câmera */}
          {(props) => <CameraScreen {...props} onAddLink={handleAddLink} />}
        </Stack.Screen>

        <Stack.Screen
          name="About" component={AboutScreen}
          options={{ title: 'Sobre o App', headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: '#eba0ac',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: '#d17c8b'
  },
  cameraButtonText: {
    color: '#181825',
    fontSize: 16,
    fontWeight: 'bold'
  },
});