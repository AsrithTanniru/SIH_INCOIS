import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import * as Location from 'expo-location';
import beachesData from './data/data.json';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
// import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


// import * as Notifications from 'expo-notifications';




// Function to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// Function to fetch and sort nearby beaches based on distance
const fetchNearbyBeaches = (currentLocation) => {
    const { latitude, longitude } = currentLocation;

    const beachesWithDistance = beachesData.map(beach => {
        const distance = getDistance(
            latitude, longitude,
            parseFloat(beach.Latitude), parseFloat(beach.Longitude)
        );
        return { ...beach, distance };
    });

    const sortedBeaches = beachesWithDistance.sort((a, b) => a.distance - b.distance);
    
    return sortedBeaches.slice(0, 2); // Return the nearest 2 beaches
};

// Function to determine alert level based on beach conditions
const determineAlertLevel = (beach) => {
    if (beach["Tsunami Alert"] === "Yes") {
        return 'red'; // High alert
    } else if (beach["Strong Ocean Currents"] === "Yes" || beach["High Wave Warning"] === "Yes") {
        return 'orange'; // Medium alert
    } else {
        return 'green'; // Low alert
    }
};

export default function Homescreen() {
    const [currentLocation, setCurrentLocation] = useState('Fetching location...');
    const [nearbyBeaches, setNearbyBeaches] = useState([]);
    const [alertDetails, setAlertDetails] = useState({
        suitability: '',
        highOceanCurrents: '',
        highWaveWarning: '',
        precautions: '',
    });
    const navigation = useNavigation();

    // Function to handle navigation to map screen
    const handleViewMap = () => {
        console.log('Navigating to map with markers:', nearbyBeaches);
        navigation.navigate('Map', { markers: nearbyBeaches });
    };
    

    // Dummy data for the hourly forecast
    const hourlyForecast = [
        { icon: 'water', temp: '6.4', time: 'Mg/L', color: '#1E90FF' }, // Dissolved O2
        { icon: 'cloudy', temp: '19.1', time: 'NTU', color: '#ffa911' }, // Turbidity
        { icon: 'rainy', temp: '54', time: 'Kmph', color: '#1E90FF' }, // Wind speed
        { icon: 'water', temp: '0.7', time: 'Mg/L', color: '#808080' }, // Hydrocarbons
    ];
    

  //location requesting
    const requestLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission Denied", "Location access denied");
                setCurrentLocation('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (address.length > 0) {
                const locationName = `${address[0].city}, ${address[0].region}`;
                setCurrentLocation(locationName);

                // Fetching and setting nearby beaches
                const beaches = fetchNearbyBeaches({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
                setNearbyBeaches(beaches);

                if (beaches.length > 0) {
                    const firstBeach = beaches[0];
                    const alertLevel = determineAlertLevel(firstBeach);
                    setAlertDetails({
                        suitability: alertLevel === 'green' ? 'Suitable' : `Not Suitable (${alertLevel} alert)`,
                        highOceanCurrents: firstBeach["Strong Ocean Currents"] || 'No',
                        highWaveWarning: firstBeach["High Wave Warning"] || 'No',
                        precautions: alertLevel !== 'green' ? 'Chance of Rainfall, Carry an Umbrella.' : 'None',
                    });
                }
            } else {
                setCurrentLocation('Unable to fetch location');
            }
        } catch (error) {
            console.error("Error fetching location: ", error);
            setCurrentLocation('Error fetching location');
        }
    };

    useEffect(() => {
        requestLocationPermission();
    }, []); // Empty dependency array ensures this runs only on component mount

    return (
        <View style={styles.container}>
            <Header currentLocation={currentLocation} />
            <View style={styles.tempContainer}>
                <Text style={styles.temperature}>26°C</Text>
                <View style={styles.tempInfo}>
                    <Text style={styles.tempDetail}>↑ 30°   ↓ 17°</Text>
                    <Text style={styles.beachesText}>Nearest Beaches: </Text>
                    {nearbyBeaches.length > 0 ? (
                        nearbyBeaches.map(beach => (
                            <View key={beach["Beach Name"]} style={styles.beachInfoContainer}>
                                <Text style={styles.beachText}>{beach["Beach Name"]}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.beachText}>No nearby beaches found</Text>
                    )}
                </View>
            </View>

            <View style={styles.hourlyForecastContainer}>
                {hourlyForecast.map((item, index) => (
                    <View key={index} style={styles.hourlyCard}>
                        <Ionicons name={item.icon} size={30} color={item.color} />
                        <Text style={styles.hourlyTemp}>{item.temp}</Text>
                        <Text style={styles.hourlyTime}>{item.time}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.insightsCard}>
                <Text style={styles.suit}>Suitability: {alertDetails.suitability}</Text>
                <Text style={styles.rating}>High Ocean Currents: {alertDetails.highOceanCurrents}</Text>
                <Text style={styles.rating}>High Wave Warning: {alertDetails.highWaveWarning}</Text>
                <Text style={styles.precaution}>Precautions: {alertDetails.precautions}</Text>

                <TouchableOpacity style={styles.moreButton} onPress={handleViewMap}>
                    <Entypo name="location-pin" size={19} color="#000000" />
                    <Text style={styles.moreText}>View Location on Map</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#20a7db',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    tempContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    temperature: {
        fontSize: 35,
        color: '#fff',
        fontFamily:'Poppins_500Medium',
    },
    tempInfo: {
        alignItems: 'center',
    },
    tempDetail: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins_400Regular',
        marginTop: -10,
    },
    locationText: {
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
        color: '#fff',
        marginTop: 10,
        flexDirection: 'row', // allow icon and text in the same row
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    
    beachesText: {
        fontSize: 18,
        fontFamily: 'Poppins_500Medium',
        color: '#fff',
        marginTop: 10,
        paddingLeft: 10, // keep the text aligned slightly in from the left
    },
    hourlyForecastContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        color:'#ffffff',
        justifyContent: 'space-between',
        
    },
    hourlyCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        margin:4,
        flex: 1,
    },
    hourlyTemp: {
        marginTop: 5,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Poppins_500Medium',
    },
    hourlyTime: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Poppins_400Regular',
    },
    insightsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
    },
    suit: {
        fontSize: 20,
        color: '#000000',
        fontFamily: 'Poppins_500Medium',
        marginBottom: 10,
    },
    rating: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'Poppins_500Medium',
        marginBottom: 10,
    },
    precaution: {
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Poppins_400Regular',
        marginBottom: 20,
    },
    moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        color: '#000000',
        fontFamily: 'Poppins_500Medium',
        marginLeft: 5,
        marginTop:3,
    },
    beachText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'Poppins_500Medium',
        // paddingLeft: 20,
    },
});
