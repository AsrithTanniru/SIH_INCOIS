import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Homescreen from './Home';
import MapScreen from './Map';
import Alertscreen from './Alerts';
import ProfileScreen from './ProfileTab';
import Header from './Header';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons'; 
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

function Layout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
    });
    
    if (!fontsLoaded) {
        return null;
    }
    
    SplashScreen.hideAsync();

    const backgroundColor = '#ffffff';
    const backgroundColor2 = '#15719f';

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor }}>
            <StatusBar 
                backgroundColor={backgroundColor2} 
                barStyle="dark-content"
            />
            {/* <Header /> */}
            <View style={{ flex: 1 }}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarActiveTintColor: '#15719f',
                        tabBarInactiveTintColor: '#15719f',
                        tabBarStyle: {
                            height: 80,
                            position: 'absolute',
                            bottom: -9,
                            left: 0.5,
                            right: 0.5,
                            borderRadius: 15,
                            paddingBottom: 5,
                            paddingTop: 5,
                            borderWidth: 0,
                            overflow: 'hidden',
                            backgroundColor: backgroundColor,
                        },
                        tabBarLabelStyle: {
                            fontSize: 13,
                            marginBottom:6,
                        },
                        tabBarIcon: ({ color, focused }) => {
                            let iconName;
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Map') {
                                iconName = focused ? 'map' : 'map-outline';
                            } else if (route.name === 'Profile') {
                                iconName = focused ? 'person' : 'person-outline';
                            }
                            return <Ionicons name={iconName} size={28} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen 
                        name="Home"
                        component={Homescreen}
                        options={{ headerShown: false }} 
                    />
                    <Tab.Screen
                        name="Map"
                        component={MapScreen}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen 
                        name="Profile"
                        component={ProfileScreen} 
                        options={{ headerShown: false }} 
                    />
                </Tab.Navigator>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Layout;

const styles = StyleSheet.create({
    tabbar: {
        margin: 12,
    }
});