import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../src/services/storage';

jest.mock('@react-native-async-storage/async-storage');
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should set data to AsyncStorage', async () => {
    const key = 'testKey';
    const data = {value: 'testValue'};

    await Storage.set(key, data);

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(data),
    );
  });

  it('should handle errors when setting data to AsyncStorage', async () => {
    const key = 'testKey';
    const data = {value: 'testValue'};
    const mockError = new Error('AsyncStorage set error');

    mockAsyncStorage.setItem.mockRejectedValueOnce(mockError);

    await Storage.set(key, data);

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(data),
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error saving data to AsyncStorage:',
      mockError,
    );
  });

  it('should get data from AsyncStorage', async () => {
    const key = 'testKey';
    const mockData = {value: 'testValue'};
    const mockJsonData = JSON.stringify(mockData);

    mockAsyncStorage.getItem.mockResolvedValueOnce(mockJsonData);

    const result = await Storage.get(key);

    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(mockData);
  });

  it('should handle errors when getting data from AsyncStorage', async () => {
    const key = 'testKey';
    const mockError = new Error('AsyncStorage get error');

    mockAsyncStorage.getItem.mockRejectedValueOnce(mockError);

    const result = await Storage.get(key);

    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(console.error).toHaveBeenCalledWith(
      'Error loading data from AsyncStorage:',
      mockError,
    );
    expect(result).toBeNull();
  });

  it('should remove data from AsyncStorage', async () => {
    const key = 'testKey';

    await Storage.remove(key);

    expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should handle errors when removing data from AsyncStorage', async () => {
    const key = 'testKey';
    const mockError = new Error('AsyncStorage remove error');

    mockAsyncStorage.removeItem.mockRejectedValueOnce(mockError);

    await Storage.remove(key);

    expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith(key);
    expect(console.error).toHaveBeenCalledWith(
      'Error removing data from AsyncStorage:',
      mockError,
    );
  });

  it('should update an item in AsyncStorage', async () => {
    const key = 'testKey';
    const data = {value: 'testValue'};

    await Storage.updateItem(key, data);

    expect(mockAsyncStorage.mergeItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(data),
    );
  });

  it('should handle errors when updating an item in AsyncStorage', async () => {
    const key = 'testKey';
    const data = {value: 'testValue'};
    const mockError = new Error('AsyncStorage updateItem error');

    mockAsyncStorage.mergeItem.mockRejectedValueOnce(mockError);

    await Storage.updateItem(key, data);

    expect(mockAsyncStorage.mergeItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(data),
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error updating data in AsyncStorage:',
      mockError,
    );
  });

  it('should get all data from AsyncStorage with a given key prefix', async () => {
    const keyPrefix = 'testKey';
    const mockKeys = ['testKey1', 'testKey2'];
    const mockData = [{value: 'testValue1'}, {value: 'testValue2'}];
    const mockJsonData = [
      [mockKeys[0], JSON.stringify(mockData[0])],
      [mockKeys[1], JSON.stringify(mockData[1])],
    ] as never;

    mockAsyncStorage.getAllKeys.mockResolvedValue(mockKeys);
    mockAsyncStorage.multiGet.mockResolvedValue(mockJsonData);

    const result = await Storage.getAll(keyPrefix);

    expect(mockAsyncStorage.getAllKeys).toHaveBeenCalled();
    expect(mockAsyncStorage.multiGet).toHaveBeenCalledWith(mockKeys);
    expect(result).toEqual(mockData);
  });

  it('should handle errors when getting all data from AsyncStorage', async () => {
    const keyPrefix = 'testKey';
    const mockError = new Error('AsyncStorage getAllKeys error');

    mockAsyncStorage.getAllKeys.mockRejectedValueOnce(mockError);

    const result = await Storage.getAll(keyPrefix);

    expect(mockAsyncStorage.getAllKeys).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error loading keys from AsyncStorage:',
      mockError,
    );
    expect(result).toEqual([]);
  });
});
