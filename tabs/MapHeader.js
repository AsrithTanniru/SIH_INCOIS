import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MapHeader = ({ onSearch, searchQuery, suggestions, onSuggestionPress }) => {

    const handleNotificationPress = () => {
        Alert.alert(
            "Alert",
            "This is a sample alert message.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        console.log("Notification icon pressed"); // Debugging step
    };

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
            <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
                <Ionicons name="notifications-outline" size={32} color="#fff" />
            </TouchableOpacity>
            {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    {suggestions.map((suggestion, index) => (
                        <TouchableOpacity key={index} onPress={() => onSuggestionPress(suggestion)}>
                            <Text style={styles.suggestionText}>{suggestion["Beach Name"]}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15719f', // Same as headerStyle backgroundColor
        padding: 8,
    },
    searchInput: {
        height: 50,
        width: '70%', // Adjusted to avoid overlap with icons
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 16,
        marginLeft: -9,
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
    },
    locicon: {
        marginBottom: 4,
        marginRight: 9,
    },
    iconContainer: {
        marginLeft: 6,
    },
    suggestionsContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        maxHeight: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingVertical: 5,
    },
    suggestionText: {
        padding: 10,
        fontSize: 16,
    }
});

export default MapHeader;
