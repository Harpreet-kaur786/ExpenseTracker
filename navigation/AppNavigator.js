import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../components/SignInScreen';
import DashboardScreen from '../components/DashboardScreen';
import TransactionDetailsScreen from '../components/TransactionDetailsScreen';
import AddTransactionScreen from '../components/AddTransactionScreen';
import CalculatorModal from '../components/CalculatorModal';
import AllTransactionScreen from '../components/AllTransactionScreen';
import ProfileScreen from '../components/ProfileScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="TransactionDetailsScreen" component={TransactionDetailsScreen} />
        <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
      <Stack.Screen name="CalculatorModal" component={CalculatorModal} />
      <Stack.Screen name="AllTransactionsScreen" component={AllTransactionScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;


