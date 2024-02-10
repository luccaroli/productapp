import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../src/services/storage';

jest.mock('@react-native-async-storage/async-storage');
const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
