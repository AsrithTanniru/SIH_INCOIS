import * as React from 'react';
import { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


export default function Mapscreen(){
    return(
        <View style={styles.content}>
            <Text>Map Screen</Text>
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