import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';


const OTPVerificationScreen = ({ navigation, setIsAuthenticated }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (phoneNumber.trim() !== '') {
      navigation.navigate('OTPInput', { phoneNumber });
    } else {
      console.log('Phone number is required');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Verification.jpg')} style={styles.logo} />
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter your phone number to send a one-time password</Text>
      <Text style={styles.phone}>Phone Number</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="+91 8324729443"
      />
      <TouchableOpacity onPress={handleContinue} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles omitted for brevity
// export default OTPVerificationScreen;


const styles = StyleSheet.create({
  logo: {
    height: 230,
    width: 230,
    marginBottom: 60,
    marginRight:40,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginTop:20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    marginLeft:-175,
    fontFamily:'Poppins_500Medium',
  },
  phone: {
    fontSize: 16,
    color: '#020c13',
    fontWeight: '500',
    marginBottom: 20,
    marginLeft:-220,
    fontFamily:'Poppins_500Medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#7b7878',
    fontWeight: 'bold',
    marginBottom: 24,
    marginLeft:7,
    fontFamily:'Poppins_500Medium',
    // textAlign: 'center',
  },
  input: {
    color: '#4d4d4d',
    width: '95%',
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#57a6ea',
    borderRadius: 17,
    marginBottom: 24,
    fontFamily:'Poppins_500Medium',
  },
  button: {
    height: 60,
    width: '90%',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: '#57a6ea',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f1f8fd',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});

export default OTPVerificationScreen;
