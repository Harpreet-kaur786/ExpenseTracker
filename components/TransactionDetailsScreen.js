
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import CalculatorModal from './CalculatorModal';
// import { FontAwesome5 } from '@expo/vector-icons';

// const TransactionDetailsScreen = ({ route, navigation }) => {
//   console.log('Received params:', route.params);

//   const transaction = route.params?.transaction;
//   const { transactions } = route.params || [];
//   const [isCalculatorVisible, setCalculatorVisible] = useState(false);

//   const toggleCalculator = () => {
//     setCalculatorVisible(!isCalculatorVisible);
//   };

//   if (!transaction) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Transaction Details</Text>
//         <Text style={styles.detail}>No transaction data found.</Text>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.backButtonText}>Back to Dashboard</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Transaction Details</Text>
//         <View style={styles.card}>
//           <Text style={styles.detail}><Text style={styles.label}>🆔 ID:</Text> {transaction.id}</Text>
//           <Text style={styles.detail}><Text style={styles.label}>📅 Date:</Text> {transaction.date}</Text>
//           <Text style={styles.detail}><Text style={styles.label}>💰 Amount:</Text> {transaction.amount}</Text>
//           <Text style={styles.detail}><Text style={styles.label}>🔄 Type:</Text> {transaction.type}</Text>
//           <Text style={styles.detail}><Text style={styles.label}>🏷️ Category:</Text> {transaction.category}</Text>
//           <Text style={styles.detail}><Text style={styles.label}>📍 Location:</Text> {transaction.location || 'N/A'}</Text>
//           <Text style={styles.detail}><Text style={styles.label}>📝 Description:</Text> {transaction.description || 'No description'}</Text>
//         </View>
//       </ScrollView>

//       <View style={styles.navbar}>
//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
//           <FontAwesome5 name="home" size={22} color="#8e44ad" />
//           <Text style={styles.navButtonText}>Home</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AllTransactionsScreen', { transactions })}>
//           <FontAwesome5 name="list" size={22} color="#8e44ad" />
//           <Text style={styles.navButtonText}>Transactions</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.addButtonContainer} onPress={() => navigation.navigate('AddTransactionScreen')}>
//           <View style={styles.addButton}>
//             <FontAwesome5 name="plus" size={24} color="white" />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
//           <FontAwesome5 name="user" size={22} color="#8e44ad" />
//           <Text style={styles.navButtonText}>Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navButton} onPress={toggleCalculator}>
//           <FontAwesome5 name="calculator" size={22} color="#8e44ad" />
//           <Text style={styles.navButtonText}>Calculator</Text>
//         </TouchableOpacity>
//       </View>

//       <CalculatorModal visible={isCalculatorVisible} onClose={toggleCalculator} />
//     </View>
//   );
// };

// export default TransactionDetailsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f8',
//   },
//   scrollContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 4,
//     width: '100%',
//   },
//   detail: {
//     fontSize: 18,
//     marginBottom: 8,
//     color: '#555',
//   },
//   label: {
//     fontWeight: 'bold',
//     color: '#8e44ad',
//   },
//   backButton: {
//     marginTop: 20,
//     backgroundColor: '#8e44ad',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },

//   navbar: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-around', 
//     alignItems: 'center',
//     paddingVertical: 10, 
//     backgroundColor: 'white', 
//     position: 'absolute', 
//     bottom: 0, 
//     width: '100%', 
//     height: 80, 
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
  
//   navButton: { 
//     alignItems: 'center',
//     justifyContent: 'center'
//   },

//   addButtonContainer: {
//     position: 'absolute',
//     bottom: 30,  
//     left: "50%",
//     transform: [{ translateX: -35 }],
//     backgroundColor: 'white',
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 6,
//   },

//   addButton: { 
//     backgroundColor: '#8e44ad', 
//     width: 60, 
//     height: 60, 
//     borderRadius: 30, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     elevation: 10,
//   },

//   navButtonText: {
//     fontSize: 12,             
//     fontWeight: 'bold',       
//     color: '#aaa',        
//     textAlign: 'center',      
//     marginTop: 3,             
//   },

//   activeText: {
//     color: '#8e44ad',
//   }
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CalculatorModal from './CalculatorModal';
import { FontAwesome5 } from '@expo/vector-icons';

const TransactionDetailsScreen = ({ route, navigation }) => {
  console.log('Received params:', route.params);

  const transaction = route.params?.transaction;
  const { transactions } = route.params || [];
  const [isCalculatorVisible, setCalculatorVisible] = useState(false);

  const toggleCalculator = () => {
    setCalculatorVisible(!isCalculatorVisible);
  };

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Transaction Details</Text>
        <Text style={styles.detail}>No transaction data found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Transaction Details</Text>
        <View style={styles.card}>
          <Text style={styles.detail}><Text style={styles.label}>🆔 ID:</Text> {transaction.id}</Text>
          <Text style={styles.detail}><Text style={styles.label}>📅 Date:</Text> {transaction.date}</Text>
          <Text style={styles.detail}><Text style={styles.label}>💰 Amount:</Text> {transaction.amount}</Text>
          <Text style={styles.detail}><Text style={styles.label}>🔄 Type:</Text> {transaction.type}</Text>
          <Text style={styles.detail}><Text style={styles.label}>🏷️ Category:</Text> {transaction.category}</Text>
          <Text style={styles.detail}><Text style={styles.label}>📍 Location:</Text> {transaction.location || 'N/A'}</Text>
          <Text style={styles.detail}><Text style={styles.label}>📝 Description:</Text> {transaction.description || 'No description'}</Text>
        </View>
      </ScrollView>

      <View style={styles.navbar}>
  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
    <FontAwesome5 name="home" size={25} color="#007b83" />
    <Text style={styles.navButtonText}>Home</Text>
  </TouchableOpacity>

  {/* <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AllTransactionsScreen', { transactions })}>
    <FontAwesome5 name="list" size={25} color="#007b83" />
    <Text style={styles.navButtonText}>Transaction</Text>
  </TouchableOpacity> */}

  <View style={styles.addButtonContainer}>
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTransactionScreen')}>
      <FontAwesome5 name="plus" size={24} color="white" />
    </TouchableOpacity>
  </View>

  {/* <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
    <FontAwesome5 name="user" size={25} color="#007b83" />
    <Text style={styles.navButtonText}>Profile</Text>
  </TouchableOpacity> */}

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

export default TransactionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    width: '100%',
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  label: {
    fontWeight: 'bold',
    color: '#8e44ad',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#8e44ad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
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