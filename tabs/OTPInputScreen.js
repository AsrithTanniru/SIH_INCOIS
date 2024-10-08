import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OTPInputScreen = ({ route, navigation, setIsAuthenticated }) => {
  
  const [otp, setOtp] = useState('');
  const { phoneNumber } = route.params; // Extract phoneNumber from route params

  const handleOTPSubmit = () => {
    if (otp.trim() !== '') {
      // Simulate successful OTP verification
      setIsAuthenticated(true); // Mark user as authenticated
      navigation.navigate('Success');
    } else {
      console.log('OTP is required');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We have sent an OTP to {phoneNumber}</Text>
      <TextInput
        value={otp}
        onChangeText={text => setOtp(text)}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter OTP"
      />
      <TouchableOpacity onPress={handleOTPSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles omitted for brevity
// export default OTPInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    fontFamily:'Poppins_500Medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#7b7878',
    fontFamily:'Poppins_500Medium',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '95%',
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#57a6ea',
    borderRadius: 17,
    fontFamily:'Poppins_500Medium',
    marginBottom: 24,
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
    fontFamily:'Poppins_500Medium',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPInputScreen;
