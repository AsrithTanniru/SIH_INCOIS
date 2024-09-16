import * as React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
// import ChangePasswordScreen from './ChangePassword';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';



SplashScreen.preventAutoHideAsync();
export default function ProfileScreen() {
    
    
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });
    
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require('../assets/user.png')}
                    style={styles.img}
                /> 
                <Text style={styles.name}>Asrith</Text>
                <Text style={styles.mail}>8923472022</Text>
                <Text style={styles.mail}>Andhra Pradesh</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.item} onPress={() => ('')}>
                    <Ionicons name="notifications" size={22} color="15719f" style={styles.icon} />
                    {/* <Icon name="notifications-outline" size={22} color="#15719f" style={styles.icon} /> */}
                    <Text style={styles.itemtext}>Notification Settings</Text>
                    <Icon name="chevron-right" style={styles.right} size={22} color="#15719f"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={()=>{}}>
                    <Entypo name="language" size={22} color="#15719f" style={styles.icon} />
                    {/* <Icon name="language" size={22} color="#15719f" style={styles.icon} /> */}
                    <Text style={styles.itemtext}>Language</Text>
                    <Icon name="chevron-right" style={styles.right} size={22} color="#15719f"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={()=>{}}>
                    <Icon name="logout" size={22} color="#15719f" style={styles.icon} />
                    <Text style={styles.itemtext}>LogOut</Text>
                    <Icon name="chevron-right" style={styles.right} size={22} color="#15719f"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:100,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',        
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20,
        width: '90%',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    name: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
    },
    mail: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
    },
    icon: {
        marginRight: 20,
        color: '#15719f',
        alignItems: 'center',
        paddingBottom:5,
        
    },
    item: {
        backgroundColor:'#ffffff',
        borderRadius:10,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 3,
        width:'90%',
        padding: 10,
        paddingVertical: 10, 
        paddingHorizontal: 16, 
    },
    itemtext:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:22,
        color:'#15719f',
        flex:1,
    },
});