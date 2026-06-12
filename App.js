import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import CameraScreen from './screens/CameraScreen';
import AboutScreen from './screens/AboutScreen';
import { storeData, getData } from './storage/storage';

const Stack = createStackNavigator();

export default function App() {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const loadStoredData = async () => {
      const savedLinks = await getData('@app_links');
      if (savedLinks && Array.isArray(savedLinks)) {
        setLinks(savedLinks);
      } else {
        setLinks([]);
      }
    };
    loadStoredData();
  }, []);

  const handleAddLink = async (newLink) => {
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    await storeData('@app_links', updatedLinks);
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
            title: 'Avard',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('About')}
                title="Sobre"
                color="#eba0ac"
              />
            ),
          })}
        >
          {(props) => <HomeScreen {...props} links={links} />}
        </Stack.Screen>

        <Stack.Screen
          name="List" component={ListScreen}
          options={{ title: 'Link', headerTitleAlign: 'center' }}
        />

        <Stack.Screen
          name="Camera"
          options={{ title: 'Câmera', headerTitleAlign: 'center' }}
        >
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