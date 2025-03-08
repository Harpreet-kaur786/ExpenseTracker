import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, Switch } from 'react-native';
import CalculatorModal from './CalculatorModal';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation, route }) => {
  const { transactions } = route.params || [];
  const [isCalculatorVisible, setCalculatorVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('Admin'); 
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleCalculator = () => {
    setCalculatorVisible(!isCalculatorVisible);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access camera roll is required.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };
  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Profile</Text>
      <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
        <Image source={profilePic ? { uri: profilePic } : require('../assets/icon.png')} style={styles.profilePic} />
      </TouchableOpacity>
      <View style={styles.usernameContainer}>
        {isEditing ? (
          <TextInput
            style={[styles.usernameInput, darkMode && styles.darkInput]}
            value={username}
            onChangeText={setUsername}
          />
        ) : (
          <Text style={[styles.username, darkMode && styles.darkText]}>{username}</Text>
        )}
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <FontAwesome5 name={isEditing ? 'check' : 'edit'} size={20} color={darkMode ? 'white' : '#8e44ad'} />
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Text style={[styles.darkModeText, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

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
      </View>

      <CalculatorModal visible={isCalculatorVisible} onClose={toggleCalculator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#FAF3E0' },
  darkContainer: { backgroundColor: '#333' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  darkText: { color: 'white' },
  profilePicContainer: { marginTop: 20, borderWidth: 5, borderColor: '#8e44ad', borderRadius: 50, overflow: 'hidden' },
  profilePic: { width: 120, height: 120, borderRadius: 60 },
  usernameContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  username: { fontSize: 20, fontWeight: 'bold', marginRight: 10 },
  usernameInput: { fontSize: 20, borderBottomWidth: 1, borderBottomColor: '#8e44ad', width: 200, textAlign: 'center' },
  darkInput: { color: 'white', borderBottomColor: 'white' },
  logoutButton: { marginTop: 20, backgroundColor: '#e74c3c', padding: 10, borderRadius: 25 },
  logoutButtonText: { color: 'white', fontSize: 16 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  darkModeText: { fontSize: 16, marginRight: 10 },

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
    color: '#aaa',  
    textAlign: 'center',      
    marginTop: 3,             
  },

  activeText: {
    color: '#8e44ad', 
  },
});

export default ProfileScreen;
