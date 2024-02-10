import {reducer} from '../../../../src/modules/Welcome/helpers/reducer';
import {ActionTypes} from '../../../../src/modules/Welcome/types';

describe('reducer function', () => {
  const initialState = {
    user: {
      cpf: '',
      password: '',
      lastAccess: null,
    },
    error: undefined,
  } as never;

  it('should handle SET_CPF action', () => {
    const action = {
      type: ActionTypes.SET_CPF,
      payload: '12345678909',
    } as never;

    const newState = reducer(initialState, action);

    expect(newState.user.cpf).toBe('12345678909');
    expect(newState.user.password).toBe('');
    expect(newState.error).toBeUndefined();
  });

  it('should handle SET_PASSWORD action', () => {
    const action = {
      type: ActionTypes.SET_PASSWORD,
      payload: 'securePassword',
    } as never;

    const newState = reducer(initialState, action);

    expect(newState.user.cpf).toBe('');
    expect(newState.user.password).toBe('securePassword');
    expect(newState.error).toBeUndefined();
  });

  it('should handle SET_ERROR action', () => {
    const action = {
      type: ActionTypes.SET_ERROR,
      payload: 'Invalid credentials',
    } as never;

    const newState = reducer(initialState, action);

    expect(newState.user.cpf).toBe('');
    expect(newState.user.password).toBe('');
    expect(newState.error).toBe('Invalid credentials');
  });

  it('should handle LOGIN action', () => {
    const action = {
      type: ActionTypes.LOGIN,
    } as never;

    const newState = reducer(initialState, action);

    expect(newState.user.cpf).toBe('');
    expect(newState.user.password).toBe('');
    expect(newState.error).toBeUndefined();
    expect(newState.user.lastAccess).toBeInstanceOf(Date);
  });

  it('should handle REGISTER action', () => {
    const action = {
      type: ActionTypes.REGISTER,
      payload: {
        user: {
          cpf: '98765432109',
          password: 'newPassword',
        },
      },
    } as never;

    const newState = reducer(initialState, action);

    expect(newState.user.cpf).toBe('98765432109');
    expect(newState.user.password).toBe('newPassword');
    expect(newState.error).toBeUndefined();
    expect(newState.user.lastAccess).toBeInstanceOf(Date);
  });

  it('should handle unknown action type', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    } as never;

    const newState = reducer(initialState, action);

    expect(newState).toBe(initialState);
  });
});
