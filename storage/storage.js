import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar dados
export const storeData = async (key, value) => {
  try {
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, valueToStore);
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
};

// Ler dados
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error("Erro ao ler os dados:", error);
    return null;
  }
};

// add link
export const addLink = async (key, newItem) => {
  try {
    const currentData = await getData(key);
    let list = Array.isArray(currentData) ? currentData : [];
    list.push({
      id: newItem.id,
      title: newItem.title,
      content: newItem.content
    });
    await storeData(key, list);
  } catch (error) {
    console.error("Erro ao adicionar item à lista:", error);
  }
};