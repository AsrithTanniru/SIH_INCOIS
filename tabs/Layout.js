import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from './Home.js';
import MapScreen from './Map.js'; // Ensure the correct path
import ProfileScreen from './ProfileTab.js';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import beachesData from './data/data.json'; // Adjust the path as needed

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

function MapHeader({ onSearch, searchQuery, suggestions, onSuggestionPress }) {
    return (
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <Ionicons name="location-outline" size={30} color="#ffffff" style={styles.locicon} />
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search beaches..."
                value={searchQuery}
                onChangeText={onSearch}
            />
            <TouchableOpacity style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={32} color="#fff" />
            </TouchableOpacity>
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item["Beach Name"]}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onSuggestionPress(item)}>
                            <Text style={styles.suggestion}>{item["Beach Name"]}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionList}
                />
            )}
        </View>
    );
}

function Layout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    if (!fontsLoaded) {
        return null;
    }

    SplashScreen.hideAsync();

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filteredSuggestions = beachesData.filter((item) =>
            item["Beach Name"].toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionPress = (item) => {
        setSearchQuery(item["Beach Name"]);
        setSelectedLocation(item); // Update selected location
        setSuggestions([]);
    };

    const backgroundColor = '#ffffff';
    const backgroundColor2 = '#15719f';

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor }}>
            <StatusBar 
                backgroundColor={backgroundColor2} 
                barStyle="dark-content"
            />
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
                            marginBottom: 6,
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
                        initialParams={{ selectedLocation }}
                        options={{
                            headerTitle: () => (
                                <MapHeader 
                                    onSearch={handleSearch}
                                    searchQuery={searchQuery}
                                    suggestions={suggestions}
                                    onSuggestionPress={handleSuggestionPress}
                                />
                            ),
                            headerStyle: {
                                backgroundColor: '#15719f',
                                height: 130,
                            },
                        }}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15719f',
        padding: 8,
    },
    searchInput: {
        height: 50,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 16,
        marginLeft: 10,
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
    },
    locicon: {
        marginBottom: 4,
        // marginRight: 9,
    },
    iconContainer: {
        // marginLeft: 6,
    },
    suggestionList: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 10,
        maxHeight: 200,
        zIndex: 1000,
    },
    suggestion: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});
