import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet, 
  Animated, Dimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const shakeAnimation = useState(new Animated.Value(0))[0];

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.replace('Dashboard');
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      triggerShake();
      alert('Please enter both username and password.');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.replace('Dashboard');
    } else {
      triggerShake();
      alert('Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Upper Half: Image */}
      <View style={styles.imageContainer}>
        <Image source={require("../assets/pexels-n-voitkevich-6863180.jpg")} style={styles.image} />
      </View>

      {/* Login Card */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.cardContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View style={[styles.card, { transform: [{ translateX: shakeAnimation }] }]}> 
            <Text style={styles.title}>Welcome Back!</Text>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
              <TextInput 
                style={styles.input} 
                value={username} 
                onChangeText={setUsername} 
                placeholder="Enter Username" 
                autoCapitalize="none" 
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
              <TextInput 
                style={styles.input} 
                value={password} 
                onChangeText={setPassword} 
                placeholder="Enter Password" 
                secureTextEntry={!passwordVisible} 
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Ionicons 
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                  style={styles.iconRight} 
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.45,
    width: "100%",
    backgroundColor: "#f3f3f3",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  //  backgroundColor: "#5D7F67",
   
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    padding: 10,
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});