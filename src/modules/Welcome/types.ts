export enum ActionTypes {
  SET_CPF = 'SET_CPF',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_ERROR = 'SET_ERROR',
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
}

export type User = {
  cpf: string;
  password: string;
  lastAccess?: Date;
};

export type Actions =
  | {type: ActionTypes.SET_CPF; payload: string}
  | {type: ActionTypes.SET_PASSWORD; payload: string}
  | {type: ActionTypes.REGISTER; payload: {user: User}}
  | {type: ActionTypes.LOGIN}
  | {type: ActionTypes.SET_ERROR; payload: {cpf?: string; password?: string}};

export type StateType = {
  user: User;
  error?: {cpf?: string; password?: string};
};
