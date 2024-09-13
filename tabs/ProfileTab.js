import * as React from 'react';
import { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


export default function ProfileScreen(){
    return(
        <View style={styles.content}>
            <Text>Profile Screen</Text>
        </View>
    );
}

styles=StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:'#FFFFFF',
    }
});