import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

import List from './src/screens/List';
import Akun from './src/screens/Akun';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Detail from './src/screens/Detail';
<<<<<<< HEAD
import Payment1 from './src/screens/Payment/Payment1';
import Payment3 from './src/screens/Payment/Payment3';
=======
import PaymentScreen from './src/screens/Payment';
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen 
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={"home"} size={25} color="#A43333" />
        }} 
        name="Home" 
        component={Home} 
      />
      <Tab.Screen 
        options={{
          title: 'Daftar Mobil',
          tabBarIcon: () => <Icon name={"list"} size={25} color="#A43333" />
        }} 
        name="List" 
        component={List} 
      />
      <Tab.Screen 
        options={{
          title: 'Akun',
          tabBarIcon: () => <Icon name={"user"} size={25} color="#A43333" />
        }} 
        name="Profile" 
        component={Akun} 
      />
    </Tab.Navigator>
  )
}

function App() {
  return (
<<<<<<< HEAD
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{
              headerShown:false
            }} name="HomeTabs" component={Tabs} />
            <Stack.Screen options={{
              headerShown:false
            }} name="SignIn" component={SignIn} />
            <Stack.Screen options={{
              headerShown:false
            }} name="SignUp" component={SignUp} />
            <Stack.Screen options={{
              headerShown:false
            }} name="Detail" component={Detail} />
            <Stack.Screen options={{
              headerShown: false
            }} name="Payment1" component={Payment1} />
            <Stack.Screen options={{
              headerShown: false
            }} name="Payment3" component={Payment3} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
=======
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown:false
        }} name="HomeTabs" component={Tabs} />
        <Stack.Screen options={{
          headerShown:false
        }} name="SignIn" component={SignIn} />
        <Stack.Screen options={{
          headerShown:false
        }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{
          headerShown:false
        }} name="Detail" component={Detail} />
        <Stack.Screen options={{
          headerShown:false
        }} name="PaymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
  );
}

export default App;
