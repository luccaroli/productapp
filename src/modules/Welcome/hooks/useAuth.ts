import {useReducer} from 'react';
import {validateCPF} from '../helpers/formatters';
import {StateType, ActionTypes, User} from '../types';
import {reducer} from '../helpers/reducer';
import Storage from '../../../services/storage';
import {useNavigation} from '@react-navigation/native';

const initialState: StateType = {
  user: {
    cpf: '',
    password: '',
  },
};

export function useAuth() {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);

  function setInputCPF(value: string) {
    dispatch({type: ActionTypes.SET_CPF, payload: value});
  }

  function setInputPassword(value: string) {
    dispatch({type: ActionTypes.SET_PASSWORD, payload: value});
  }

  function setError(error: {cpf?: string; password?: string}) {
    dispatch({type: ActionTypes.SET_ERROR, payload: error});
  }

  function login(user: User) {
    if (!validateCPF(state.user.cpf)) {
      setError({cpf: 'CPF inválido'});
      return;
    }

    if (user.cpf !== state.user.cpf || user.password !== state.user.password) {
      setError({password: 'Senha ou CPF incorretos'});
      return;
    }

    navigation.reset({index: 0, routes: [{name: 'Home'}]});
  }

  async function register() {
    if (!validateCPF(state.user.cpf)) {
      setError({cpf: 'CPF inválido'});
      return;
    }

    if (state.user.password.length < 8) {
      setError({password: 'Senha deve ter no mínimo 8 caracteres'});
      return;
    }

    await Storage.set('user', state.user);

    dispatch({
      type: ActionTypes.REGISTER,
      payload: {
        user: {
          cpf: state.user.cpf,
          password: state.user.password,
        },
      },
    });

    navigation.reset({index: 0, routes: [{name: 'Home'}]});
  }

  async function submit() {
    const user = await Storage.get<User>('user');
    if (user) {
      login(user);
    } else {
      register();
    }
  }

  return {
    cpf: state.user.cpf,
    password: state.user.password,
    error: state.error,
    setInputCPF,
    setInputPassword,
    setError,
    submit,
  };
}
