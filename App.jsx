import React from 'react';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { ActivityIndicator } from 'react-native';
import List from './src/screens/List';
import Akun from './src/screens/Akun';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Detail from './src/screens/Detail';
import Payment1 from './src/screens/Payment/Payment1';
import Payment4 from './src/screens/Payment/Payment4';
import Payment5 from './src/screens/Payment/Payment5';
import ListOrder from './src/screens/order/ListOrder';
import EditProfile from './src/screens/EditProfile';
import TicketScreen from './src/screens/Payment/Payment6';
import OlehOlehScreen from './src/screens/olehOleh/olehOleh';

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
          headerShown: true,
          title: 'Daftar Mobil',
          tabBarIcon: () => <Icon name={"list"} size={25} color="#A43333" />
        }} 
        name="List" 
        component={List} 
      />
      <Tab.Screen 
        options={{
          headerShown: true,
          title: 'Daftar Order',
          tabBarIcon: () => <Icon name={"shopping-cart"} size={25} color="#A43333" />
        }} 
        name="ListOrder" 
        component={ListOrder} 
      />
      <Tab.Screen 
        options={{
          headerShown: true,
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
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
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
            }} name="EditProfile" component={EditProfile} />
            <Stack.Screen options={{
              headerShown:false
            }} name="ListOrder" component={ListOrder} />
            <Stack.Screen options={{
              headerShown: false
            }} name="Payment1" component={Payment1} />
            <Stack.Screen options={{
              headerShown: false
            }} name="Payment4" component={Payment4} />
            <Stack.Screen options={{
              headerShown: false
            }} name="Payment5" component={Payment5} />
            <Stack.Screen options={{
              headerShown: false
            }} name="TicketScreen" component={TicketScreen} />
            <Stack.Screen options={{
              headerShown: false
            }} name="OlehOlehScreen" component={OlehOlehScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
