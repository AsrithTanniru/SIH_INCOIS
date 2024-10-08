import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';

const SuccessScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('Layout'); // Navigate to the Layout screen
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.checkMark}>✓</Text>
      </View>
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subTitle}>Congratulations! You have been successfully authenticated</Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles omitted for brevity
// export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4DA6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkMark: {
    fontSize: 40,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Poppins_500Medium',
  },
  subTitle: {
    fontSize: 16,
    color: '#7b7878',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily:'Poppins_500Medium',
  },
  button: {
    backgroundColor: '#4DA6FF',
    height: 60,
    justifyContent: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    fontFamily:'Poppins_500Medium',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#f1f8fd',
    fontSize: 18,
    fontFamily:'Poppins_500Medium',
  },
});

export default SuccessScreen;
