import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    // Check if email or password is empty
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.102:8080/api/login', {
        email,
        password,
      });

      // Check the role from the response
      if (response.data.role === 'User') {
        setEmail('');
        setPassword('');
        // Navigate to AfterloginUser and pass user ID
        navigation.navigate('AfterloginUser', { userId: response.data.id });
      } else if (response.data.role === 'Manager') {
        setEmail('');
        setPassword('');
        // Navigate to AfterloginAdmin and pass manager ID
        navigation.navigate('AfterloginAdmin', { managerId: response.data.id });
      } else {
        // Handle other roles if needed
        alert('Unknown role');
      }

    } catch (error) {
      // Handle error, e.g., show an error message
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <Image source={require('../images/Logo.png')} style={styles.image} />
      </View>
      <View style={styles.lowerRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Identifier</Text>
          <TextInput
            style={styles.input}
            placeholder="John doe"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.passwordTextInput}
              secureTextEntry={!passwordVisible}
              placeholder="* * * * * * * "
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
              <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
          <View style={styles.linkContainer}>
            <Text style={styles.belowButtonText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignupScreen');
              }}
            >
              <Text style={styles.signUpLink}>Create New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  upperRow: {
    flex: 0.30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerRow: {
    flex: 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  image: {
    aspectRatio: 1,
    flex: 0.8,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    margin: 3,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#F6F6F7',
    borderColor: '#ff7424',
    borderRadius: 20,
    padding: 10,
  },
  passwordInput: {
    marginTop: 10,
    backgroundColor: '#F6F6F7',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
  },
  passwordTextInput: {
    flex: 1,
  },
  togglePasswordButton: {
    padding: 5,
  },
  button: {
    backgroundColor: '#c83e84',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    height: 70,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  belowButtonText: {
    marginTop: 10,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpLink: {
    marginLeft: 5,
    color: '#c83e84',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default LoginScreen;
