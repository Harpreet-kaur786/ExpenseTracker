
import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { Alert } from 'react-native';
import CalculatorModal from './CalculatorModal';


const DashboardScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState('9400.0');
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  const handleLogout = async () => {
    // Clear the user session (you can use AsyncStorage for this)
    await AsyncStorage.removeItem('isLoggedIn');  // Adjust this according to your auth system

    // Navigate to the SignIn screen
    navigation.navigate('SignIn');
  };

  useEffect(() => {
    loadTransactions();
    setCurrentDate(getCurrentDate());
  }, []);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const loadTransactions = async () => {
    const storedTransactions = await AsyncStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  };

  const calculateBalance = () => {
    let inc = 0, exp = 0;
    transactions.forEach((item) => {
      if (item.type === 'Income') {
        inc += parseFloat(item.amount);
      } else {
        exp += parseFloat(item.amount);
      }
    });
    setIncome(inc);
    setExpenses(exp);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return today.toLocaleDateString('en-US', options).toUpperCase();
  };

  const handleTransactionClick = (item) => {
    // Navigate to the transaction details screen
    navigation.navigate('TransactionDetailsScreen', { transaction: item });
  };


 
const deleteTransaction = (transactionId) => {
  // Show a confirmation alert
  Alert.alert(
    "Confirm Deletion",  // Title of the alert
    "Are you sure you want to delete this transaction?",  // Message
    [
      {
        text: "Cancel", // Cancel button
        onPress: () => console.log("Deletion cancelled"),
        style: "cancel"
      },
      {
        text: "Delete", // Delete button
        onPress: async () => {
          // Filter out the transaction to delete
          const updatedTransactions = transactions.filter(item => item.id !== transactionId);
          
          // Update the state with the new list of transactions
          setTransactions(updatedTransactions);
          
          // Update AsyncStorage with the new list
          await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
          
          console.log("Transaction deleted");
        }
      }
    ],
    { cancelable: false }  // Prevent closing alert by tapping outside
  );

  
};



//Calculator const DashboardScreen = ({ navigation }) => {
  const [isCalculatorVisible, setCalculatorVisible] = useState(false);

  const toggleCalculator = () => {
    setCalculatorVisible(!isCalculatorVisible);
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#EFE7DA', '#B39F8F']} style={styles.header}>
        <View style={styles.profileSection}>
          <Text style={styles.date}>{currentDate}</Text>
          <TouchableOpacity>
            <FontAwesome5 name="user-circle" size={24} color="black" />
          </TouchableOpacity>
            {/* Logout Button */}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.accountBalanceText}>Account Balance</Text>
        <TextInput 
          style={styles.balanceInput}
          value={totalBalance}
          onChangeText={setTotalBalance}
          keyboardType="numeric"
        />
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBoxGreen}>
            <Text style={styles.summaryTitle}>Income</Text>
            <Text style={styles.summaryValue}>{income}</Text>
          </View>
          <View style={styles.summaryBoxRed}>
            <Text style={styles.summaryTitle}>Expenses</Text>
            <Text style={styles.summaryValue}>{expenses}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.transactionFilter}>
        <TouchableOpacity style={styles.filterButtonActive}><Text>Today</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Week</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Month</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Year</Text></TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTransactionClick(item)}>
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                {item.type === 'Income' ? '⬆️' : '⬇️'} ₹{item.amount}
              </Text>
              <Text style={styles.transactionCategory}>{item.category}</Text>
              <TouchableOpacity onPress={() => deleteTransaction(item.id)}>
              <FontAwesome5 name="trash-alt" size={20} color="red" />
              </TouchableOpacity>
            </View>
               {/* Delete Button */}
          </TouchableOpacity>
          
        )}
      /> 

<View style={styles.navbar}>
  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
    <FontAwesome5 name="home" size={25} color="#007b83" />
    <Text style={styles.navButtonText}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AllTransactionsScreen', { transactions })}>
    <FontAwesome5 name="list" size={25} color="#007b83" />
    <Text style={styles.navButtonText}>Transaction</Text>
  </TouchableOpacity>

  <View style={styles.addButtonContainer}>
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTransactionScreen')}>
      <FontAwesome5 name="plus" size={24} color="white" />
    </TouchableOpacity>
  </View>

  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
    <FontAwesome5 name="user" size={25} color="#007b83" />
    <Text style={styles.navButtonText}>Profile</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.navButton} onPress={toggleCalculator}>
    <FontAwesome5 name="calculator" size={25} color="#007b83" />
    <Text style={styles.navButtonText}>Calculator</Text>
  </TouchableOpacity>

  {/* Show CalculatorModal when isCalculatorVisible is true */}
  <CalculatorModal visible={isCalculatorVisible} onClose={toggleCalculator} />
</View>


    </View>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8E8E8' }, // Slightly darker background
  header: { 
    paddingHorizontal: 15,
    backgroundColor: 'linear-gradient(to right, #4DCCAE, #FAF3E0)', // Gradient from soft teal to warm yellow
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 4, // Subtle elevation for depth
  },
  
  
  
  profileSection: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
  },
  
  logoutButton: { 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    backgroundColor: '#E74C3C', 
    borderRadius: 12, // Consistent radius
    borderWidth: 1, 
    borderColor: '#D63031',
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 4, 
    elevation: 3, 
  },
  
  date: { 
    fontSize: 14, 
    color: '#333', // Consistent color for text
    fontWeight: '500', 
    textAlign: 'center', 
  },
  
  accountBalanceText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 8, 
    color: '#333', // Consistent color for text
  },
  
  balanceInput: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 5, 
    color: '#2C3E50', 
    letterSpacing: 0.5, 
  },
  
  summaryContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 15, 
    padding: 15, 
    borderRadius: 15, // Uniform radius
  },
  
  summaryBoxGreen: { 
    backgroundColor: '#2ECC71', 
    padding: 12, 
    borderRadius: 15, // Uniform radius
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 4, 
    borderWidth: 2, 
    borderColor: '#239B56', 
  },
  
  summaryBoxRed: { 
    backgroundColor: '#E74C3C', 
    padding: 12, 
    borderRadius: 15, // Uniform radius
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 4, 
    borderWidth: 2, 
    borderColor: '#C0392B', 
  },
  
  summaryTitle: { 
    fontSize: 14, 
    color: 'white', 
    fontWeight: '600', 
    letterSpacing: 0.5, 
  },
  
  summaryValue: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'white', 
    letterSpacing: 0.5, 
  },
  
  transactionFilter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: '#FAF3E0',
    borderWidth: 2, 
    borderColor: '#007b83',
  },
  
  filterButtonActive: {
    backgroundColor: '#007b83', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#005f62', 
  },
  
  filterButton: {
    borderWidth: 2,
    borderColor: '#007b83',
    backgroundColor: 'rgba(0, 123, 131, 0.1)', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    opacity: 0.9,
  },
  
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.5,
  },
  
  transactionItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 12, 
    backgroundColor: '#FAF3E0', 
    marginVertical: 6, 
    borderRadius: 15, // Consistent radius
    borderWidth: 1, 
    borderColor: '#D1C5E4', 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3, 
  },
  
  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingVertical: 10, 
    backgroundColor: '#F4F4F4', // Light background
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    height: 80, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  
  navButton: { 
    alignItems: 'center',
    justifyContent: 'center'
  },

  addButtonContainer: {
    position: 'absolute',
    bottom: 30,  
    left: "50%",
    transform: [{ translateX: -35 }],
    backgroundColor: '#F4F4F4', 
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  addButton: { 
    backgroundColor: '#007b83', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 10,
  },

  navButtonText: {
    fontSize: 12,             
    fontWeight: 'bold',       
    color: '#aaa',  // Soft gray for inactive icon
    textAlign: 'center',      
    marginTop: 3,             
  },

  activeText: {
    color: '#8e44ad', // Active color matching branding
  },
});
