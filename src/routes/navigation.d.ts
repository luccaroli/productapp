export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Menu: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
