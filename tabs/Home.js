import * as React from 'react';
import { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Homescreen(){
    return(
        <View style={styles.container}>
            <View style={styles.data}>
            <Text style={styles.text}>Current Location: Guntur</Text>
            <Text style={styles.text}>Nearest Beaches: Bapatla,Chirala</Text>
                        <Text style={styles.title}>Insights</Text>
            </View>

            <View style={styles.card}>
                        <Text style={styles.suit}>Suitability: Suitable</Text>
                        <Text style={styles.suit}>Rating: ☆☆☆</Text>
                        <Text style={styles.prec}>Precautions: Chance of Rainfall,Carry an Umbrella.</Text>
                        
                        
                        <TouchableOpacity style={styles.more}>
                            <Icon name="more-vert" style={styles.icon} size={19} color="#ffffff" />
                            <Text style={styles.moretext}>More</Text>
                        </TouchableOpacity>
                    </View>
        </View>
    );
}

styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    data:{
        marginTop:-300,
    },
    text:{
        fontFamily:'Poppins_500Medium',
        fontSize:19,
        marginLeft:13,
        marginTop:15,
    },
    card: {
        backgroundColor: '#62a1c7',
        borderColor:'#FFFFFF',
        borderWidth:1,
        padding: 10,
        paddingLeft:30,
        paddingTop:30,
        flexDirection: 'column',
        // alignitems: 'center',        
        borderRadius: 10,
        marginBottom: -120,
        marginTop: 40,
        margin:10,
        width: '90%',
        alignContent:'center',
        paddingBottom:20,
    },
    title:{
        fontFamily:'Poppins_600SemiBold',
        fontSize:18,
        marginTop:30,
    },
    
    suit:{
        fontFamily:'Poppins_500Medium',
        fontSize:20,
        // marginLeft:5,
        alignItems:'center',
        marginTop:4,
        color:'#FFFFFF',
    },
    prec:{
        fontFamily:'Poppins_500Medium',
        fontSize:18,
        // marginLeft:5,
        alignItems:'center',
        marginTop:4,
        color:'#FFFFFF',
    },
    
    moretext:{
        color:"#FFFFFF",
        fontFamily:'Poppins_500Medium',
        fontSize:16,
        marginTop:4,
    },
    more:{
        flexDirection:'row',
        marginLeft:-7,
        alignContent:'center',
        alignItems:'center',
    },
    icon:{
        alignItems:'center',
        // marginBottom:10,
    },
    title:{
        fontFamily:'Poppins_500Medium',
        fontSize:18,
        marginTop:50,
        marginBottom:-10,
        textAlign:'center',
    },
});

     