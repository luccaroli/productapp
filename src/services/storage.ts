import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static async set<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
      __DEV__ && console.log('Data saved to AsyncStorage:', {key, data});
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      __DEV__ && console.log('Data loaded from AsyncStorage:', {key, jsonData});
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
      return null;
    }
  }

  private static async getAllKeys(): Promise<readonly string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Error loading keys from AsyncStorage:', error);
      return [];
    }
  }

  static async getAll<T>(keyPrefix: string): Promise<T[]> {
    try {
      const keys = await this.getAllKeys();
      const keysFromPrefix = keys.filter(key => key.includes(keyPrefix));

      const data = await AsyncStorage.multiGet(keysFromPrefix);
      const formattedData = data.map(
        ([_, value]) => JSON.parse(value || '') || [],
      ) as T[];

      __DEV__ && console.log('Data loaded from AsyncStorage:', formattedData);
      return formattedData;
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
      return [];
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      __DEV__ && console.log('Data removed from AsyncStorage:', key);
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  }

  static async updateItem<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.mergeItem(key, jsonData);
      __DEV__ && console.log('Data updated in AsyncStorage:', {key, data});
    } catch (error) {
      console.error('Error updating data in AsyncStorage:', error);
    }
  }
}

export default Storage;
