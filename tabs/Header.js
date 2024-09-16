import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Homescreen from './Home';

function Header({ currentLocation }) {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.searchContainer}>
                <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.locicon}/>
                <Text style={styles.locationText}>{currentLocation}</Text>
            </View>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('AlertScreen')}>
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
        marginTop:40,
        padding: 10,
        justifyContent: 'space-between',
        width:300,
        width: '100%', // Change width to 100%
        height: 70,
        margin:40,
        // paddingHorizontal: 20, // Adjust padding for better spacing
        // paddingVertical: 10,
        // position: 'absolute', // Optional: Makes the header fixed at the top
        // top: 0, // Ensure it is at the top
        left: -40,
        // right:-30, 
        borderRadius:10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins_400Regular',
        marginLeft: 1,
        marginTop:4,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    iconContainer: {
        padding: 10,
    },
    locicon: {
        marginRight: 5,
    },
});

export default Header;
