import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install the icon library
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async () => {
    // Check if the name (nom) is empty or only contains whitespace
    if (nom.trim() === '') {
      // Name is empty
      alert('Please enter your name.');
      return;
    }

    // Add similar validations for other fields...

  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <Image
            source={require('../images/Logo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.lowerRow}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={nom}
              onChangeText={(text) => setNom(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Prenom</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={prenom}
              onChangeText={(text) => setPrenom(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={telephone}
              onChangeText={(text) => setTelephone(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Example@gmail.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.passwordTextInput}
                secureTextEntry={!passwordVisible}
                placeholder="********"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.togglePasswordButton}
              >
                <Icon
                  name={passwordVisible ? 'eye-slash' : 'eye'} 
                  size={20}
                  color="#000" // Change the color as needed
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignup}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
              <Text style={styles.belowButtonText}>You already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}
              >
                <Text style={styles.signUpLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    marginTop:1,
    flex: 0.7,
    backgroundColor: 'white',

  },
  image: {
    height: 60, 
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : 30,
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

export default SignupScreen;
