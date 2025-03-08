
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icon library
import { Calendar } from 'react-native-calendars'; // Import Calendar component
import { FontAwesome5 } from '@expo/vector-icons';
import CalculatorModal from './CalculatorModal';
const AddTransactionScreen = ({ navigation, route }) => {
  const { transactions } = route.params || [];
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Format as YYYY-MM-DD
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [transactionType, setTransactionType] = useState('Credit');
  const [category, setCategory] = useState('Shopping');
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const handleAddTransaction = async () => {
    if (!amount || !description || !location) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      date,
      amount: parseFloat(amount),
      description,
      location,
      transactionType,
      category,
    };

    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
      transactions.push(newTransaction);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      Alert.alert('Success', 'Transaction added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  //Calculator const DashboardScreen = ({ navigation }) => {
    const [isCalculatorVisible, setCalculatorVisible] = useState(false);

    const toggleCalculator = () => {
      setCalculatorVisible(!isCalculatorVisible);
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      <View style={styles.card}>
        <Text style={styles.label}>📅 Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>{date}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <Calendar
            current={date}
            markedDates={{ [date]: { selected: true, selectedColor: 'blue' } }}
            onDayPress={(day) => {
              setDate(day.dateString);
              setShowDatePicker(false);
            }}
            style={styles.calendar}
          />
        )}

        <Text style={styles.label}>💰 Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
        />

        <Text style={styles.label}>📝 Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />

        <Text style={styles.label}>📍 Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />

        <Text style={styles.label}>Transaction Type</Text>
        <TouchableOpacity style={styles.transactionButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.transactionText}>{transactionType || "Select Transaction Type"}</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Icon name="close" size={30} color="#34495e" />
              </TouchableOpacity>
              {['Credit', 'Debit', 'Refund'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.option}
                  onPress={() => {
                    setTransactionType(type);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity style={styles.transactionButton} onPress={() => setCategoryModalVisible(true)}>
          <Text style={styles.transactionText}>{category}</Text>
        </TouchableOpacity>

        <Modal visible={categoryModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setCategoryModalVisible(false)}>
                <Icon name="close" size={30} color="#34495e" />
              </TouchableOpacity>
              {['Shopping', 'Food', 'Transport', 'Entertainment', 'Other'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.option}
                  onPress={() => {
                    setCategory(cat);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.submitButton} onPress={handleAddTransaction}>
  <Text style={styles.submitButtonText}>Submit Transaction</Text>
</TouchableOpacity>

      </View>
    
      <View style={styles.navbar}>
  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
    <FontAwesome5 name="home" size={25} color="#8e44ad" />
    <Text style={styles.navButtonText}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AllTransactionsScreen', { transactions })}>
    <FontAwesome5 name="list" size={25} color="#8e44ad" />
    <Text style={styles.navButtonText}>Transaction</Text>
  </TouchableOpacity>

  <View style={styles.addButtonContainer}>
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTransactionScreen')}>
      <FontAwesome5 name="plus" size={24} color="white" />
    </TouchableOpacity>
  </View>

  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
    <FontAwesome5 name="user" size={25} color="#8e44ad" />
    <Text style={styles.navButtonText}>Profile</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.navButton} onPress={toggleCalculator}>
    <FontAwesome5 name="calculator" size={25} color="#8e44ad" />
    <Text style={styles.navButtonText}>Calculator</Text>
  </TouchableOpacity>

  {/* Show CalculatorModal when isCalculatorVisible is true */}
  <CalculatorModal visible={isCalculatorVisible} onClose={toggleCalculator} />
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#34495e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
    fontSize: 16,
    backgroundColor: '#f5f6fa',
  },
  transactionButton: {
    backgroundColor: '#e1e8ed',
    padding: 14,
    borderRadius: 10,
    marginTop: 6,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  option: {
    padding: 16,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  calendar: {
    marginTop: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
   navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingVertical: 10, 
    backgroundColor: 'white', 
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
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  addButton: { 
    backgroundColor: '#8e44ad', 
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
    color: '#aaa',        
    textAlign: 'center',      
    marginTop: 3,             
  },

  activeText: {
    color: '#8e44ad',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default AddTransactionScreen;
