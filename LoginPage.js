import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginPage = ({ onLoginSuccess }) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigation = useNavigation(); // Use useNavigation hook

  const handleLogin = () => {
    if (user.username === 'beats' && user.password === 'abc') {
      onLoginSuccess(); // Call onLoginSuccess upon successful login
      navigation.navigate('Home'); // Navigate to the home page
    } else {
      setError('Incorrect Username or Password');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username" //username - beats 
        onChangeText={(text) => setUser({ ...user, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password" //pass- abc
        secureTextEntry={true}
        onChangeText={(text) => setUser({ ...user, password: text })}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    padding: 20,
  },
  heading: {
    color: '#1db954',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1db954',
    padding: 15,
    width: '80%',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginPage;
