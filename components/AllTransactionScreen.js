import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CalculatorModal from './CalculatorModal';
const AllTransactionScreen = ({ route, navigation }) => {
  const { transactions } = route.params;
  const [isCalculatorVisible, setCalculatorVisible] = useState(false);

  const toggleCalculator = () => {
    setCalculatorVisible(!isCalculatorVisible);
  };

  const handleTransactionClick = (item) => {
    navigation.navigate('TransactionDetailsScreen', { transaction: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transactions</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}><Text>⬇️ Month</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>⬇️ All</Text></TouchableOpacity>
      </View>
      
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTransactionClick(item)}>
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionCategory}>{item.category}</Text>
                <Text style={styles.transactionDescription}>{item.description}</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={[styles.transactionAmount, item.type === 'Income' ? styles.income : styles.expense]}>
                  {item.type === 'Income' ? '+' : '-'} ₹{item.amount}
                </Text>
                <Text style={styles.transactionTime}>{item.time}</Text>
              </View>
            </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FAF3E0' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  filterButton: { padding: 10, borderRadius: 20, backgroundColor: 'white', elevation: 3 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: 'white', marginVertical: 5, borderRadius: 10 },
  transactionCategory: { fontSize: 16, fontWeight: 'bold' },
  transactionDescription: { fontSize: 12, color: '#888' },
  transactionTime: { fontSize: 12, color: '#888', textAlign: 'right' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  income: { color: 'green' },
  expense: { color: 'red' },
  
  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingVertical: 10, 
    backgroundColor: '#F4F4F4', 
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
    marginLeft: 20,
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
    color: '#8e44ad', 
  },
 
});

export default AllTransactionScreen
