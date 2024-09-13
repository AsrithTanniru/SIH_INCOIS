import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Homescreen from './Home';
import Mapscreen from './Map';
import Alertscreen from './Alerts';
import ProfileScreen from './ProfileTab';
import Header from './Header';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons'; 
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';


SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

function Layout() {
    const [currentScreen, setCurrentScreen] = useState('TabNavigator'); 

    const backgroundColor = '#15719f';
    const backgroundColor2 = '#ffffff';
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
    });
    
    if (!fontsLoaded) {
        return null;
    }
    
    SplashScreen.hideAsync();

    const renderScreens = () => (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor }}>
            <StatusBar 
                backgroundColor={backgroundColor} 
                barStyle="dark-content"
            />
            <View style={{ flex: 1 }}>
                <Header  onNotificationPress={() => setCurrentScreen('Alerts')}/>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarActiveTintColor: '#ffffff',
                        tabBarInactiveTintColor: '#9e9e9e',
                        tabBarStyle: {
                            height: 60,
                            position: 'absolute',
                            bottom: 25,
                            left: 12,
                            right: 12,
                            borderRadius: 10,
                            paddingBottom: 5,
                            paddingTop: 5,
                            borderWidth: 0,
                            overflow: 'hidden',
                            backgroundColor: backgroundColor,
                        },
                        tabBarLabelStyle: {
                            // f/ontFamily: 'Poppins_500Medium',
                            fontSize: 12,
                        },
                        // tabBarLabel: () => null,
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
                        component={Mapscreen}
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

    return renderScreens();
}

export default Layout;

const styles = StyleSheet.create({
    tabbar: {
        margin: 12,
    }
});
