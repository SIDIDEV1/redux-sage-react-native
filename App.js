import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import createSagaMiddleware from "redux-saga";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import reducers from "./configRedux/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import saga from "./configRedux/saga";
import UsersList from "./screens/UsersListScreen";
import AboutScreen from './screens/AboutScreen';
import { Feather } from '@expo/vector-icons';
import colors from './colors/colors';


export default function App() {

  const Stack = createNativeStackNavigator()
  const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
    }
    );
    sagaMiddleware.run(saga);
    return store
  };

  return (
    <Provider store={createStore()}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='home'
              component={UsersList}
              options={() => ({
                headerShown: false,
                headerBackTitle: 'home'
              })}
            />
            <Stack.Screen
              name='About'
              component={AboutScreen}
              options={({ route, navigation }) => ({
                title: route.params.item.name,
                headerBackTitle: 'home',
                headerRight: () => (
                  <TouchableOpacity>
                    <Feather name="edit" size={22} color={colors.secondary} />
                  </TouchableOpacity>
                ),
                // headerLeft: () => (
                //   <TouchableOpacity onPress={() => navigation.goBack()}>
                //     <Text style={{ fontSize: 18, color: 'red' }}>{route.params.numberEmployee}</Text>
                //   </TouchableOpacity>
                // ),
                // headerBackTitle: 'back lol'
              })}

            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
