import {act, renderHook} from '@testing-library/react-native';
import {useAuth} from '../../../../src/modules/Welcome/hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import Storage from '../../../../src/services/storage';

jest.mock('@react-navigation/native');
const mockUseNavigation = useNavigation as jest.Mock;

jest.mock('../../../../src/services/storage');
const mockStorage = Storage as jest.Mocked<typeof Storage>;

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should set and get CPF and password correctly', () => {
    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setInputCPF('12345678909');
      result.current.setInputPassword('securePassword');
    });

    expect(result.current.cpf).toBe('12345678909');
    expect(result.current.password).toBe('securePassword');
  });

  it('should set and get error correctly', () => {
    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setError({cpf: 'Invalid CPF'});
    });

    expect(result.current.error?.cpf).toBe('Invalid CPF');
  });

  it('should submit and call login correctly', async () => {
    mockStorage.get.mockImplementation(() =>
      Promise.resolve({cpf: '12345678909', password: 'securePassword'}),
    );
    const mockNavigationReset = jest.fn();
    mockUseNavigation.mockReturnValue({reset: mockNavigationReset});

    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setInputCPF('12345678909');
      result.current.setInputPassword('securePassword');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mockNavigationReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'Home'}],
    });
  });

  it('should submit and call login but break because invalid cpf', async () => {
    mockStorage.get.mockImplementation(() =>
      Promise.resolve({cpf: '12345678909', password: 'securePassword'}),
    );
    const mockNavigationReset = jest.fn();
    mockUseNavigation.mockReturnValue({reset: mockNavigationReset});

    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setInputCPF('111');
      result.current.setInputPassword('securePassword');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mockNavigationReset).not.toHaveBeenCalled();
    expect(result.current.error?.cpf).toBe('CPF inválido');
  });

  it('should submit and call login but break because incorrect cpf', async () => {
    mockStorage.get.mockImplementation(() =>
      Promise.resolve({cpf: '12345678909', password: 'securePassword'}),
    );
    const mockNavigationReset = jest.fn();
    mockUseNavigation.mockReturnValue({reset: mockNavigationReset});

    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setInputCPF('14188037075');
      result.current.setInputPassword('securePassword');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mockNavigationReset).not.toHaveBeenCalled();
    expect(result.current.error?.password).toBe('Senha ou CPF incorretos');
  });

  it('should submit and call register but break because invalid CPF', async () => {
    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setInputCPF('1111');
      result.current.setInputPassword('securePassword');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mockStorage.set).not.toHaveBeenCalled();
    expect(result.current.error?.cpf).toBe('CPF inválido');
  });

  it('should submit and call register but break because password is short', async () => {
    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setInputCPF('12345678909');
      result.current.setInputPassword('secure');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mockStorage.set).not.toHaveBeenCalled();
    expect(result.current.error?.password).toBe(
      'Senha deve ter no mínimo 8 caracteres',
    );
  });

  it('should submit and call register correctly', async () => {
    const mockNavigationReset = jest.fn();
    mockUseNavigation.mockReturnValue({reset: mockNavigationReset});

    const {result} = renderHook(() => useAuth());

    act(() => {
      result.current.setInputCPF('12345678909');
      result.current.setInputPassword('securePassword');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mockStorage.set).toHaveBeenCalledWith('user', {
      cpf: '12345678909',
      password: 'securePassword',
    });

    expect(mockNavigationReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'Home'}],
    });
  });
});
