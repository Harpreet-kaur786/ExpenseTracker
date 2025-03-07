import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import CalculatorModal from './CalculatorModal';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation, route }) => {
  const { transactions } = route.params || [];
  const [isCalculatorVisible, setCalculatorVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('John Doe'); // Default username

  const toggleCalculator = () => {
    setCalculatorVisible(!isCalculatorVisible);
  };

  // Function to pick an image from the library
  const pickImage = async () => {
    // Request permission for image picker
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access camera roll is required.');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri); // Update the profile picture
    }
  };

  // Function to handle username change
  const handleNameChange = (newName) => {
    setUsername(newName);
  };

  // Function to handle logout (navigating to the SignInScreen)
  const handleLogout = () => {
    navigation.navigate('SignIn'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Welcome to your profile!</Text>
      <Text style={styles.text}>You can update your information here.</Text>

      {/* Profile Picture Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
          <Image
            source={profilePic ? { uri: profilePic } : require('../assets/icon.png')}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.usernameInput}
          value={username}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.editButton} onPress={() => alert('Profile saved')}>
          <Text style={styles.editButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  profilePicContainer: {
    borderWidth: 5,
    borderColor: '#8e44ad',
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  usernameInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#8e44ad',
    width: 200,
    marginTop: 10,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#8e44ad',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  userInfo: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
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
  }
});

export default ProfileScreen;
