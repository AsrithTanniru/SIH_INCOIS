import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

export default function MapScreen() {
    const route = useRoute();
    const [markers, setMarkers] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [region, setRegion] = useState({
        latitude: 15.9383, // Default coordinates
        longitude: 80.9861,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const darkMapStyle = [
        { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
        { "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
        { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#424242" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#2c2c2c" }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#3c3c3c" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#4BAAC8" }] }
    ];

    useEffect(() => {
        if (route.params?.markers) {
            setMarkers(route.params.markers);
        }
    }, [route.params?.markers]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = markers.filter(marker =>
                marker["Beach Name"].toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMarkers(filtered);
        } else {
            setFilteredMarkers(markers);
        }
    }, [searchQuery, markers]);

    useEffect(() => {
        const { selectedLocation } = route.params || {};
        if (selectedLocation) {
            setRegion({
                latitude: parseFloat(selectedLocation.Latitude),
                longitude: parseFloat(selectedLocation.Longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [route.params?.selectedLocation]);

    const handleSubmit = () => {
        const selectedMarker = filteredMarkers.find(marker =>
            marker["Beach Name"].toLowerCase() === searchQuery.toLowerCase()
        );
        if (selectedMarker) {
            setRegion({
                latitude: parseFloat(selectedMarker.Latitude),
                longitude: parseFloat(selectedMarker.Longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } else {
            Alert.alert('No results', 'No matching beaches found.');
        }
    };

    const getMarkerColor = (marker) => {
        if (marker["High Wave Warning"] === "TRUE") {
            return 'red'; // High wave warning - red marker
        } else if (marker["Strong Ocean Currents"] === "TRUE") {
            return 'orange'; // Strong ocean currents - orange marker
        } else {
            return '#004000'; // Safe conditions - green marker
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search beaches..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                onSubmitEditing={handleSubmit} // Handle the 'Submit' button press
            />
            <MapView
                style={styles.map}
                region={region}
                customMapStyle={darkMapStyle}
            >
                {filteredMarkers.map((marker, index) => (
                    marker.Latitude && marker.Longitude ? (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(marker.Latitude),
                                longitude: parseFloat(marker.Longitude),
                            }}
                            pinColor={getMarkerColor(marker)} // Set marker color based on conditions
                        >
                            <Callout>
                                <View>
                                    <Text>{marker["Beach Name"]}</Text>
                                    <Text>High Wave Warning: {marker["High Wave Warning"]}</Text>
                                    <Text>Wind Speed: {marker["Wind Speed (km/h)"]} km/h</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ) : null
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchInput: {
        height: 50,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 16,
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        margin: 10,
        alignSelf: 'center',
    },
});
