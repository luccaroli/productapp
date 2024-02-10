import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static async set<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
      return null;
    }
  }
}

export default Storage;
