import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import Alertscreen from './Alerts';

function Header({onNotificationPress }) {
    const navigation=useNavigation();
    
    return (
        <View style={styles.headerContainer}>
            <View style={styles.searchContainer} >
            <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.locicon}/>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search.."
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.navigate('AlertScreen')}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#15719f',
        marginTop:20,
        height: 150,
        marginBottom:-30,
        marginTop:20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderRadius:20,
    },
    searchInput: {
        flex: 1,
        fontFamily:'Poppins_500Medium',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingHorizontal: 30,
        color: '#333',
        alignItems:'center',
    },
    iconContainer: {
        padding: 10,
    },
});

export default Header;
