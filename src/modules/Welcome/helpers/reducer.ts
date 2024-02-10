import {ActionTypes, Actions, StateType} from '../types';

export function reducer(state: StateType, action: Actions): StateType {
  switch (action.type) {
    case ActionTypes.SET_CPF:
      return {
        ...state,
        user: {
          ...state.user,
          cpf: action.payload,
        },
      };

    case ActionTypes.SET_PASSWORD:
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload,
        },
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.LOGIN:
      return {
        ...state,
        user: {
          cpf: state.user.cpf,
          password: state.user.password,
          lastAccess: new Date(),
        },
        error: undefined,
      };

    case ActionTypes.REGISTER:
      return {
        user: {
          cpf: action.payload.user.cpf,
          password: action.payload.user.password,
          lastAccess: new Date(),
        },
        error: undefined,
      };

    default:
      return state;
  }
}
